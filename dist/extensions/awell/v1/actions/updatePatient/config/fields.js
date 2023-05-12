"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldsValidationSchema = exports.fields = void 0;
const types_1 = require("../../../../../../lib/types");
const zod_1 = require("zod");
const date_fns_1 = require("date-fns");
const graphql_1 = require("../../../gql/graphql");
const validation_1 = require("../../../../../../lib/shared/validation");
exports.fields = {
    patientCode: {
        id: 'patientCode',
        label: 'Patient code',
        type: types_1.FieldType.STRING,
        required: false,
    },
    firstName: {
        id: 'firstName',
        label: 'First name',
        type: types_1.FieldType.STRING,
        required: false,
    },
    lastName: {
        id: 'lastName',
        label: 'Last name',
        type: types_1.FieldType.STRING,
        required: false,
    },
    email: {
        id: 'email',
        label: 'Email',
        type: types_1.FieldType.STRING,
        /**
         * I am purposely not using the `email` stringType yet.
         * More information here: https://awellhealth.atlassian.net/jira/polaris/projects/AH/ideas/view/548618?selectedIssue=AH-176&issueViewLayout=sidebar&issueViewSection=capture&focusedInsightId=3144292
         */
        // stringType: StringType.EMAIL,
        required: false,
    },
    birthDate: {
        id: 'birthDate',
        label: 'Birth date',
        type: types_1.FieldType.DATE,
        required: false,
    },
    mobilePhone: {
        id: 'mobilePhone',
        label: 'Mobile phone',
        type: types_1.FieldType.STRING,
        stringType: types_1.StringType.PHONE,
        required: false,
    },
    phone: {
        id: 'phone',
        label: 'Phone',
        type: types_1.FieldType.STRING,
        stringType: types_1.StringType.PHONE,
        required: false,
    },
    preferredLanguage: {
        id: 'preferredLanguage',
        label: 'Preferred language',
        type: types_1.FieldType.STRING,
        required: false,
    },
    sex: {
        id: 'sex',
        label: 'Sex',
        description: 'Sex code as defined by ISO standard IEC_5218: "NOT_KNOWN", "MALE" or "FEMALE"',
        type: types_1.FieldType.STRING,
        required: false,
    },
    city: {
        id: 'city',
        label: 'City',
        type: types_1.FieldType.STRING,
        required: false,
    },
    country: {
        id: 'country',
        label: 'Country',
        type: types_1.FieldType.STRING,
        required: false,
    },
    state: {
        id: 'state',
        label: 'State',
        type: types_1.FieldType.STRING,
        required: false,
    },
    street: {
        id: 'street',
        label: 'Street',
        type: types_1.FieldType.STRING,
        required: false,
    },
    zip: {
        id: 'zip',
        label: 'ZIP',
        type: types_1.FieldType.STRING,
        required: false,
    },
};
exports.FieldsValidationSchema = zod_1.z.object({
    patientCode: zod_1.z.optional(zod_1.z.string()),
    firstName: zod_1.z.optional(zod_1.z.string()),
    lastName: zod_1.z.optional(zod_1.z.string()),
    birthDate: zod_1.z.optional(zod_1.z.coerce.date().transform((date) => (0, date_fns_1.formatISO)(date))),
    email: zod_1.z.optional(zod_1.z.string().email('Value passed is not an email address')),
    phone: validation_1.E164PhoneValidationOptionalSchema,
    mobilePhone: validation_1.E164PhoneValidationOptionalSchema,
    street: zod_1.z.optional(zod_1.z.string()),
    state: zod_1.z.optional(zod_1.z.string()),
    country: zod_1.z.optional(zod_1.z.string()),
    city: zod_1.z.optional(zod_1.z.string()),
    zip: zod_1.z.optional(zod_1.z.string()),
    preferredLanguage: zod_1.z.optional(zod_1.z.string()),
    sex: zod_1.z.optional(zod_1.z.enum([graphql_1.Sex.Female, graphql_1.Sex.Male, graphql_1.Sex.NotKnown])),
});
//# sourceMappingURL=fields.js.map