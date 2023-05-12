"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVoice = void 0;
const getVoice = (voiceFieldValue) => {
    if (voiceFieldValue === 'male' || voiceFieldValue === 'female') {
        return voiceFieldValue;
    }
    const defaultVoice = 'female';
    return defaultVoice;
};
exports.getVoice = getVoice;
//# sourceMappingURL=getVoice.js.map