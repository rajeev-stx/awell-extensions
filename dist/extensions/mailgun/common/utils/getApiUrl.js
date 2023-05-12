"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApiUrl = void 0;
const lodash_1 = require("lodash");
const EU_REGION_API_URL = 'https://api.eu.mailgun.net/';
const US_REGION_API_URL = 'https://api.mailgun.net/';
const getApiUrl = ({ region, }) => {
    const serializedRegion = (0, lodash_1.lowerCase)(region);
    if (serializedRegion === 'eu') {
        return EU_REGION_API_URL;
    }
    return US_REGION_API_URL;
};
exports.getApiUrl = getApiUrl;
//# sourceMappingURL=getApiUrl.js.map