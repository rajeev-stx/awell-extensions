"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const form_data_1 = __importDefault(require("form-data"));
const mailgun_js_1 = __importDefault(require("mailgun.js"));
const mailgunSdk = new mailgun_js_1.default(form_data_1.default);
exports.default = mailgunSdk;
//# sourceMappingURL=mailgunSdk.js.map