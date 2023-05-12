"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePathwayMutation = void 0;
exports.deletePathwayMutation = `
mutation DeletePathway($input: DeletePathwayInput!) {
    deletePathway(input: $input) {
      success
    }
  }  
`;
//# sourceMappingURL=deletePathway.mutation.js.map