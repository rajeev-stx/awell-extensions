"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskSchema = void 0;
const lodash_1 = require("lodash");
const zod_1 = require("zod");
const validation_1 = require("../../../lib/shared/validation");
const intervalTypeEnum = zod_1.z.enum(['daily', 'weekly', 'once']);
const intervalValueWeeklyEnum = zod_1.z.enum([
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
]);
const reminderSchema = zod_1.z
    .discriminatedUnion('reminderIntervalType', [
    /**
     * If `isReminderEnabled` is false or undefined,
     * then all other reminder properties are obsolete.
     */
    zod_1.z.object({
        reminderIntervalType: zod_1.z.literal(undefined),
        reminderIntervalValue: zod_1.z.literal(undefined),
        isReminderEnabled: zod_1.z.union([zod_1.z.literal(false), zod_1.z.literal(undefined)]),
        reminderTime: zod_1.z.literal(undefined),
    }),
    /**
     * If `isReminderEnabled` is true,
     * and `reminderIntervalType` is 'daily'
     * then `reminderIntervalValue` is obsolete
     */
    zod_1.z.object({
        reminderIntervalType: zod_1.z.literal(intervalTypeEnum.enum.daily),
        reminderIntervalValue: zod_1.z.literal(undefined),
        isReminderEnabled: zod_1.z.literal(true),
        reminderTime: zod_1.z.coerce.number(),
    }),
    /**
     * If `isReminderEnabled` is true,
     * and `reminderIntervalType` is 'weekly'
     * then `reminderIntervalValue` should be a comma-separated string of days of the week
     */
    zod_1.z.object({
        reminderIntervalType: zod_1.z.literal(intervalTypeEnum.enum.weekly),
        reminderIntervalValue: zod_1.z
            .string()
            .trim()
            .toLowerCase()
            .refine((value) => {
            const currentValues = value.split(',').map((el) => el.trim());
            const possibleValues = intervalValueWeeklyEnum.options;
            return currentValues.every((el) => possibleValues.includes(el));
        }, {
            message: `Should be comma-separated list of days: ${intervalValueWeeklyEnum.options.join(', ')}`,
        }),
        isReminderEnabled: zod_1.z.literal(true),
        reminderTime: zod_1.z.coerce.number(),
    }),
    /**
     * If `isReminderEnabled` is true,
     * and `reminderIntervalType` is 'once'
     * then `reminderIntervalValue` should be an ISO8601 date
     */
    zod_1.z.object({
        reminderIntervalType: zod_1.z.literal(intervalTypeEnum.enum.once),
        reminderIntervalValue: validation_1.DateOnlySchema,
        isReminderEnabled: zod_1.z.literal(true),
        reminderTime: zod_1.z.coerce.number(),
    }),
])
    .transform(({ isReminderEnabled, reminderIntervalType, reminderIntervalValue, reminderTime, }) => ({
    reminder: (0, lodash_1.isNil)(isReminderEnabled) || !isReminderEnabled
        ? undefined
        : {
            is_enabled: true,
            interval_type: reminderIntervalType,
            interval_value: reminderIntervalValue,
            reminder_time: reminderTime,
        },
}));
exports.createTaskSchema = zod_1.z
    .object({
    patientId: zod_1.z.string().nonempty().optional(),
    assignToUserId: zod_1.z.string().nonempty().optional(),
    content: zod_1.z.string().nonempty(),
    dueDate: validation_1.DateOnlySchema.optional(),
})
    .and(reminderSchema);
//# sourceMappingURL=createTask.zod.js.map