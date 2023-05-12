"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthPassword = exports.OAuthClientCredentials = exports.OAuth = void 0;
const Axios = __importStar(require("axios"));
const url_1 = require("url");
/**
 * In the future, this class should be responsible for not only getting the access token,
 * but also saving the access token _somehwere_ and then refreshing it when it's expired.
 *
 * TODO: save the token object somewhere retrievable, and use refresh token to refresh it
 */
class OAuth {
    constructor({ auth_url, request_config }) {
        this.grantRequest = { ...request_config };
        this.refreshRequest = (tok) => {
            return {
                client_id: request_config.client_id,
                client_secret: request_config.client_secret,
                grant_type: 'refresh_token',
                refresh_token: tok,
            };
        };
        // In testing, we don't currently need the basic auth for elation,
        // even though they include it in their docs. keeping here, regardless.
        const authVal = Buffer.from(`${request_config.client_id}:${request_config.client_secret}`).toString('base64');
        const headers = {
            authorization: `Basic ${authVal}`,
            'content-type': 'application/x-www-form-urlencoded',
        };
        this._client = Axios.default.create({
            baseURL: auth_url,
            headers,
            validateStatus: (status) => {
                return status >= 200 && status < 300;
            },
        });
    }
    /**
     * Responsible for hitting the auth server and getting a fresh access token.
     * @returns a token object
     */
    async authenticate() {
        const req = this._client.post('/', new url_1.URLSearchParams(Object.entries(this.grantRequest)).toString());
        try {
            const res = await req;
            return res.data;
        }
        catch (e) {
            const err = e;
            if (err.response != null) {
                console.log(err.response.data);
                console.log(err.response.status);
            }
            else if (err.request != null) {
                console.error('Axios error: No response was received');
            }
            else {
                console.error('Some error in setting up the auth request');
            }
            throw err;
        }
    }
    /**
     * We aren't currently using the refresh token but including here for the future.
     * @param tok the refresh token
     * @returns a new token object.
     */
    async refreshToken(tok) {
        const req = this._client.post('/', {
            body: new url_1.URLSearchParams(Object.entries(this.refreshRequest(tok))),
        });
        const res = await req;
        return res.data;
    }
}
exports.OAuth = OAuth;
class OAuthClientCredentials extends OAuth {
    constructor({ auth_url, request_config, }) {
        super({
            auth_url,
            request_config: { ...request_config, grant_type: 'client_credentials' },
        });
    }
}
exports.OAuthClientCredentials = OAuthClientCredentials;
class OAuthPassword extends OAuth {
    constructor({ auth_url, request_config, }) {
        super({
            auth_url,
            request_config: { ...request_config, grant_type: 'password' },
        });
    }
}
exports.OAuthPassword = OAuthPassword;
//# sourceMappingURL=auth.js.map