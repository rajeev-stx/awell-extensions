"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientSchema = exports.patientStatusSchema = exports.insuranceSchema = exports.guarantorSchema = exports.emailSchema = exports.phoneSchema = void 0;
const zod_1 = require("zod");
const generic_zod_1 = require("./generic.zod");
// Enums
const genderIdentityEnum = zod_1.z.enum([
    'unknown',
    'man',
    'woman',
    'transgender_man',
    'transgender_woman',
    'nonbinary',
    'option_not_listed',
    'prefer_not_to_say',
    'two_spirit',
]);
const legalGenderMarkerEnum = zod_1.z.enum(['M', 'F', 'X', 'U']);
const pronounsEnum = zod_1.z.enum([
    'he_him_his',
    'she_her_hers',
    'they_them_theirs',
    'not_listed',
]);
const sexEnum = zod_1.z.enum(['Male', 'Female', 'Other', 'Unknown']);
const sexualOrientationEnum = zod_1.z.enum([
    'unknown',
    'straight',
    'gay',
    'bisexual',
    'option_not_listed',
    'prefer_not_to_say',
    'lesbian',
    'queer',
    'asexual',
]);
const raceEnum = zod_1.z.enum([
    'No race specified',
    'American Indian or Alaska Native',
    'Asian',
    'Black or African American',
    'Native Hawaiian or Other Pacific Islander',
    'White',
    'Other',
    'Declined to specify',
]);
const ethnicityEnum = zod_1.z.enum([
    'No ethnicity specified',
    'Hispanic or Latino',
    'Not Hispanic or Latino',
    'Unknown',
    'Declined to specify',
]);
const phoneTypeEnum = zod_1.z.enum([
    'Home',
    'Mobile',
    'Main',
    'Work',
    'Night',
    'Fax',
    'Other',
]);
const relationshipEnum = zod_1.z.enum([
    'Caregiver',
    'Child',
    'Friend',
    'Grandparent',
    'Guardian',
    'Parent',
    'Sibling',
    'Spouse',
    'Other',
]);
const insuranceRankEnum = zod_1.z.enum(['primary', 'secondary', 'tertiary']);
const paymentProgramEnum = zod_1.z.enum([
    'Medicare Part B',
    'Medicare Advantage',
    'Medicaid',
    'Commercial - HMSA',
    'Commercial - SFHP',
    'Commercial - Other',
    "Worker's Compensation",
]);
const inactiveReasonEnum = zod_1.z.enum([
    'other',
    'patient left on bad terms',
    'patient left on good terms',
    'practice ended relationship',
    'unknown',
]);
const patientStatusEnum = zod_1.z.enum(['active', 'deceased', 'inactive', 'prospect']);
// Schemas
const addressSchema = zod_1.z.object({
    address_line1: zod_1.z.string().max(200),
    address_line2: zod_1.z.string().max(35).nullish(),
    city: zod_1.z.string().max(50),
    state: zod_1.z.string().max(2),
    zip: zod_1.z.string().max(9),
});
exports.phoneSchema = zod_1.z.object({
    phone: zod_1.z.string().max(20),
    phone_type: phoneTypeEnum,
});
exports.emailSchema = zod_1.z.object({
    email: zod_1.z.string().email().max(75),
});
exports.guarantorSchema = zod_1.z.object({
    address: zod_1.z.string().max(200),
    city: zod_1.z.string().max(50),
    state: zod_1.z.string().max(2),
    zip: zod_1.z.string().max(9),
    phone: zod_1.z.string().max(20).nullish(),
    relationship: relationshipEnum.nullish(),
    first_name: zod_1.z.string().max(70).nullish(),
    last_name: zod_1.z.string().max(70).nullish(),
    middle_name: zod_1.z.string().max(50).nullish(),
});
exports.insuranceSchema = zod_1.z.object({
    rank: insuranceRankEnum,
    carrier: zod_1.z.string().max(200).nullish(),
    member_id: zod_1.z.string().max(50).nullish(),
    group_id: zod_1.z.string().max(50).nullish(),
    plan: zod_1.z.string().max(200).nullish(),
    phone: zod_1.z.string().max(20).nullish(),
    extension: zod_1.z.string().max(6).nullish(),
    address: zod_1.z.string().max(200).nullish(),
    suite: zod_1.z.string().max(35).nullish(),
    city: zod_1.z.string().max(50).nullish(),
    state: zod_1.z.string().max(2).nullish(),
    zip: zod_1.z.string().max(9).nullish(),
    copay: zod_1.z.number().nullish(),
    deductible: zod_1.z.number().nullish(),
    payment_program: paymentProgramEnum.nullish(),
    insured_person_first_name: zod_1.z.string().max(200).nullish(),
    insured_person_last_name: zod_1.z.string().max(200).nullish(),
    insured_person_address: zod_1.z.string().max(200).nullish(),
    insured_person_city: zod_1.z.string().max(50).nullish(),
    insured_person_state: zod_1.z.string().max(2).nullish(),
    insured_person_zip: zod_1.z.string().max(9).nullish(),
    insured_person_id: zod_1.z.string().max(50).nullish(),
    insured_person_dob: generic_zod_1.stringDate.nullish(),
    insured_person_gender: legalGenderMarkerEnum.nullish(),
    insured_person_ssn: zod_1.z.string().max(9).nullish(),
    relationship_to_insured: zod_1.z.string().max(20).nullish(),
});
exports.patientStatusSchema = zod_1.z.object({
    deceased_date: generic_zod_1.stringDate.nullish(),
    inactive_reason: inactiveReasonEnum.nullish(),
    notes: zod_1.z.string().nullish(),
    status: patientStatusEnum,
});
const preferenceSchema = zod_1.z.object({
    preferred_pharmacy_1: zod_1.z.string().nullish(),
    preferred_pharmacy_2: zod_1.z.string().nullish(),
});
const emergencyContactSchema = zod_1.z.object({
    first_name: zod_1.z.string().max(70).nullish(),
    last_name: zod_1.z.string().max(70).nullish(),
    relationship: relationshipEnum.nullish(),
    phone: zod_1.z.string().max(20).nullish(),
    address_line1: zod_1.z.string().max(200).nullish(),
    address_line2: zod_1.z.string().max(35).nullish(),
    city: zod_1.z.string().max(50).nullish(),
    state: zod_1.z.string().max(2).nullish(),
    zip: zod_1.z.string().max(10).nullish(),
});
const employerSchema = zod_1.z.object({
    code: zod_1.z.string(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
});
exports.patientSchema = zod_1.z
    .object({
    first_name: zod_1.z.string().max(70),
    middle_name: zod_1.z.string().max(50).nullish(),
    last_name: zod_1.z.string().max(70),
    actual_name: zod_1.z.string().max(150).nullish(),
    gender_identity: genderIdentityEnum.nullish(),
    legal_gender_marker: legalGenderMarkerEnum.nullish(),
    pronouns: pronounsEnum.nullish(),
    sex: sexEnum,
    sexual_orientation: sexualOrientationEnum.nullish(),
    primary_physician: generic_zod_1.numberId,
    caregiver_practice: generic_zod_1.numberId,
    dob: generic_zod_1.stringDate,
    ssn: zod_1.z.string().length(9).nullish(),
    race: raceEnum.nullish(),
    preferred_language: zod_1.z.string().nullish(),
    ethnicity: ethnicityEnum.nullish(),
    notes: zod_1.z.string().max(500).nullish(),
    vip: zod_1.z.boolean().nullish(),
    address: addressSchema.strict().nullish(),
    phones: zod_1.z.array(exports.phoneSchema.strict()).max(2).nullish(),
    emails: zod_1.z.array(exports.emailSchema.strict()).nullish(),
    guarantor: exports.guarantorSchema.strict().nullish(),
    insurances: zod_1.z.array(exports.insuranceSchema.strict()).nullish(),
    deleted_insurances: zod_1.z.array(exports.insuranceSchema.strict()).nullish(),
    tags: zod_1.z.array(zod_1.z.string().max(100)).max(10).nullish(),
    patient_status: exports.patientStatusSchema.strict().nullish(),
    preference: preferenceSchema.strict().nullish(),
    emergency_contact: emergencyContactSchema.strict().nullish(),
    primary_care_provider_npi: zod_1.z.string().length(10).nullish(),
    previous_first_name: zod_1.z.string().max(70).nullish(),
    previous_last_name: zod_1.z.string().max(70).nullish(),
    master_patient: generic_zod_1.numberId.nullish(),
    employer: employerSchema.strict().nullish(),
    metadata: zod_1.z.object({}).passthrough().nullish(),
})
    .strict();
//# sourceMappingURL=patient.zod.js.map