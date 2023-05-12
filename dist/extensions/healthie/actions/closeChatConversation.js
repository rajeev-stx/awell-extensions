"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeChatConversation = void 0;
const lodash_1 = require("lodash");
const errors_1 = require("../errors");
const types_1 = require("../../../lib/types");
const marketplace_1 = require("../../../lib/types/marketplace");
const sdk_1 = require("../gql/sdk");
const graphqlClient_1 = require("../graphqlClient");
const fields = {
    id: {
        id: 'id',
        label: 'ID',
        description: 'The id of the conversation in Healthie.',
        type: types_1.FieldType.STRING,
        required: true,
    },
    provider_id: {
        id: 'provider_id',
        label: 'Provider ID',
        description: 'The ID of the provider that closes the conversation.',
        type: types_1.FieldType.STRING,
        required: true,
    },
};
exports.closeChatConversation = {
    key: 'closeChatConversation',
    category: marketplace_1.Category.EHR_INTEGRATIONS,
    title: 'Close chat conversation',
    description: 'Close a chat conversation in Healthie.',
    fields,
    previewable: true,
    onActivityCreated: async (payload, onComplete, onError) => {
        var _a, _b;
        const { fields, settings } = payload;
        const { id, provider_id } = fields;
        try {
            if ((0, lodash_1.isNil)(id) || (0, lodash_1.isNil)(provider_id)) {
                await onError({
                    events: [
                        {
                            date: new Date().toISOString(),
                            text: { en: 'Fields are missing' },
                            error: {
                                category: 'MISSING_FIELDS',
                                message: '`id` or `provider_id` is missing',
                            },
                        },
                    ],
                });
                return;
            }
            const client = (0, graphqlClient_1.initialiseClient)(settings);
            if (client !== undefined) {
                const sdk = (0, sdk_1.getSdk)(client);
                const { data } = await sdk.updateConversation({
                    input: {
                        id,
                        closed_by_id: provider_id,
                    },
                });
                if (!(0, lodash_1.isNil)((_a = data.updateConversation) === null || _a === void 0 ? void 0 : _a.messages)) {
                    const errors = (0, errors_1.mapHealthieToActivityError)((_b = data.updateConversation) === null || _b === void 0 ? void 0 : _b.messages);
                    await onError({
                        events: errors,
                    });
                    return;
                }
                await onComplete();
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
//# sourceMappingURL=closeChatConversation.js.map