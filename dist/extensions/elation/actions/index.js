"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
const getPatient_1 = require("./getPatient");
const updatePatient_1 = require("./updatePatient");
const createPatient_1 = require("./createPatient");
const createAppointment_1 = require("./createAppointment");
const getAppointment_1 = require("./getAppointment");
exports.actions = {
    getPatient: getPatient_1.getPatient,
    createPatient: createPatient_1.createPatient,
    updatePatient: updatePatient_1.updatePatient,
    createAppointment: createAppointment_1.createAppointment,
    getAppointment: getAppointment_1.getAppointment,
};
//# sourceMappingURL=index.js.map