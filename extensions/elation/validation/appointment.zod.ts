import { DateTimeSchema, NumericIdSchema } from '@awell-health/extensions-core'
import * as z from 'zod'

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
])

export const statusSchema = z.object({
  status: statusEnum,
  room: z.string().optional(),
})

export const appointmentSchema = z
  .object({
    scheduled_date: DateTimeSchema,
    duration: z.coerce.number().int().min(1).max(1440).optional(),
    reason: z.string().max(50).nonempty(),
    description: z.string().max(500).optional(),
    status: statusSchema.optional(),
    service_location: z.coerce.number().int().min(1).optional(),
    telehealth_details: z.string().optional(),
    patient: NumericIdSchema,
    physician: NumericIdSchema,
    practice: NumericIdSchema,
    metadata: z.object({}).passthrough().nullish(),
  })
  .strict()
