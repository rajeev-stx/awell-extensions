"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVoiceLanguage = void 0;
const lodash_1 = require("lodash");
/**
 * Unfortunately, type "languages" from the MessageBird SDK is a union type
 * which makes it impossible to convert it to a tuple or generate an array from it at run-time.
 * That's why we are duplicating the list of languages here.
 */
const ALL_LANGUAGES = [
    'cy-gb',
    'da-dk',
    'de-de',
    'el-gr',
    'en-au',
    'en-gb',
    'en-gb-wls',
    'en-in',
    'en-us',
    'es-es',
    'es-mx',
    'es-us',
    'fr-ca',
    'fr-fr',
    'id-id',
    'is-is',
    'it-it',
    'ja-jp',
    'ko-kr',
    'ms-my',
    'nb-no',
    'nl-nl',
    'pl-pl',
    'pt-br',
    'pt-pt',
    'ro-ro',
    'ru-ru',
    'sv-se',
    'ta-in',
    'th-th',
    'tr-tr',
    'vi-vn',
    'zh-cn',
    'zh-hk',
];
const getVoiceLanguage = (voiceLanguageFieldValue) => {
    const defaultVoiceLanguage = 'en-gb';
    if ((0, lodash_1.isNil)(voiceLanguageFieldValue))
        return defaultVoiceLanguage;
    if (ALL_LANGUAGES.includes(voiceLanguageFieldValue)) {
        return voiceLanguageFieldValue;
    }
    return defaultVoiceLanguage;
};
exports.getVoiceLanguage = getVoiceLanguage;
//# sourceMappingURL=getVoiceLanguage.js.map