"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePatientMutation = void 0;
exports.deletePatientMutation = `
mutation DeletePatient($input: DeletePatientInput!) {
  deletePatient(input: $input) {
    success
    code
  }
}
`;
//# sourceMappingURL=deletePatient.mutation.js.map