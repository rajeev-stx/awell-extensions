"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialiseClient = void 0;
const graphql_request_1 = require("graphql-request");
const initialiseClient = (s) => {
    const { apiUrl, apiKey } = s;
    if (apiUrl !== undefined && apiKey !== undefined) {
        return new graphql_request_1.GraphQLClient(apiUrl, {
            headers: {
                AuthorizationSource: 'API',
                Authorization: `Basic ${apiKey}`,
            },
        });
    }
    return undefined;
};
exports.initialiseClient = initialiseClient;
//# sourceMappingURL=graphqlClient.js.map