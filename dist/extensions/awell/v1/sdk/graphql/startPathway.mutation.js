"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startPathwayMutation = void 0;
exports.startPathwayMutation = `
mutation StartPathway($input: StartPathwayInput!) {
  startPathway(input: $input) {
    pathway_id
  }
}
`;
//# sourceMappingURL=startPathway.mutation.js.map