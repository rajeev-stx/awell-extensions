"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopPathwayMutation = void 0;
exports.stopPathwayMutation = `
mutation StopPathway($input: StopPathwayInput!) {
    stopPathway(input: $input) {
      code
      success
    }
  }  
`;
//# sourceMappingURL=stopPathway.mutation.js.map