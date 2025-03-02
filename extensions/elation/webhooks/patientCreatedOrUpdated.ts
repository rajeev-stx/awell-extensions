import {
  type DataPointDefinition,
  type Webhook,
} from '@awell-health/extensions-core'
import { type SubscriptionEvent } from '../types/subscription'

const dataPoints = {
  patientId: {
    key: 'patientId',
    valueType: 'number',
  },
} satisfies Record<string, DataPointDefinition>

export const patientCreatedOrUpdated: Webhook<
  keyof typeof dataPoints,
  SubscriptionEvent
> = {
  key: 'patientCreatedOrUpdated',
  dataPoints,
  onWebhookReceived: async ({ payload, settings }, onSuccess, onError) => {
    const { data, resource, action } = payload

    // skip non 'saved' actions for that webhook
    if (action !== 'saved') {
      return
    }

    if (resource !== 'patients') {
      await onError({
        response: {
          statusCode: 400,
          message: 'resource must be patients',
        },
      })
    } else {
      await onSuccess({
        data_points: { patientId: String(data.id) },
      })
    }
  },
}

export type OnCreatePatient = typeof patientCreatedOrUpdated
