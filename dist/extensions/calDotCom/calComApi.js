"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
class CalComApi {
    constructor(apiKey) {
        this.baseUrl = 'https://api.cal.com/v1';
        this.apiKey = apiKey;
    }
    constructUrl(url) { return `${this.baseUrl}${url}?apiKey=${this.apiKey}`; }
    async getBooking(id) {
        const url = this.constructUrl(`/bookings/${id}`);
        const response = await (0, node_fetch_1.default)(url);
        if (!response.ok)
            throw Error(response.statusText);
        const data = await response.json();
        return data;
    }
}
exports.default = CalComApi;
//# sourceMappingURL=calComApi.js.map