"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtensionServer = void 0;
const pubsub_1 = require("@google-cloud/pubsub");
const environment_1 = require("../lib/environment");
class ExtensionServer {
    constructor({ log }) {
        this.subscriptions = [];
        const pubSubClient = new pubsub_1.PubSub();
        this.log = log;
        this.activityCreatedTopic = pubSubClient.topic(environment_1.environment.EXTENSION_ACTIVITY_CREATED_TOPIC);
        this.activityCompletedTopic = pubSubClient.topic(environment_1.environment.EXTENSION_ACTIVITY_COMPLETED_TOPIC);
        this.clients = [pubSubClient];
    }
    async init() {
        const [activityCreatedTopicExists] = await this.activityCreatedTopic.exists();
        if (!activityCreatedTopicExists) {
            this.log.debug({ name: this.activityCreatedTopic.name }, 'Creating activity created topic');
            await this.activityCreatedTopic.create();
        }
        const [activityCompletedTopicExists] = await this.activityCompletedTopic.exists();
        if (!activityCompletedTopicExists) {
            this.log.debug({ name: this.activityCompletedTopic.name }, 'Creating activity completed topic');
            await this.activityCompletedTopic.create();
        }
    }
    async getSubscription(pubSubClient, topic, name, options) {
        this.log.debug({ topic: topic.name, subName: name, options }, 'Retrieving custom actions extension subscription');
        const subscription = pubSubClient.subscription(name);
        /**
         * There is a strange bug with the `exists` function in the pubsub client
         * which causes it to fail with a DEADLINE_EXCEEDED error, with no clear
         * explanation of what causes it and how to prevent it.
         * Using the google api client instead prevents this from happening.
         */
        const subscriptionExists = async () => {
            const [exists] = await subscription.exists();
            return exists;
        };
        if (await subscriptionExists()) {
            return subscription;
        }
        this.log.debug({ subName: subscription.name }, 'Creating new topic subscription');
        const [newSubscription] = await pubSubClient.createSubscription(topic, name, options);
        return newSubscription;
    }
    async registerExtension(extension) {
        const pubSubClient = new pubsub_1.PubSub();
        this.log.info({ key: extension.key }, 'Registering extension');
        await Object.values(extension.actions).reduce(async (previousAction, action) => {
            await previousAction;
            try {
                const subscription = await this.getSubscription(pubSubClient, this.activityCreatedTopic, `${extension.key}-${action.key}`, {
                    filter: `attributes.extension = "${extension.key}" AND attributes.action = "${action.key}"`,
                    enableExactlyOnceDelivery: true,
                });
                this.log.debug({ extension: extension.key, action: action.key }, 'Configuring extension action subscription');
                const createOnCompleteCallback = (payload, attributes) => {
                    return async (params = {}) => {
                        const data = Buffer.from(JSON.stringify({
                            activity: payload.activity,
                            resolution: 'success',
                            ...params,
                        }));
                        await this.activityCompletedTopic.publishMessage({
                            data,
                            attributes,
                        });
                    };
                };
                const createOnErrorCallback = (payload, attributes) => {
                    return async (params = {}) => {
                        const data = Buffer.from(JSON.stringify({
                            activity: payload.activity,
                            resolution: 'failure',
                            ...params,
                        }));
                        await this.activityCompletedTopic.publishMessage({
                            data,
                            attributes,
                        });
                    };
                };
                const messageHandler = async (message) => {
                    const { attributes } = message;
                    const { extension: extensionKey, action: actionKey } = attributes;
                    // Extra check on attributes. This mainly serves local testing with the
                    // pub sub emulator as it does not support filtering.
                    if (extensionKey === extension.key && actionKey === action.key) {
                        const payload = JSON.parse(String(message.data));
                        this.log.debug(payload, 'New activity payload received');
                        void action.onActivityCreated(payload, createOnCompleteCallback(payload, attributes), createOnErrorCallback(payload, attributes));
                    }
                    await message.ackWithResponse();
                };
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                subscription.on('message', messageHandler);
                subscription.on('error', (error) => {
                    this.log.error(error, 'Subscription error');
                });
                this.subscriptions.push(subscription);
            }
            catch (err) {
                this.log.fatal({ err, extension: extension.key, action: action.key }, 'Extension registration failed');
                throw err;
            }
        }, Promise.resolve());
        this.log.info({ key: extension.key }, 'Extension registered successfully');
    }
    async shutDown() {
        await this.subscriptions.reduce(async (close, subscription) => {
            await close;
            this.log.debug({ subscriptionName: subscription.name }, 'Closing subscription');
            await subscription.close();
        }, Promise.resolve());
        await this.clients.reduce(async (close, client) => {
            await close;
            await client.close();
        }, Promise.resolve());
    }
}
exports.ExtensionServer = ExtensionServer;
//# sourceMappingURL=ExtensionServer.js.map