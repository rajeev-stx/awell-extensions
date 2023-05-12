"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    schema: 'https://staging-api.gethealthie.com/graphql',
    generates: {
        'extensions/healthie/gql/sdk.ts': {
            documents: 'extensions/healthie/actions/graphql/*.graphql',
            plugins: [
                'typescript',
                'typescript-operations',
                'typescript-graphql-request',
            ],
            config: {
                rawRequest: true,
            },
        },
    },
};
exports.default = config;
//# sourceMappingURL=codegen.js.map