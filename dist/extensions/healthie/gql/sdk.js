"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSdk = exports.UpdateTaskDocument = exports.UpdatePatientDocument = exports.UpdateConversationDocument = exports.UpdateAppointmentDocument = exports.SendChatMessageDocument = exports.RemoveTagFromUserDocument = exports.GetUserDocument = exports.GetFormTemplateDocument = exports.GetConversationListDocument = exports.GetAppointmentDocument = exports.DeleteTaskDocument = exports.DeleteAppointmentDocument = exports.CreateTaskDocument = exports.CreatePatientDocument = exports.CreateLocationDocument = exports.CreateJournalEntryDocument = exports.CreateFormCompletionRequestDocument = exports.CreateFormAnswerGroupDocument = exports.CreateConversationDocument = exports.CreateAppointmentDocument = exports.ApplyTagsToUserDocument = void 0;
const graphql_1 = require("graphql");
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.ApplyTagsToUserDocument = (0, graphql_tag_1.default) `
    mutation applyTagsToUser($ids: [ID], $taggable_user_id: ID) {
  bulkApply(input: {ids: $ids, taggable_user_id: $taggable_user_id}) {
    tags {
      id
      name
    }
    messages {
      field
      message
    }
  }
}
    `;
exports.CreateAppointmentDocument = (0, graphql_tag_1.default) `
    mutation createAppointment($user_id: String, $appointment_type_id: String, $contact_type: String, $other_party_id: String, $datetime: String) {
  createAppointment(
    input: {user_id: $user_id, appointment_type_id: $appointment_type_id, contact_type: $contact_type, other_party_id: $other_party_id, datetime: $datetime}
  ) {
    appointment {
      id
    }
    messages {
      field
      message
    }
  }
}
    `;
exports.CreateConversationDocument = (0, graphql_tag_1.default) `
    mutation createConversation($simple_added_users: String, $owner_id: ID, $name: String) {
  createConversation(
    input: {simple_added_users: $simple_added_users, owner_id: $owner_id, name: $name}
  ) {
    conversation {
      id
    }
    messages {
      field
      message
    }
  }
}
    `;
exports.CreateFormAnswerGroupDocument = (0, graphql_tag_1.default) `
    mutation createFormAnswerGroup($input: createFormAnswerGroupInput!) {
  createFormAnswerGroup(input: $input) {
    form_answer_group {
      id
    }
    messages {
      field
      message
    }
  }
}
    `;
exports.CreateFormCompletionRequestDocument = (0, graphql_tag_1.default) `
    mutation createFormCompletionRequest($input: createRequestedFormInput!) {
  createRequestedFormCompletion(input: $input) {
    requestedFormCompletion {
      id
    }
    messages {
      field
      message
    }
  }
}
    `;
exports.CreateJournalEntryDocument = (0, graphql_tag_1.default) `
    mutation createJournalEntry($input: createEntryInput!) {
  createEntry(input: $input) {
    entry {
      id
    }
    messages {
      field
      message
    }
  }
}
    `;
exports.CreateLocationDocument = (0, graphql_tag_1.default) `
    mutation createLocation($input: createLocationInput!) {
  createLocation(input: $input) {
    location {
      id
      name
      line1
      zip
    }
    messages {
      field
      message
    }
  }
}
    `;
exports.CreatePatientDocument = (0, graphql_tag_1.default) `
    mutation createPatient($input: createClientInput!) {
  createClient(input: $input) {
    user {
      id
    }
    messages {
      field
      message
    }
  }
}
    `;
exports.CreateTaskDocument = (0, graphql_tag_1.default) `
    mutation createTask($content: String, $user_id: String, $priority: Int, $client_id: String, $due_date: String, $reminder: TaskReminderInput) {
  createTask(
    input: {content: $content, user_id: $user_id, priority: $priority, client_id: $client_id, due_date: $due_date, reminder: $reminder}
  ) {
    task {
      id
    }
    messages {
      field
      message
    }
  }
}
    `;
exports.DeleteAppointmentDocument = (0, graphql_tag_1.default) `
    mutation deleteAppointment($id: ID, $deleteRecurring: Boolean) {
  deleteAppointment(input: {id: $id, deleteRecurring: $deleteRecurring}) {
    appointment {
      id
    }
    messages {
      field
      message
    }
  }
}
    `;
