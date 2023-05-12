"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSms = void 0;
const config_1 = require("./config");
const marketplace_1 = require("../../../../../lib/types/marketplace");
const lodash_1 = require("lodash");
const messagebirdSdk_1 = __importDefault(require("../../../common/sdk/messagebirdSdk"));
exports.sendSms = {
    key: 'sendSms',
    title: 'Send SMS',
    description: 'Send an SMS to a recipient of your choice.',
    category: marketplace_1.Category.COMMUNICATION,
    fields: config_1.fields,
    previewable: false,
    onActivityCreated: async (payload, onComplete, onError) => {
        const { fields: { originator, recipient, body }, settings: { apiKey, reportUrl }, } = payload;
        try {
            const allRequiredFieldsHaveValues = [originator, recipient, body].every((field) => !(0, lodash_1.isEmpty)(field));
            if (!allRequiredFieldsHaveValues) {
                await onError({
                    events: [
                        {
                            date: new Date().toISOString(),
                            text: { en: 'Fields are missing' },
                            error: {
                                category: 'MISSING_FIELDS',
                                message: '`originator`, `recipient`, or `body` is missing',
                            },
                        },
                    ],
                });
                return;
            }
            if ((0, lodash_1.isNil)(apiKey)) {
                await onError({
                    events: [
                        {
                            date: new Date().toISOString(),
                            text: { en: 'Missing an API key' },
                            error: {
                                category: 'MISSING_SETTINGS',
                                message: 'Missing an API key',
                            },
                        },
                    ],
                });
                return;
            }
            (0, messagebirdSdk_1.default)(apiKey).messages.create({
                originator: String(originator),
                recipients: [String(recipient)],
                body: String(body),
                reportUrl,
            }, function (error, response) {
                if (error != null) {
                    void onError({
                        events: [
                            {
                                date: new Date().toISOString(),
                                text: { en: 'Exception when calling the MessageBird API' },
                                error: {
                                    category: 'SERVER_ERROR',
                                    message: error.message,
                                },
                            },
                        ],
                    });
                }
                else {
                    void onComplete();
                }
            });
        }
        catch (err) {
            const error = err;
            await onError({
                events: [
                    {
                        date: new Date().toISOString(),
                        text: { en: 'Something went wrong while orchestration the action' },
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
//# sourceMappingURL=sendSms.js.map