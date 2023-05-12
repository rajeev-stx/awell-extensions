"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePrompt = exports.promptQuestion = void 0;
const lodash_1 = require("lodash");
const promptQuestion = (language) => `Create a human-readable summary of a person that only includes the below characteristics. The text should be written in the present tense. Write it in ${language}.`;
exports.promptQuestion = promptQuestion;
const generatePrompt = (patient, characteristics, language = 'English') => {
    var _a;
    const flattenedProfile = {
        ...(0, lodash_1.omit)(patient.profile, ['address']),
        ...(_a = patient.profile) === null || _a === void 0 ? void 0 : _a.address,
    };
    const getCharacteristicsForPrompt = () => {
        if ((0, lodash_1.isNil)(characteristics) || (0, lodash_1.isEmpty)(characteristics))
            return flattenedProfile;
        return (0, lodash_1.pick)(flattenedProfile, characteristics);
    };
    const characteristicsForPrompt = getCharacteristicsForPrompt();
    const characteristicsArray = Object.entries(characteristicsForPrompt)
        .map((e) => ({ [e[0]]: e[1] }))
        .filter((chars) => {
        if ((0, lodash_1.isNil)(chars) || (0, lodash_1.isEmpty)(chars))
            return false;
        return true;
    });
    const characteristicsPrompt = characteristicsArray
        .filter((char) => {
        const value = Object.values(char)[0];
        if ((0, lodash_1.isNil)(value) || (0, lodash_1.isEmpty)(value))
            return false;
        return true;
    })
        .map((char) => {
        return `Characteristic: ${(0, lodash_1.startCase)(String(Object.keys(char)[0]))}
Value: ${String(Object.values(char)[0]).trim()}`;
    })
        .join('\n\n');
    return `${(0, exports.promptQuestion)(language)}

${characteristicsPrompt}`;
};
exports.generatePrompt = generatePrompt;
//# sourceMappingURL=generatePrompt.js.map