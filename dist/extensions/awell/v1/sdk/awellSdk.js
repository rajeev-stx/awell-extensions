"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_request_1 = require("graphql-request");
const lodash_1 = require("lodash");
const graphql_1 = require("./graphql");
class AwellSdk {
    constructor(opts) {
        this.apiUrl = opts.apiUrl;
        this.apiKey = opts.apiKey;
        const client = new graphql_request_1.GraphQLClient(this.apiUrl, {
            headers: { apikey: this.apiKey },
        });
        this.client = client;
    }
    async startCareFlow(input) {
        const data = await this.client.request(graphql_1.startPathwayMutation, { input });
        if (!(0, lodash_1.isNil)(data.startPathway.pathway_id)) {
            return data.startPathway.pathway_id;
        }
        throw new Error('Start care flow failed.');
    }
    async updatePatient(input) {
        const data = await this.client.request(graphql_1.updatePatientMutation, { input });
        if (data.updatePatient.success && !(0, lodash_1.isNil)(data.updatePatient.patient)) {
            return data.updatePatient.patient.id;
        }
        throw new Error('Update patient failed.');
    }
    async deletePatient(input) {
        const data = await this.client.request(graphql_1.deletePatientMutation, { input });
        if (data.deletePatient.success) {
            return true;
        }
        throw new Error('Delete patient failed.');
    }
    async stopCareFlow(input) {
        const data = await this.client.request(graphql_1.stopPathwayMutation, {
            input,
        });
        if (data.stopPathway.success) {
            return true;
        }
        throw new Error('Stop pathway failed.');
    }
    async searchPatientsByPatientCode(input) {
        const data = await this.client.request(graphql_1.searchPatientByPatientCodeQuery, input);
        if (data.searchPatientsByPatientCode.success) {
            const patientIdsArray = data.searchPatientsByPatientCode.patients.map((patient) => {
                var _a;
                return {
                    id: patient.id,
                    profile: {
                        patient_code: (_a = patient.profile) === null || _a === void 0 ? void 0 : _a.patient_code,
                    },
                };
            });
            return patientIdsArray;
        }
        throw new Error('Search patients failed.');
    }
    async getPatientCareFlows(input) {
        const data = await this.client.request(graphql_1.patientPathwaysQuery, input);
        if (data.patientPathways.success) {
            return data.patientPathways.patientPathways;
        }
        throw new Error('Stop pathway failed.');
    }
}
exports.default = AwellSdk;
//# sourceMappingURL=awellSdk.js.map