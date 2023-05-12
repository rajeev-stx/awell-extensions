"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webServer = void 0;
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const lodash_1 = require("lodash");
const environment_1 = require("../lib/environment");
const extensions_1 = require("../extensions");
const pubsub_1 = require("@google-cloud/pubsub");
const documentation_1 = require("./documentation");
const logger_1 = require("./logger");
const getExtensionConfig = (extension) => {
    var _a;
    return {
        ...extension,
        actions: (0, lodash_1.mapValues)(extension.actions, (action) => (0, lodash_1.omit)(action, 'onActivityCreated')),
        webhooks: ((_a = extension.webhooks) !== null && _a !== void 0 ? _a : []).map((webhook) => (0, lodash_1.omit)(webhook, 'onWebhookReceived')),
        htmlDocs: (0, documentation_1.getExtensionDocumentation)(extension.key),
        changelog: (0, documentation_1.getExtensionChangelog)(extension.key),
    };
};
const webServer = (0, fastify_1.default)({
    logger: logger_1.logger,
});
exports.webServer = webServer;
void webServer.register(cors_1.default, {
    origin: true,
});
webServer.get('/', async (request, reply) => {
    const allExtensions = extensions_1.extensions.map((extension) => getExtensionConfig(extension));
    await reply.send(allExtensions);
});
webServer.get('/:extensionKey', async (request, reply) => {
    const { extensionKey } = request.params;
    const extension = extensions_1.extensions.find(({ key }) => key === extensionKey);
    if (extension === undefined) {
        await reply.status(404).send();
    }
    else {
        await reply.send(getExtensionConfig(extension));
    }
});
const pubSubClient = new pubsub_1.PubSub();
const webhookTopic = pubSubClient.topic(environment_1.environment.EXTENSION_WEBHOOK_RECEIVED_TOPIC);
webServer.post('/:extensionKey/webhook/:endpoint', async (request, reply) => {
    const { extensionKey, endpoint } = request.params;
    const extension = extensions_1.extensions.find(({ key }) => key === extensionKey);
    if (extension === undefined) {
        await reply.status(404).send();
    }
    else {
        await reply.status(200).send();
        const payload = request.body;
        const { webhooks = [] } = extension;
        await Promise.all(webhooks.map(async (webhook) => {
            const dataPoints = await webhook.onWebhookReceived(payload);
            const data = Buffer.from(JSON.stringify(dataPoints));
            await webhookTopic.publishMessage({
                data,
                attributes: {
                    extension: extension.key,
                    endpoint,
                    webhook: webhook.key,
                    environment: environment_1.environment.AWELL_ENVIRONMENT,
                },
            });
        }));
    }
});
//# sourceMappingURL=WebServer.js.map