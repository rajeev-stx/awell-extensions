"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAPIClient = exports.ElationAPIClient = exports.ElationDataWrapper = void 0;
const client_1 = require("../../lib/shared/client");
const auth_1 = require("../../lib/shared/auth");
const settings_zod_1 = require("./validation/settings.zod");
class ElationDataWrapper extends client_1.DataWrapper {
    async getAppointment(id) {
        const req = this.Request({
            method: 'GET',
            url: `/appointments/${id}`,
        });
        const res = await req;
        return res;
    }
    async createAppointment(obj) {
        const req = this.Request({
            method: 'POST',
            url: `/appointments`,
            data: obj,
        });
        const res = await req;
        return res;
    }
    async getPatient(id) {
        const req = this.Request({
            method: 'GET',
            url: `/patients/${id}`,
        });
        const res = await req;
        return res;
    }
    async createPatient(obj) {
        const req = this.Request({
            method: 'POST',
            url: `/patients`,
            data: obj,
        });
        const res = await req;
        return res;
    }
    async updatePatient(id, obj) {
        const req = this.Request({
            method: 'PUT',
            url: `/patients/${id}`,
            data: obj,
        });
        const res = await req;
        return res;
    }
    async findSubscriptions() {
        const req = this.Request({
            method: 'GET',
            url: '/app/subscriptions/',
        });
        const res = await req;
        return res.results;
    }
    async createSubscription(obj) {
        const req = this.Request({
            method: 'POST',
            url: '/app/subscriptions/',
            data: obj,
        });
        const res = await req;
        return res;
    }
    async deleteSubscription(id) {
        const req = this.Request({
            method: 'DELETE',
            url: `/app/subscriptions/${id}/`,
        });
        await req;
    }
}
exports.ElationDataWrapper = ElationDataWrapper;
class ElationAPIClient extends client_1.APIClient {
    constructor({ authUrl, requestConfig, ...opts }) {
        super({
            ...opts,
            auth: new auth_1.OAuthPassword({
                auth_url: authUrl,
                request_config: requestConfig,
            }),
        });
        this.ctor = (token, baseUrl) => new ElationDataWrapper(token, baseUrl);
    }
    async getAppointment(id) {
        return await this.FetchData(async (dw) => await dw.getAppointment(id));
    }
    async createAppointment(obj) {
        return await this.FetchData(async (dw) => await dw.createAppointment(obj));
    }
    async getPatient(id) {
        return await this.FetchData(async (dw) => await dw.getPatient(id));
    }
    async createPatient(obj) {
        return await this.FetchData(async (dw) => await dw.createPatient(obj));
    }
    async updatePatient(id, obj) {
        return await this.FetchData(async (dw) => await dw.updatePatient(id, obj));
    }
    async findSubscriptions() {
        return await this.FetchData(async (dw) => await dw.findSubscriptions());
    }
    async createSubscription(obj) {
        return await this.FetchData(async (dw) => await dw.createSubscription(obj));
    }
    async deleteSubscription(id) {
        await this.FetchData(async (dw) => {
            await dw.deleteSubscription(id);
        });
    }
}
exports.ElationAPIClient = ElationAPIClient;
const makeAPIClient = (payloadSettings) => {
    const { base_url, auth_url, ...auth_request_settings } = settings_zod_1.settingsSchema.parse(payloadSettings);
    return new ElationAPIClient({
        authUrl: auth_url,
        requestConfig: auth_request_settings,
        baseUrl: base_url,
    });
};
exports.makeAPIClient = makeAPIClient;
//# sourceMappingURL=client.js.map