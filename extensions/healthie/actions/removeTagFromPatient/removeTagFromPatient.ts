import { isNil } from 'lodash'
import { HealthieError, mapHealthieToActivityError } from '../../errors'
import { type Action } from '@awell-health/extensions-core'
import { Category } from '@awell-health/extensions-core'
import { getSdk } from '../../gql/sdk'
import { initialiseClient } from '../../graphqlClient'
import { type settings } from '../../settings'
import { fields } from './config'

export const removeTagFromPatient: Action<typeof fields, typeof settings> = {
  key: 'removeTagFromPatient',
  category: Category.EHR_INTEGRATIONS,
  title: 'Remove tag from a patient',
  description: 'Remove a tag from a patient in Healthie.',
  fields,
  previewable: true,
  onActivityCreated: async (payload, onComplete, onError): Promise<void> => {
    const { fields, settings } = payload
    const { id, patient_id } = fields
    try {
      if (isNil(id) || isNil(patient_id)) {
        await onError({
          events: [
            {
              date: new Date().toISOString(),
              text: { en: 'Fields are missing' },
              error: {
                category: 'MISSING_FIELDS',
                message: '`id` or `patient_id` is missing',
              },
            },
          ],
        })
        return
      }

      const client = initialiseClient(settings)
      if (client !== undefined) {
        const sdk = getSdk(client)
        await sdk.removeTagFromUser({
          id,
          taggable_user_id: patient_id,
        })

        await onComplete()
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
