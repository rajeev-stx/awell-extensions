"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Awell = void 0;
const actions_1 = require("./v1/actions");
const settings_1 = require("./settings");
const webhooks_1 = require("./v1/webhooks");
const marketplace_1 = require("../../lib/types/marketplace");
exports.Awell = {
    key: 'awell',
    title: 'Awell Workflow',
    icon_url: 'https://res.cloudinary.com/da7x4rzl4/image/upload/v1678870116/Awell%20Extensions/Awell_Logo.png',
    description: 'Enrich your care flows with powerful Awell actions.',
    category: marketplace_1.Category.WORKFLOW,
    author: {
        authorType: marketplace_1.AuthorType.AWELL,
    },
    settings: settings_1.settings,
    actions: {
        startCareFlow: actions_1.startCareFlow,
        updatePatient: actions_1.updatePatient,
        stopCareFlow: actions_1.stopCareFlow,
        searchPatientsByPatientCode: actions_1.searchPatientsByPatientCode,
        isPatientEnrolledInCareFlow: actions_1.isPatientEnrolledInCareFlow,
        // deletePatient, Deleting the patient who is currently enrolled in the pathway seems dangerous
    },
    webhooks: webhooks_1.webhooks,
};
//# sourceMappingURL=index.js.map