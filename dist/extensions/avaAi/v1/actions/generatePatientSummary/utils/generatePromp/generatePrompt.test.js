"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("../../../../../../awell/v1/gql/graphql");
const generatePrompt_1 = require("./generatePrompt");
const language = 'English';
describe('Generate prompt for patient summary', () => {
    test('Should generate a prompt with all characteristics', async () => {
        const result = (0, generatePrompt_1.generatePrompt)({
            id: 'patient-id',
            profile: {
                first_name: 'Nick',
                last_name: 'Hellemans',
                address: {
                    street: 'John Doe Street 20',
                    city: 'Kontich',
                    country: 'Belgium',
                    state: 'Antwerp',
                    zip: '2550',
                },
                birth_date: '1993-11-30',
                email: 'john.doe@awellhealth.com',
                mobile_phone: '+32 xxx xx xx xx',
                phone: '+32 xxx xx xx xx',
                national_registry_number: '123456789',
                patient_code: '98765',
                preferred_language: 'en',
                sex: graphql_1.Sex.Male,
            },
        }, [], language);
        expect(result).toBe(`${(0, generatePrompt_1.promptQuestion)(language)}

Characteristic: First Name
Value: Nick

Characteristic: Last Name
Value: Hellemans

Characteristic: Birth Date
Value: 1993-11-30

Characteristic: Email
Value: john.doe@awellhealth.com

Characteristic: Mobile Phone
Value: +32 xxx xx xx xx

Characteristic: Phone
Value: +32 xxx xx xx xx

Characteristic: National Registry Number
Value: 123456789

Characteristic: Patient Code
Value: 98765

Characteristic: Preferred Language
Value: en

Characteristic: Sex
Value: MALE

Characteristic: Street
Value: John Doe Street 20

Characteristic: City
Value: Kontich

Characteristic: Country
Value: Belgium

Characteristic: State
Value: Antwerp

Characteristic: Zip
Value: 2550`);
    });
    test('Should generate a prompt with only a subset of characteristics', async () => {
        const result = (0, generatePrompt_1.generatePrompt)({
            id: 'patient-id',
            profile: {
                first_name: 'Nick',
                last_name: 'Hellemans',
                address: {
                    street: 'John Doe Street 20',
                    city: 'Kontich',
                    country: 'Belgium',
                    state: 'Antwerp',
                    zip: '2550',
                },
                birth_date: '1993-11-30',
                email: 'john.doe@awellhealth.com',
                mobile_phone: '+32 xxx xx xx xx',
                phone: '+32 xxx xx xx xx',
                national_registry_number: '123456789',
                patient_code: '98765',
                preferred_language: 'en',
                sex: graphql_1.Sex.Male,
            },
        }, ['first_name', 'email', 'street', 'non_existing_char', ''], language);
        expect(result).toBe(`${(0, generatePrompt_1.promptQuestion)(language)}

Characteristic: First Name
Value: Nick

Characteristic: Email
Value: john.doe@awellhealth.com

Characteristic: Street
Value: John Doe Street 20`);
    });
    test('Should generate a prompt only with characteristics that are defined', async () => {
        const result = (0, generatePrompt_1.generatePrompt)({
            id: 'patient-id',
            profile: {
                first_name: 'Nick',
                //   last_name: 'Hellemans'
                sex: undefined,
                email: 'john.doe@awellhealth.com',
                address: {
                    street: undefined,
                },
            },
        }, ['first_name', 'last_name', 'sex', 'email', 'street'], language);
        expect(result).toBe(`${(0, generatePrompt_1.promptQuestion)(language)}

Characteristic: First Name
Value: Nick

Characteristic: Email
Value: john.doe@awellhealth.com`);
    });
});
//# sourceMappingURL=generatePrompt.test.js.map