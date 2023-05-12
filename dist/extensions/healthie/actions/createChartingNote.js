"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChartingNote = void 0;
const lodash_1 = require("lodash");
const types_1 = require("../../../lib/types");
const marketplace_1 = require("../../../lib/types/marketplace");
const sdk_1 = require("../gql/sdk");
const graphqlClient_1 = require("../graphqlClient");
const fields = {
    healthie_patient_id: {
        id: 'healthie_patient_id',
        label: 'Healthie Patient ID',
        description: 'The ID of the patient you would like to create a charting note for.',
        type: types_1.FieldType.STRING,
        required: true,
    },
    form_id: {
        id: 'form_id',
        label: 'Form ID',
        description: 'The ID of the form you would like to create the charting note against.',
        type: types_1.FieldType.STRING,
        required: true,
    },
    note_content: {
        id: 'note_content',
        label: 'Note content',
        description: 'The content of the charting note.',
        type: types_1.FieldType.HTML,
        required: true,
    },
};
exports.createChartingNote = {
    key: 'createChartingNote',
    category: marketplace_1.Category.EHR_INTEGRATIONS,
    title: 'Create charting note',
    description: 'Create a charting note in Healthie.',
    fields,
    previewable: true,
    onActivityCreated: async (payload, onComplete, onError) => {
        var _a;
        const { fields, settings } = payload;
        const { healthie_patient_id, form_id, note_content } = fields;
        try {
            if ((0, lodash_1.isNil)(healthie_patient_id) || (0, lodash_1.isNil)(form_id) || (0, lodash_1.isNil)(note_content)) {
                await onError({
                    events: [
                        {
                            date: new Date().toISOString(),
                            text: { en: 'Fields are missing' },
                            error: {
                                category: 'MISSING_FIELDS',
                                message: '`healthie_patient_id`, `form_id` or `note_content` is missing',
                            },
                        },
                    ],
                });
                return;
            }
            const client = (0, graphqlClient_1.initialiseClient)(settings);
            if (client !== undefined) {
                const sdk = (0, sdk_1.getSdk)(client);
                const { data } = await sdk.getFormTemplate({
                    id: form_id,
                });
                const moduleForm = data.customModuleForm;
                if ((0, lodash_1.isNil)(moduleForm)) {
                    await onError({
                        events: [
                            {
                                date: new Date().toISOString(),
                                text: { en: "Form doesn't exist" },
                                error: {
                                    category: 'WRONG_INPUT',
                                    message: `Form with id ${form_id} doesn't exist`,
                                },
                            },
                        ],
                    });
                    return;
                }
                if (moduleForm.use_for_charting !== true) {
                    await onError({
                        events: [
                            {
                                date: new Date().toISOString(),
                                text: { en: "Form isn't a charting form" },
                                error: {
                                    category: 'SERVER_ERROR',
                                    message: `Form with id ${form_id} cannot be used for charting`,
                                },
                            },
                        ],
                    });
                    return;
                }
                const firstTextAreaField = (_a = moduleForm.custom_modules) === null || _a === void 0 ? void 0 : _a.find(({ mod_type }) => mod_type === 'textarea');
                if ((0, lodash_1.isNil)(firstTextAreaField)) {
                    await onError({
                        events: [
                            {
                                date: new Date().toISOString(),
                                text: {
                                    en: 'Form doesn\'t have a question of type "textarea" (long text).',
                                },
                                error: {
                                    category: 'WRONG_DATA',
                                    message: `Form with id ${form_id}  doesn't have a "textarea" field`,
                                },
                            },
                        ],
                    });
                    return;
                }
                await sdk.createFormAnswerGroup({
                    input: {
                        finished: true,
                        custom_module_form_id: form_id,
                        user_id: healthie_patient_id,
                        form_answers: [
                            {
                                custom_module_id: firstTextAreaField.id,
                                user_id: healthie_patient_id,
                                answer: note_content,
                            },
                        ],
                    },
                });
                await onComplete();
            }
            else {
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
                });
            }
        }
        catch (err) {
            const error = err;
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
            });
        }
    },
};
//# sourceMappingURL=createChartingNote.js.map