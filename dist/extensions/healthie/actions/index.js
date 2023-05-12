"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actions = void 0;
const createAppointment_1 = require("./createAppointment");
const createTask_1 = require("./createTask");
const getAppointment_1 = require("./getAppointment");
const getPatient_1 = require("./getPatient");
const sendChatMessage_1 = require("./sendChatMessage");
const createPatient_1 = require("./createPatient");
const updatePatient_1 = require("./updatePatient");
const applyTagToPatient_1 = require("./applyTagToPatient");
const removeTagFromPatient_1 = require("./removeTagFromPatient");
const createChartingNote_1 = require("./createChartingNote");
const sendFormCompletionRequest_1 = require("./sendFormCompletionRequest");
const archivePatient_1 = require("./archivePatient");
// import { createLocation } from './createLocation'
const closeChatConversation_1 = require("./closeChatConversation");
const deleteAppointment_1 = require("./deleteAppointment");
const cancelAppointment_1 = require("./cancelAppointment");
const deleteTask_1 = require("./deleteTask");
const completeTask_1 = require("./completeTask");
exports.actions = {
    createAppointment: createAppointment_1.createAppointment,
    createTask: createTask_1.createTask,
    getAppointment: getAppointment_1.getAppointment,
    getPatient: getPatient_1.getPatient,
    sendChatMessage: sendChatMessage_1.sendChatMessage,
    createPatient: createPatient_1.createPatient,
    updatePatient: updatePatient_1.updatePatient,
    applyTagToPatient: applyTagToPatient_1.applyTagToPatient,
    removeTagFromPatient: removeTagFromPatient_1.removeTagFromPatient,
    createChartingNote: createChartingNote_1.createChartingNote,
    sendFormCompletionRequest: sendFormCompletionRequest_1.sendFormCompletionRequest,
    archivePatient: archivePatient_1.archivePatient,
    /**
    * There is bug in Healthie that prevents linking an address with a patient
    * Waiting for fix
    **/
    // createLocation,
    closeChatConversation: closeChatConversation_1.closeChatConversation,
    deleteAppointment: deleteAppointment_1.deleteAppointment,
    cancelAppointment: cancelAppointment_1.cancelAppointment,
    /**
     *  Specs of this API endpoint are unclear so we are not sure what
     *  functional value it delivers in the current state. Needs to be revisited.
     **/
    // createJournalEntry,
    deleteTask: deleteTask_1.deleteTask,
    completeTask: completeTask_1.completeTask,
};
//# sourceMappingURL=index.js.map