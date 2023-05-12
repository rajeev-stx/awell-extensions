"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingsSchema = void 0;
const zod_1 = require("zod");
exports.settingsSchema = zod_1.z.object({
    base_url: zod_1.z
        .string({ errorMap: () => ({ message: 'Missing base_url' }) })
        .min(1),
    auth_url: zod_1.z
        .string({ errorMap: () => ({ message: 'Missing auth_url' }) })
        .min(1),
    client_id: zod_1.z
        .string({ errorMap: () => ({ message: 'Missing client_id' }) })
        .min(1),
    client_secret: zod_1.z
        .string({ errorMap: () => ({ message: 'Missing client_secret' }) })
        .min(1),
    username: zod_1.z
        .string({ errorMap: () => ({ message: 'Missing username' }) })
        .min(1),
    password: zod_1.z
        .string({ errorMap: () => ({ message: 'Missing password' }) })
        .min(1),
});
//# sourceMappingURL=settings.zod.js.map