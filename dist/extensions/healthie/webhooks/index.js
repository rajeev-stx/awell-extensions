"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhooks = void 0;
const appointmentCreated_1 = require("./appointmentCreated");
const patientCreated_1 = require("./patientCreated");
exports.webhooks = [appointmentCreated_1.appointmentCreated, patientCreated_1.patientCreated];
//# sourceMappingURL=index.js.map