"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twilio_1 = __importDefault(require("twilio"));
/**
 * Using a dedicated file fo make it easier to mock the twilio in the context of
 * tests.
 */
exports.default = twilio_1.default;
//# sourceMappingURL=twilio.js.map