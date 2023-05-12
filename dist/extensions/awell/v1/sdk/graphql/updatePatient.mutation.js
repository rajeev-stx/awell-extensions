"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePatientMutation = void 0;
exports.updatePatientMutation = `
mutation UpdatePatient($input: UpdatePatientInput!) {
  updatePatient(input: $input) {
    code
    success
    patient {
      id
    }
  }
}
`;
//# sourceMappingURL=updatePatient.mutation.js.map