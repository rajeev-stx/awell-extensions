"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSignatureRequest = void 0;
const config_1 = require("./config");
const marketplace_1 = require("../../../../../lib/types/marketplace");
const settings_1 = require("../../../settings");
const dropboxSignSdk_1 = __importDefault(require("../../../common/sdk/dropboxSignSdk"));
const sign_1 = require("@dropbox/sign");
const zod_validation_error_1 = require("zod-validation-error");
const zod_1 = require("zod");
const fields_1 = require("./config/fields");
exports.getSignatureRequest = {
    key: 'getSignatureRequest',
    title: 'Get signature request',
    description: 'Get details about a signature request.',
    category: marketplace_1.Category.DOCUMENT_MANAGEMENT,
    fields: config_1.fields,
    dataPoints: config_1.dataPoints,
    previewable: true,
    onActivityCreated: async (payload, onComplete, onError) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        try {
            const { signatureRequestId } = (0, fields_1.validateActionFields)(payload.fields);
            const { apiKey } = (0, settings_1.validateSettings)(payload.settings);
            const signatureRequestApi = new dropboxSignSdk_1.default.SignatureRequestApi();
            signatureRequestApi.username = apiKey;
            const result = await signatureRequestApi.signatureRequestGet(signatureRequestId);
            const signatures = (_b = (_a = result.body.signatureRequest) === null || _a === void 0 ? void 0 : _a.signatures) !== null && _b !== void 0 ? _b : [];
            const hasSignature = signatures.length >= 1;
            await onComplete({
                data_points: {
                    title: (_c = result.body.signatureRequest) === null || _c === void 0 ? void 0 : _c.title,
                    originalTitle: (_d = result.body.signatureRequest) === null || _d === void 0 ? void 0 : _d.originalTitle,
                    subject: (_e = result.body.signatureRequest) === null || _e === void 0 ? void 0 : _e.subject,
                    message: (_f = result.body.signatureRequest) === null || _f === void 0 ? void 0 : _f.message,
                    signingUrl: (_g = result.body.signatureRequest) === null || _g === void 0 ? void 0 : _g.signingUrl,
                    signingRedirectUrl: (_h = result.body.signatureRequest) === null || _h === void 0 ? void 0 : _h.signingRedirectUrl,
                    detailsUrl: (_j = result.body.signatureRequest) === null || _j === void 0 ? void 0 : _j.detailsUrl,
                    requesterEmailAddress: (_k = result.body.signatureRequest) === null || _k === void 0 ? void 0 : _k.requesterEmailAddress,
                    signerEmailAddress: hasSignature
                        ? signatures[0].signerEmailAddress
                        : undefined,
                    signerName: hasSignature ? signatures[0].signerName : undefined,
                    signerRole: hasSignature ? signatures[0].signerRole : undefined,
                    statusCode: hasSignature ? signatures[0].statusCode : undefined,
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
                const sdkErrorMessage = (_m = (_l = err.body) === null || _l === void 0 ? void 0 : _l.error) === null || _m === void 0 ? void 0 : _m.errorMsg;
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
//# sourceMappingURL=getSignatureRequest.js.map