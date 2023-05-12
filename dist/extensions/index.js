"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extensions = void 0;
const awell_1 = require("./awell");
const calDotCom_1 = require("./calDotCom");
const healthie_1 = require("./healthie");
const hello_world_1 = require("./hello-world");
const twilio_1 = require("./twilio");
const dropboxSign_1 = require("./dropboxSign");
const elation_1 = require("./elation");
const messagebird_1 = require("./messagebird");
const math_1 = require("./math");
const mailgun_1 = require("./mailgun");
const formsort_1 = require("./formsort");
// import { AvaAi } from './avaAi'
const mailchimp_1 = require("./mailchimp");
const cloudinary_1 = require("./cloudinary");
exports.extensions = [
    // AvaAi, Best to disable this until we cleared out data privacy & HIPAA with OpenAI
    awell_1.Awell,
    cloudinary_1.Cloudinary,
    hello_world_1.HelloWorld,
    healthie_1.Healthie,
    twilio_1.Twilio,
    calDotCom_1.CalDotCom,
    dropboxSign_1.DropboxSign,
    elation_1.Elation,
    mailgun_1.Mailgun,
    messagebird_1.MessageBird,
    math_1.MathExtension,
    formsort_1.Formsort,
    mailchimp_1.Mailchimp,
];
//# sourceMappingURL=index.js.map