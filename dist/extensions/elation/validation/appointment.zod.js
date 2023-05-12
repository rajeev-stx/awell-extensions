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
exports.appointmentSchema = exports.statusSchema = void 0;
const z = __importStar(require("zod"));
const generic_zod_1 = require("./generic.zod");
const statusEnum = z.enum([
    'Scheduled',
    'Confirmed',
    'Checked Out',
    'Cancelled',
    'With Doctor',
    'In Room',
    'Checked In',
    'In Room - Vitals Taken',
    'Not Seen',
    'Billed',
]);
exports.statusSchema = z.object({
    status: statusEnum,
    room: z.string().optional(),
});
exports.appointmentSchema = z
    .object({
    scheduled_date: generic_zod_1.stringIsoDate,
    duration: z.coerce.number().int().min(1).max(1440).optional(),
    reason: z.string().max(50).nonempty(),
    description: z.string().max(500).optional(),
    status: exports.statusSchema.optional(),
    service_location: z.coerce.number().int().min(1).optional(),
    telehealth_details: z.string().optional(),
    patient: generic_zod_1.numberId,
    physician: generic_zod_1.numberId,
    practice: generic_zod_1.numberId,
    metadata: z.object({}).passthrough().nullish(),
})
    .strict();
//# sourceMappingURL=appointment.zod.js.map