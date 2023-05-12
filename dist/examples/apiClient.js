"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSampleAPIClient = void 0;
const client_1 = require("../lib/shared/client");
const auth_1 = require("../lib/shared/auth");
/**
 * This is an example of implementing data wrappers and API clients
 */
class SampleDataWrapper extends client_1.DataWrapper {
    async hello() {
        // This is where the actual API call would be made with `this.Request()`
        return 'world';
    }
}
class SampleAPIClient extends client_1.APIClient {
    /**
     * It's recommended to override the base constructor, as it simplifies setup when the client is used by more
     * than one action.
     */
    constructor(opts) {
        // This would be passed in opts, along with credentials for authentication and baseUrl
        const auth_url = 'https://example.com';
        /**
         * This is an example of handling client credentials flow.
         * For password flow, use OAuthPassword class and provide the user credentials.
         */
        const auth = new auth_1.OAuthClientCredentials({
            auth_url,
            request_config: { client_id: '123', client_secret: 'secret' },
        });
        super({ auth, baseUrl: 'https://example.com' });
        this.ctor = (token, baseUrl) => new SampleDataWrapper(token, baseUrl);
    }
    async hello() {
        return await this.FetchData(async (dw) => await dw.hello());
    }
}
/**
 * Sometimes it's easier to use a constructor fxn for the api client.
 * In the case below, we validate the extension's settings as:
 * payloadSettings: Record<keyof typeof settings, string | undefined>
 * by parsing the settings according to our zod schema:
 * const { base_url, ... } = settingsSchema.parse(payloadSettings)
 */
const makeSampleAPIClient = (payloadSettings) => {
    const { base_url, auth_url, ...auth_request_settings } = payloadSettings;
    return new SampleAPIClient({
        authUrl: auth_url,
        requestConfig: auth_request_settings,
        baseUrl: base_url,
    });
};
exports.makeSampleAPIClient = makeSampleAPIClient;
//# sourceMappingURL=apiClient.js.map