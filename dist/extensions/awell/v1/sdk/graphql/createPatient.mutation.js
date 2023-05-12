"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPatientMutation = void 0;
exports.createPatientMutation = `
mutation CreatePatient($input: CreatePatientInput!) {
  createPatient(input: $input) {
    patient {
      id
    }
  }
}
`;
//# sourceMappingURL=createPatient.mutation.js.map