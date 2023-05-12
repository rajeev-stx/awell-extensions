"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSignatureRequestWithTemplate = void 0;
const config_1 = require("./config");
const marketplace_1 = require("../../../../../lib/types/marketplace");
const settings_1 = require("../../../settings");
const dropboxSignSdk_1 = __importDefault(require("../../../common/sdk/dropboxSignSdk"));
const sign_1 = require("@dropbox/sign");
const zod_validation_error_1 = require("zod-validation-error");
const zod_1 = require("zod");
const fields_1 = require("./config/fields");
exports.sendSignatureRequestWithTemplate = {
    key: 'sendSignatureRequestWithTemplate',
    title: 'Send signature request with template',
    description: 'Send a signature request based off a template.',
    category: marketplace_1.Category.DOCUMENT_MANAGEMENT,
    fields: config_1.fields,
    dataPoints: config_1.dataPoints,
    previewable: true,
    onActivityCreated: async (payload, onComplete, onError) => {
        var _a, _b, _c;
        try {
            const { patient: { id: patientId }, activity: { id: activityId }, } = payload;
            const { signerRole, signerName, signerEmailAddress, templateId, title, subject, message, signingRedirectUrl, } = (0, fields_1.validateActionFields)(payload.fields);
            const { apiKey, testMode } = (0, settings_1.validateSettings)(payload.settings);
            const signatureRequestApi = new dropboxSignSdk_1.default.SignatureRequestApi();
            signatureRequestApi.username = apiKey;
            const signer = {
                role: signerRole,
                emailAddress: signerEmailAddress,
                name: signerName,
            };
            const defaultSigningOptions = {
                draw: true,
                type: true,
                upload: true,
                phone: false,
                defaultType: dropboxSignSdk_1.default.SubSigningOptions.DefaultTypeEnum.Draw,
            };
            const data = {
                templateIds: [templateId],
                subject,
                message,
                signers: [signer],
                title,
                signingRedirectUrl,
                signingOptions: defaultSigningOptions,
                testMode,
                metadata: {
                    awellPatientId: patientId,
                    awellActivityId: activityId,
                },
            };
            const result = await signatureRequestApi.signatureRequestSendWithTemplate(data);
            await onComplete({
                data_points: {
                    signatureRequestId: String((_a = result.body.signatureRequest) === null || _a === void 0 ? void 0 : _a.signatureRequestId),
                },
            });
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
                const sdkErrorMessage = (_c = (_b = err.body) === null || _b === void 0 ? void 0 : _b.error) === null || _c === void 0 ? void 0 : _c.errorMsg;
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
//# sourceMappingURL=sendSignatureRequestWithTemplate.js.map