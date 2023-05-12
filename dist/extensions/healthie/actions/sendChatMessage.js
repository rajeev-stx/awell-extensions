"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendChatMessage = void 0;
const lodash_1 = require("lodash");
const types_1 = require("../../../lib/types");
const marketplace_1 = require("../../../lib/types/marketplace");
const sdk_1 = require("../gql/sdk");
const graphqlClient_1 = require("../graphqlClient");
const fields = {
    healthie_patient_id: {
        id: 'healthie_patient_id',
        label: 'Healthie Patient ID',
        description: 'The ID of the patient in Healthie you would like to send a chat message to.',
        type: types_1.FieldType.STRING,
        required: true,
    },
    provider_id: {
        id: 'provider_id',
        label: 'Provider ID',
        description: 'The ID of the provider, the chat message will be sent in name of this provider.',
        type: types_1.FieldType.STRING,
        required: true,
    },
    message: {
        id: 'message',
        label: 'Message',
        description: 'The chat message you would like to send.',
        type: types_1.FieldType.HTML,
        required: true,
    },
};
const dataPoints = {
    conversationId: {
        key: 'conversationId',
        valueType: 'string',
    },
};
exports.sendChatMessage = {
    key: 'sendChatMessage',
    category: marketplace_1.Category.EHR_INTEGRATIONS,
    title: 'Send chat message',
    description: 'Send a chat message to a patient in Healthie.',
    fields,
    dataPoints,
    previewable: true,
    onActivityCreated: async (payload, onComplete, onError) => {
        const { fields, settings } = payload;
        const { healthie_patient_id, provider_id, message } = fields;
        try {
            if (healthie_patient_id === undefined) {
                await onError({
                    events: [
                        {
                            date: new Date().toISOString(),
                            text: { en: 'Fields are missing' },
                            error: {
                                category: 'MISSING_FIELDS',
                                message: '`healthie_patient_id` is missing',
                            },
                        },
                    ],
                });
                return;
            }
            const client = (0, graphqlClient_1.initialiseClient)(settings);
            if (client !== undefined) {
                const sdk = (0, sdk_1.getSdk)(client);
                const createConversation = async () => {
                    var _a;
                    const { data } = await sdk.createConversation({
                        owner_id: provider_id,
                        simple_added_users: `user-${healthie_patient_id}`,
                    });
                    return (_a = data.createConversation) === null || _a === void 0 ? void 0 : _a.conversation;
                };
                const sendMessage = async (conversationId) => {
                    return await sdk.sendChatMessage({
                        input: {
                            conversation_id: conversationId,
                            content: message,
                            /**
                             * Send the message in name of the specified provider.
                             * If empty or blank, it defaults to the authenticated user.
                             */
                            user_id: provider_id,
                        },
                    });
                };
                const getConversation = async () => {
                    var _a, _b;
                    const { data } = await sdk.getConversationList({
                        client_id: healthie_patient_id,
                        active_status: 'active',
                        conversation_type: 'individual',
                    });
                    const conversations = (_a = data.conversationMemberships) !== null && _a !== void 0 ? _a : [];
                    const conversation = (_b = conversations.find((value) => { var _a, _b; return ((_b = (_a = value === null || value === void 0 ? void 0 : value.convo) === null || _a === void 0 ? void 0 : _a.owner) === null || _b === void 0 ? void 0 : _b.id) === provider_id; })) === null || _b === void 0 ? void 0 : _b.convo;
                    if (!(0, lodash_1.isNil)(conversation)) {
                        return conversation;
                    }
                    return await createConversation();
                };
                const conversation = await getConversation();
                const conversationId = conversation === null || conversation === void 0 ? void 0 : conversation.id;
                if ((0, lodash_1.isNil)(conversationId)) {
                    await onError({
                        events: [
                            {
                                date: new Date().toISOString(),
                                text: {
                                    en: "Conversation doesn't exist nor couldn't be created!",
                                },
                                error: {
                                    category: 'SERVER_ERROR',
                                    message: "Conversation doesn't exist nor couldn't be created!",
                                },
                            },
                        ],
                    });
                    return;
                }
                await sendMessage(conversationId);
                await onComplete({
                    data_points: {
                        conversationId,
                    },
                });
            }
            else {
                await onError({
                    events: [
                        {
                            date: new Date().toISOString(),
                            text: { en: 'API client requires an API url and API key' },
                            error: {
                                category: 'MISSING_SETTINGS',
                                message: 'Missing api url or api key',
                            },
                        },
                    ],
                });
            }
        }
        catch (err) {
            const error = err;
            await onError({
                events: [
                    {
                        date: new Date().toISOString(),
                        text: { en: 'Healthie API reported an error' },
                        error: {
                            category: 'SERVER_ERROR',
                            message: error.message,
                        },
                    },
                ],
            });
        }
    },
};
//# sourceMappingURL=sendChatMessage.js.map