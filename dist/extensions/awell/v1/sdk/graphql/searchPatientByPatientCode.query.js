"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchPatientByPatientCodeQuery = void 0;
exports.searchPatientByPatientCodeQuery = `
query SearchPatientsByPatientCode($patient_code: String!) {
    searchPatientsByPatientCode(patient_code: $patient_code) {
      success
      patients {
        id
        profile {
          patient_code
        }
      }
    }
  }
`;
//# sourceMappingURL=searchPatientByPatientCode.query.js.map