"use strict";
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = void 0;
exports.environment = {
    AWELL_ENVIRONMENT: (_a = process.env.AWELL_ENVIRONMENT) !== null && _a !== void 0 ? _a : '',
    EXTENSION_ACTIVITY_CREATED_TOPIC: (_b = process.env.EXTENSION_ACTIVITY_CREATED_TOPIC) !== null && _b !== void 0 ? _b : 'extension-activity-created',
    EXTENSION_ACTIVITY_COMPLETED_TOPIC: (_c = process.env.EXTENSION_ACTIVITY_COMPLETED_TOPIC) !== null && _c !== void 0 ? _c : 'extension-activity-completed',
    EXTENSION_WEBHOOK_RECEIVED_TOPIC: (_d = process.env.EXTENSION_WEBHOOK_RECEIVED_TOPIC) !== null && _d !== void 0 ? _d : 'extension-webhook-received',
    PORT: Number((_e = process.env.PORT) !== null && _e !== void 0 ? _e : 3000),
    LOG_LEVEL: (_f = process.env.LOG_LEVEL) !== null && _f !== void 0 ? _f : 'info',
    PRETTY_LOGS: Boolean((_g = process.env.PRETTY_LOGS) !== null && _g !== void 0 ? _g : false),
};
//# sourceMappingURL=environment.js.map