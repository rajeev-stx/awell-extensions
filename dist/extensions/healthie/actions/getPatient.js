"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPatient = void 0;
const types_1 = require("../../../lib/types");
const marketplace_1 = require("../../../lib/types/marketplace");
const sdk_1 = require("../gql/sdk");
const graphqlClient_1 = require("../graphqlClient");
const getPatient_zod_1 = require("../validation/getPatient.zod");
const fields = {
    patientId: {
        id: 'patientId',
        label: 'Patient ID',
        description: 'The ID of the patient in Healthie you would like to retrieve.',
        type: types_1.FieldType.STRING,
    },
};
const dataPoints = {
    firstName: {
        key: 'firstName',
        valueType: 'string',
    },
    lastName: {
        key: 'lastName',
        valueType: 'string',
    },
    dob: {
        key: 'dob',
        valueType: 'date',
    },
    gender: {
        key: 'gender',
        valueType: 'string',
    },
    email: {
        key: 'email',
        valueType: 'string',
    },
    phoneNumber: {
        key: 'phoneNumber',
        valueType: 'telephone',
    },
    primaryProviderId: {
        key: 'primaryProviderId',
        valueType: 'string',
    },
    groupName: {
        key: 'groupName',
        valueType: 'string',
    },
};
exports.getPatient = {
    key: 'getPatient',
    category: marketplace_1.Category.EHR_INTEGRATIONS,
    title: 'Get patient',
    description: 'Retrieve the details of a patient in Healthie.',
    fields,
    dataPoints,
    previewable: true,
    onActivityCreated: async (payload, onComplete, onError) => {
        var _a, _b, _c, _d, _e, _f, _g;
        const { fields, settings } = payload;
        const { patientId } = fields;
        try {
            const client = (0, graphqlClient_1.initialiseClient)(settings);
            if (client !== undefined) {
                const sdk = (0, sdk_1.getSdk)(client);
                const { data } = await sdk.getUser({ id: patientId });
                const { data: { dob, phoneNumber }, events, } = (0, getPatient_zod_1.validateGetPatient)(data.user);
                await onComplete({
                    data_points: {
                        firstName: (_a = data.user) === null || _a === void 0 ? void 0 : _a.first_name,
                        lastName: (_b = data.user) === null || _b === void 0 ? void 0 : _b.last_name,
                        dob,
                        email: (_c = data.user) === null || _c === void 0 ? void 0 : _c.email,
                        gender: (_d = data.user) === null || _d === void 0 ? void 0 : _d.gender,
                        phoneNumber,
                        groupName: (_f = (_e = data.user) === null || _e === void 0 ? void 0 : _e.user_group) === null || _f === void 0 ? void 0 : _f.name,
                        primaryProviderId: (_g = data.user) === null || _g === void 0 ? void 0 : _g.dietitian_id,
                    },
                    events,
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
//# sourceMappingURL=getPatient.js.map