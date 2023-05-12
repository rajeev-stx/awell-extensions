"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const environment_1 = require("../lib/environment");
var PinoLevel;
(function (PinoLevel) {
    PinoLevel["trace"] = "trace";
    PinoLevel["debug"] = "debug";
    PinoLevel["info"] = "info";
    PinoLevel["warn"] = "warn";
    PinoLevel["error"] = "error";
    PinoLevel["fatal"] = "fatal";
})(PinoLevel || (PinoLevel = {}));
const PinoLevelToSeverityLookup = {
    trace: 'DEBUG',
    debug: 'DEBUG',
    info: 'INFO',
    warn: 'WARNING',
    error: 'ERROR',
    fatal: 'CRITICAL',
};
exports.logger = {
    transport: environment_1.environment.PRETTY_LOGS
        ? {
            target: 'pino-pretty',
            options: {
                colorize: true,
            },
        }
        : undefined,
    level: environment_1.environment.LOG_LEVEL,
    messageKey: 'message',
    formatters: {
        level(label, number) {
            // The pino library uses a string for the label, and unfortunately
            // does not exports the label enum so we have to
            const level = label;
            const severity = label in PinoLevelToSeverityLookup
                ? PinoLevelToSeverityLookup[level]
                : PinoLevelToSeverityLookup.info;
            return {
                severity,
                level: number,
            };
        },
    },
};
//# sourceMappingURL=logger.js.map