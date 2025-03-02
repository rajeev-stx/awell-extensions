import { isNil } from 'lodash'
import {
  type DataPointDefinition,
  type Action,
} from '@awell-health/extensions-core'
import { Category } from '@awell-health/extensions-core'
import { getSdk } from '../../gql/sdk'
import { initialiseClient } from '../../graphqlClient'
import { type settings } from '../../settings'
import { HealthieError, mapHealthieToActivityError } from '../../errors'
import { fields } from './config'

const dataPoints = {
  healthiePatientId: {
    key: 'healthiePatientId',
    valueType: 'string',
  },
} satisfies Record<string, DataPointDefinition>

export const createPatient: Action<
  typeof fields,
  typeof settings,
  keyof typeof dataPoints
> = {
  key: 'createPatient',
  category: Category.EHR_INTEGRATIONS,
  title: 'Create a patient',
  description: 'Create a patient in Healthie.',
  fields,
  dataPoints,
  previewable: true,
  onActivityCreated: async (payload, onComplete, onError): Promise<void> => {
    const { fields, settings } = payload
    const {
      first_name,
      last_name,
      email,
      phone_number,
      provider_id,
      legal_name,
      send_invite,
      skipped_email,
    } = fields
    try {
      if (isNil(first_name) || isNil(last_name)) {
        await onError({
          events: [
            {
              date: new Date().toISOString(),
              text: { en: 'Fields are missing' },
              error: {
                category: 'MISSING_FIELDS',
                message: '`first_name` or `last_name` is missing',
              },
            },
          ],
        })
        return
      }
      const dont_send_welcome = send_invite !== true
      const client = initialiseClient(settings)
      if (client !== undefined) {
        const sdk = getSdk(client)
        const { data } = await sdk.createPatient({
          input: {
            first_name,
            last_name,
            legal_name,
            email,
            phone_number,
            dietitian_id: provider_id === '' ? undefined : provider_id,
            skipped_email,
            dont_send_welcome,
          },
        })

        const healthiePatientId = data.createClient?.user?.id

        await onComplete({
          data_points: {
            healthiePatientId,
          },
        })
      } else {
        await onError({
          events: [
            {
              date: new Date().toISOString(),
              text: { en: 'API client requires an API url and API key' },
              error: {
                category: 'MISSING_SETTINGS',
                message: 'Missing api url or api key',
              },
            },
          ],
        })
      }
    } catch (err) {
      if (err instanceof HealthieError) {
        const errors = mapHealthieToActivityError(err.errors)
        await onError({
          events: errors,
        })
      } else {
        const error = err as Error
        await onError({
          events: [
            {
              date: new Date().toISOString(),
              text: { en: 'Healthie API reported an error' },
              error: {
                category: 'SERVER_ERROR',
                message: error.message,
              },
            },
          ],
        })
      }
    }
  },
}