exports.DeleteTaskDocument = (0, graphql_tag_1.default) `
    mutation deleteTask($id: ID) {
  deleteTask(input: {id: $id}) {
    task {
      id
    }
    messages {
      field
      message
    }
  }
}
    `;
exports.GetAppointmentDocument = (0, graphql_tag_1.default) `
    query getAppointment($id: ID) {
  appointment(id: $id) {
    id
    date
    contact_type
    pm_status
    provider {
      id
      full_name
    }
    user {
      id
      full_name
    }
    appointment_type {
      id
      name
    }
  }
}
    `;
exports.GetConversationListDocument = (0, graphql_tag_1.default) `
    query getConversationList($offset: Int, $keywords: String, $active_status: String, $client_id: String, $read_status: String, $conversation_type: String, $provider_id: ID) {
  conversationMembershipsCount(
    keywords: $keywords
    active_status: $active_status
    client_id: $client_id
    read_status: $read_status
    conversation_type: $conversation_type
    provider_id: $provider_id
  )
  conversationMemberships(
    offset: $offset
    keywords: $keywords
    active_status: $active_status
    client_id: $client_id
    read_status: $read_status
    conversation_type: $conversation_type
    provider_id: $provider_id
  ) {
    id
    display_name
    archived
    viewed
    convo {
      id
      conversation_memberships_count
      owner {
        id
      }
    }
  }
}
    `;
exports.GetFormTemplateDocument = (0, graphql_tag_1.default) `
    query getFormTemplate($id: ID) {
  customModuleForm(id: $id) {
    id
    name
    use_for_charting
    use_for_program
    prefill
    has_matrix_field
    is_video
    has_non_readonly_modules
    custom_modules {
      id
      mod_type
      label
    }
  }
}
    `;
exports.GetUserDocument = (0, graphql_tag_1.default) `
    query getUser($id: ID) {
  user(id: $id) {
    id
    first_name
    last_name
    dob
    gender
    email
    phone_number
    next_appt_date
    user_group {
      id
      name
    }
    dietitian_id
    providers {
      id
      active
      first_name
      last_name
      email
    }
  }
}
    `;
exports.RemoveTagFromUserDocument = (0, graphql_tag_1.default) `
    mutation removeTagFromUser($id: ID, $taggable_user_id: ID) {
  removeAppliedTag(input: {id: $id, taggable_user_id: $taggable_user_id}) {
    tag {
      id
      name
    }
    messages {
      field
      message
    }
  }
}
    `;
exports.SendChatMessageDocument = (0, graphql_tag_1.default) `
    mutation sendChatMessage($input: createNoteInput!) {
  createNote(input: $input) {
    messages {
      field
      message
    }
    note {
      id
      user_id
      recipient_id
    }
  }
}
    `;
exports.UpdateAppointmentDocument = (0, graphql_tag_1.default) `
    mutation updateAppointment($input: updateAppointmentInput!) {
  updateAppointment(input: $input) {
    appointment {
      id
      date
    }
    messages {
      field
      message
    }
  }
}
    `;
exports.UpdateConversationDocument = (0, graphql_tag_1.default) `
    mutation updateConversation($input: updateConversationInput!) {
  updateConversation(input: $input) {
    conversation {
      id
    }
    messages {
      field
      message
    }
  }
}
    `;
exports.UpdatePatientDocument = (0, graphql_tag_1.default) `
    mutation updatePatient($input: updateClientInput!) {
  updateClient(input: $input) {
    user {
      id
      first_name
      last_name
      legal_name
      email
    }
    messages {
      field
      message
    }
  }
}
    `;
exports.UpdateTaskDocument = (0, graphql_tag_1.default) `
    mutation updateTask($input: updateTaskInput!) {
  updateTask(input: $input) {
    task {
      id
    }
    messages {
      field
      message
    }
  }
}
    `;
