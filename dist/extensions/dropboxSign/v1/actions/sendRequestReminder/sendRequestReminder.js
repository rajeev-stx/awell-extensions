"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRequestReminder = void 0;
const config_1 = require("./config");
const marketplace_1 = require("../../../../../lib/types/marketplace");
const settings_1 = require("../../../settings");
const dropboxSignSdk_1 = __importDefault(require("../../../common/sdk/dropboxSignSdk"));
const sign_1 = require("@dropbox/sign");
const zod_validation_error_1 = require("zod-validation-error");
const zod_1 = require("zod");
const fields_1 = require("./config/fields");
exports.sendRequestReminder = {
    key: 'sendRequestReminder',
    title: 'Send request reminder',
    description: 'Sends an email to the signer reminding them to sign the signature request.',
    category: marketplace_1.Category.DOCUMENT_MANAGEMENT,
    fields: config_1.fields,
    previewable: true,
    onActivityCreated: async (payload, onComplete, onError) => {
        var _a, _b;
        try {
            const { signatureRequestId, signerEmailAddress } = (0, fields_1.validateActionFields)(payload.fields);
            const { apiKey } = (0, settings_1.validateSettings)(payload.settings);
            const signatureRequestApi = new dropboxSignSdk_1.default.SignatureRequestApi();
            signatureRequestApi.username = apiKey;
            const data = {
                emailAddress: signerEmailAddress,
            };
            await signatureRequestApi.signatureRequestRemind(signatureRequestId, data);
            await onComplete();
        }
        catch (err) {
            if (err instanceof zod_1.ZodError) {
                const error = (0, zod_validation_error_1.fromZodError)(err);
                await onError({
                    events: [
                        {
                            date: new Date().toISOString(),
                            text: { en: error.name },
                            error: {
                                category: 'WRONG_INPUT',
                                message: `${error.message}`,
                            },
                        },
                    ],
                });
                return;
            }
            if (err instanceof sign_1.HttpError) {
                const sdkErrorMessage = (_b = (_a = err.body) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.errorMsg;
                await onError({
                    events: [
                        {
                            date: new Date().toISOString(),
                            text: {
                                en: err.name,
                            },
                            error: {
                                category: 'SERVER_ERROR',
                                message: `${String(err === null || err === void 0 ? void 0 : err.statusCode)}: ${String(sdkErrorMessage)}`,
                            },
                        },
                    ],
                });
                return;
            }
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
//# sourceMappingURL=sendRequestReminder.js.map