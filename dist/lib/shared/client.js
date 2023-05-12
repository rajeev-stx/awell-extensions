"use strict";
/**
 * This base client module contains two classes and the DataWrapper constructor type.
 *
 * The API Client manages the lifecycle of the call. When it's initialized some opts are passed in, along with the data wrapper constructor function.
 * The DataWrapper is responsible for calling an API and mapping the data, if necessary.
 * The DataWrapper Constructor function makes sure we always pass the DataWrapper a "good" token.
 *
 * Please see `${workspaceFolder}/extensions/elation/client` for an example of extending the base classes.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIClient = exports.DataWrapper = void 0;
const axios_1 = __importDefault(require("axios"));
class DataWrapper {
    constructor(token, baseUrl) {
        this._client = axios_1.default.create({
            baseURL: baseUrl,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            validateStatus: (status) => {
                return status >= 200 && status < 300;
            },
        });
    }
    async Request(opts) {
        const response = await this._client.request(opts);
        return response.data;
    }
}
exports.DataWrapper = DataWrapper;
class APIClient {
    constructor(opts) {
        this.auth = opts.auth;
        this.baseUrl = opts.baseUrl;
    }
    /**
     * A fancy looking way to wrap the API call. There's a simple retry
     * mechanism in here, but it could be extended to include a more complex
     * retry mechanism.
     * @param apiCall something like dw => dw.getStuff()
     * @param isRetry if you don't want to retry, pass boolean `true` as an arg
     * @returns whatever dw.getStuff() returns
     */
    async FetchData(apiCall, isRetry) {
        const dw = await this._getDataWrapper();
        try {
            const res = await apiCall(dw);
            return res;
        }
        catch (err) {
            if (isRetry !== true) {
                await new Promise((resolve) => setTimeout(resolve, 250));
                return await this.FetchData(apiCall, true);
            }
            throw err;
        }
    }
    /**
     * Calls the authenticator and returns a data wrapper with a valid token.
     * @returns DataWrapper
     */
    async _getDataWrapper() {
        const token = await this.auth.authenticate();
        return this.ctor(token.access_token, this.baseUrl);
    }
}
exports.APIClient = APIClient;
//# sourceMappingURL=client.js.map