const defaultWrapper = (action, _operationName, _operationType) => action();
const ApplyTagsToUserDocumentString = (0, graphql_1.print)(exports.ApplyTagsToUserDocument);
const CreateAppointmentDocumentString = (0, graphql_1.print)(exports.CreateAppointmentDocument);
const CreateConversationDocumentString = (0, graphql_1.print)(exports.CreateConversationDocument);
const CreateFormAnswerGroupDocumentString = (0, graphql_1.print)(exports.CreateFormAnswerGroupDocument);
const CreateFormCompletionRequestDocumentString = (0, graphql_1.print)(exports.CreateFormCompletionRequestDocument);
const CreateJournalEntryDocumentString = (0, graphql_1.print)(exports.CreateJournalEntryDocument);
const CreateLocationDocumentString = (0, graphql_1.print)(exports.CreateLocationDocument);
const CreatePatientDocumentString = (0, graphql_1.print)(exports.CreatePatientDocument);
const CreateTaskDocumentString = (0, graphql_1.print)(exports.CreateTaskDocument);
const DeleteAppointmentDocumentString = (0, graphql_1.print)(exports.DeleteAppointmentDocument);
const DeleteTaskDocumentString = (0, graphql_1.print)(exports.DeleteTaskDocument);
const GetAppointmentDocumentString = (0, graphql_1.print)(exports.GetAppointmentDocument);
const GetConversationListDocumentString = (0, graphql_1.print)(exports.GetConversationListDocument);
const GetFormTemplateDocumentString = (0, graphql_1.print)(exports.GetFormTemplateDocument);
const GetUserDocumentString = (0, graphql_1.print)(exports.GetUserDocument);
const RemoveTagFromUserDocumentString = (0, graphql_1.print)(exports.RemoveTagFromUserDocument);
const SendChatMessageDocumentString = (0, graphql_1.print)(exports.SendChatMessageDocument);
const UpdateAppointmentDocumentString = (0, graphql_1.print)(exports.UpdateAppointmentDocument);
const UpdateConversationDocumentString = (0, graphql_1.print)(exports.UpdateConversationDocument);
const UpdatePatientDocumentString = (0, graphql_1.print)(exports.UpdatePatientDocument);
const UpdateTaskDocumentString = (0, graphql_1.print)(exports.UpdateTaskDocument);
function getSdk(client, withWrapper = defaultWrapper) {
    return {
        applyTagsToUser(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.rawRequest(ApplyTagsToUserDocumentString, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'applyTagsToUser', 'mutation');
        },
        createAppointment(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.rawRequest(CreateAppointmentDocumentString, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'createAppointment', 'mutation');
        },
        createConversation(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.rawRequest(CreateConversationDocumentString, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'createConversation', 'mutation');
        },
        createFormAnswerGroup(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.rawRequest(CreateFormAnswerGroupDocumentString, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'createFormAnswerGroup', 'mutation');
        },
        createFormCompletionRequest(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.rawRequest(CreateFormCompletionRequestDocumentString, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'createFormCompletionRequest', 'mutation');
        },
        createJournalEntry(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.rawRequest(CreateJournalEntryDocumentString, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'createJournalEntry', 'mutation');
        },
        createLocation(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.rawRequest(CreateLocationDocumentString, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'createLocation', 'mutation');
        },
        createPatient(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.rawRequest(CreatePatientDocumentString, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'createPatient', 'mutation');
        },
        createTask(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.rawRequest(CreateTaskDocumentString, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'createTask', 'mutation');
        },
        deleteAppointment(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.rawRequest(DeleteAppointmentDocumentString, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'deleteAppointment', 'mutation');
        },
        deleteTask(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.rawRequest(DeleteTaskDocumentString, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'deleteTask', 'mutation');
        },
        getAppointment(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.rawRequest(GetAppointmentDocumentString, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'getAppointment', 'query');
        },
        getConversationList(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.rawRequest(GetConversationListDocumentString, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'getConversationList', 'query');
        },
        getFormTemplate(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.rawRequest(GetFormTemplateDocumentString, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'getFormTemplate', 'query');
        },
        getUser(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.rawRequest(GetUserDocumentString, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'getUser', 'query');
        },
        removeTagFromUser(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.rawRequest(RemoveTagFromUserDocumentString, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'removeTagFromUser', 'mutation');
        },
        sendChatMessage(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.rawRequest(SendChatMessageDocumentString, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'sendChatMessage', 'mutation');
        },
        updateAppointment(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.rawRequest(UpdateAppointmentDocumentString, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'updateAppointment', 'mutation');
        },
        updateConversation(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.rawRequest(UpdateConversationDocumentString, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'updateConversation', 'mutation');
        },
        updatePatient(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.rawRequest(UpdatePatientDocumentString, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'updatePatient', 'mutation');
        },
        updateTask(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.rawRequest(UpdateTaskDocumentString, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'updateTask', 'mutation');
        }
    };
}
exports.getSdk = getSdk;
//# sourceMappingURL=sdk.js.map