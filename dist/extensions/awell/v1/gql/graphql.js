"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartPathwayDocument = exports.UserQuestionType = exports.SwimlaneItemType = exports.SwimlaneItemCategory = exports.Sex = exports.QuestionType = exports.PluginActionFieldType = exports.PathwayStatus = exports.MessageFormat = exports.MessageAttachmentType = exports.Language = exports.HostedSessionStatus = exports.HostedSessionStakeholderType = exports.ElementType = exports.ElementStatus = exports.DataPointValueType = exports.DataPointSourceType = exports.ConditionOperator = exports.ConditionOperandType = exports.BooleanOperator = exports.ApiCallStatus = exports.ApiCallRequestMethod = exports.ActivitySubjectType = exports.ActivityStatus = exports.ActivityResolution = exports.ActivityObjectType = exports.ActivityAction = exports.ActionType = void 0;
var ActionType;
(function (ActionType) {
    ActionType["ApiCall"] = "API_CALL";
    ActionType["ApiCallGraphql"] = "API_CALL_GRAPHQL";
    ActionType["Calculation"] = "CALCULATION";
    ActionType["Checklist"] = "CHECKLIST";
    ActionType["ClinicalNote"] = "CLINICAL_NOTE";
    ActionType["Form"] = "FORM";
    ActionType["Message"] = "MESSAGE";
    ActionType["Plugin"] = "PLUGIN";
    ActionType["PushToEmr"] = "PUSH_TO_EMR";
})(ActionType = exports.ActionType || (exports.ActionType = {}));
var ActivityAction;
(function (ActivityAction) {
    ActivityAction["Activate"] = "ACTIVATE";
    ActivityAction["Assigned"] = "ASSIGNED";
    ActivityAction["Complete"] = "COMPLETE";
    ActivityAction["Computed"] = "COMPUTED";
    ActivityAction["Delegated"] = "DELEGATED";
    ActivityAction["Deliver"] = "DELIVER";
    ActivityAction["Discarded"] = "DISCARDED";
    ActivityAction["Failed"] = "FAILED";
    ActivityAction["FailedToSend"] = "FAILED_TO_SEND";
    ActivityAction["Generated"] = "GENERATED";
    ActivityAction["IsWaitingOn"] = "IS_WAITING_ON";
    ActivityAction["Postponed"] = "POSTPONED";
    ActivityAction["Processed"] = "PROCESSED";
    ActivityAction["Read"] = "READ";
    ActivityAction["Remind"] = "REMIND";
    ActivityAction["Scheduled"] = "SCHEDULED";
    ActivityAction["Send"] = "SEND";
    ActivityAction["Stopped"] = "STOPPED";
    ActivityAction["Submitted"] = "SUBMITTED";
})(ActivityAction = exports.ActivityAction || (exports.ActivityAction = {}));
var ActivityObjectType;
(function (ActivityObjectType) {
    ActivityObjectType["Action"] = "ACTION";
    ActivityObjectType["ApiCall"] = "API_CALL";
    ActivityObjectType["Calculation"] = "CALCULATION";
    ActivityObjectType["Checklist"] = "CHECKLIST";
    ActivityObjectType["ClinicalNote"] = "CLINICAL_NOTE";
    ActivityObjectType["EmrReport"] = "EMR_REPORT";
    ActivityObjectType["EmrRequest"] = "EMR_REQUEST";
    ActivityObjectType["EvaluatedRule"] = "EVALUATED_RULE";
    ActivityObjectType["Form"] = "FORM";
    ActivityObjectType["Message"] = "MESSAGE";
    ActivityObjectType["Pathway"] = "PATHWAY";
    ActivityObjectType["Patient"] = "PATIENT";
    ActivityObjectType["Plugin"] = "PLUGIN";
    ActivityObjectType["PluginAction"] = "PLUGIN_ACTION";
    ActivityObjectType["Reminder"] = "REMINDER";
    ActivityObjectType["Stakeholder"] = "STAKEHOLDER";
    ActivityObjectType["Step"] = "STEP";
    ActivityObjectType["Track"] = "TRACK";
    ActivityObjectType["User"] = "USER";
})(ActivityObjectType = exports.ActivityObjectType || (exports.ActivityObjectType = {}));
var ActivityResolution;
(function (ActivityResolution) {
    ActivityResolution["Failure"] = "FAILURE";
    ActivityResolution["Success"] = "SUCCESS";
})(ActivityResolution = exports.ActivityResolution || (exports.ActivityResolution = {}));
var ActivityStatus;
(function (ActivityStatus) {
    ActivityStatus["Active"] = "ACTIVE";
    ActivityStatus["Canceled"] = "CANCELED";
    ActivityStatus["Done"] = "DONE";
    ActivityStatus["Failed"] = "FAILED";
})(ActivityStatus = exports.ActivityStatus || (exports.ActivityStatus = {}));
var ActivitySubjectType;
(function (ActivitySubjectType) {
    ActivitySubjectType["Awell"] = "AWELL";
    ActivitySubjectType["Plugin"] = "PLUGIN";
    ActivitySubjectType["Stakeholder"] = "STAKEHOLDER";
    ActivitySubjectType["User"] = "USER";
})(ActivitySubjectType = exports.ActivitySubjectType || (exports.ActivitySubjectType = {}));
var ApiCallRequestMethod;
(function (ApiCallRequestMethod) {
    ApiCallRequestMethod["Get"] = "GET";
    ApiCallRequestMethod["Post"] = "POST";
})(ApiCallRequestMethod = exports.ApiCallRequestMethod || (exports.ApiCallRequestMethod = {}));
var ApiCallStatus;
(function (ApiCallStatus) {
    ApiCallStatus["Failed"] = "Failed";
    ApiCallStatus["InProgress"] = "InProgress";
    ApiCallStatus["Pending"] = "Pending";
    ApiCallStatus["PermanentlyFailed"] = "PermanentlyFailed";
    ApiCallStatus["Skipped"] = "Skipped";
    ApiCallStatus["Success"] = "Success";
})(ApiCallStatus = exports.ApiCallStatus || (exports.ApiCallStatus = {}));
var BooleanOperator;
(function (BooleanOperator) {
    BooleanOperator["And"] = "AND";
    BooleanOperator["Or"] = "OR";
})(BooleanOperator = exports.BooleanOperator || (exports.BooleanOperator = {}));
var ConditionOperandType;
(function (ConditionOperandType) {
    ConditionOperandType["Boolean"] = "BOOLEAN";
    ConditionOperandType["DataSource"] = "DATA_SOURCE";
    ConditionOperandType["Number"] = "NUMBER";
    ConditionOperandType["NumbersArray"] = "NUMBERS_ARRAY";
    ConditionOperandType["String"] = "STRING";
})(ConditionOperandType = exports.ConditionOperandType || (exports.ConditionOperandType = {}));
var ConditionOperator;
(function (ConditionOperator) {
    ConditionOperator["Contains"] = "CONTAINS";
    ConditionOperator["DoesNotContain"] = "DOES_NOT_CONTAIN";
    ConditionOperator["IsAnyOf"] = "IS_ANY_OF";
    ConditionOperator["IsEmpty"] = "IS_EMPTY";
    ConditionOperator["IsEqualTo"] = "IS_EQUAL_TO";
    ConditionOperator["IsGreaterThan"] = "IS_GREATER_THAN";
    ConditionOperator["IsGreaterThanOrEqualTo"] = "IS_GREATER_THAN_OR_EQUAL_TO";
    ConditionOperator["IsInRange"] = "IS_IN_RANGE";
    ConditionOperator["IsLessThan"] = "IS_LESS_THAN";
    ConditionOperator["IsLessThanOrEqualTo"] = "IS_LESS_THAN_OR_EQUAL_TO";
    ConditionOperator["IsNoneOf"] = "IS_NONE_OF";
    ConditionOperator["IsNotEmpty"] = "IS_NOT_EMPTY";
    ConditionOperator["IsNotEqualTo"] = "IS_NOT_EQUAL_TO";
    ConditionOperator["IsNotTrue"] = "IS_NOT_TRUE";
    ConditionOperator["IsTrue"] = "IS_TRUE";
})(ConditionOperator = exports.ConditionOperator || (exports.ConditionOperator = {}));
var DataPointSourceType;
(function (DataPointSourceType) {
    DataPointSourceType["ApiCall"] = "API_CALL";
    DataPointSourceType["ApiCallStatus"] = "API_CALL_STATUS";
    DataPointSourceType["Calculation"] = "CALCULATION";
    DataPointSourceType["Form"] = "FORM";
    DataPointSourceType["Pathway"] = "PATHWAY";
    DataPointSourceType["PatientProfile"] = "PATIENT_PROFILE";
    DataPointSourceType["Step"] = "STEP";
    DataPointSourceType["Track"] = "TRACK";
})(DataPointSourceType = exports.DataPointSourceType || (exports.DataPointSourceType = {}));
var DataPointValueType;
(function (DataPointValueType) {
    DataPointValueType["Boolean"] = "BOOLEAN";
    DataPointValueType["Date"] = "DATE";
    DataPointValueType["Number"] = "NUMBER";
    DataPointValueType["NumbersArray"] = "NUMBERS_ARRAY";
    DataPointValueType["String"] = "STRING";
})(DataPointValueType = exports.DataPointValueType || (exports.DataPointValueType = {}));
var ElementStatus;
(function (ElementStatus) {
    ElementStatus["Active"] = "ACTIVE";
    ElementStatus["Discarded"] = "DISCARDED";
    ElementStatus["Done"] = "DONE";
    ElementStatus["Postponed"] = "POSTPONED";
    ElementStatus["Scheduled"] = "SCHEDULED";
    ElementStatus["Stopped"] = "STOPPED";
})(ElementStatus = exports.ElementStatus || (exports.ElementStatus = {}));
var ElementType;
(function (ElementType) {
    ElementType["Action"] = "ACTION";
    ElementType["Pathway"] = "PATHWAY";
    ElementType["Step"] = "STEP";
    ElementType["Track"] = "TRACK";
    ElementType["Trigger"] = "TRIGGER";
})(ElementType = exports.ElementType || (exports.ElementType = {}));
var HostedSessionStakeholderType;
(function (HostedSessionStakeholderType) {
    HostedSessionStakeholderType["Patient"] = "PATIENT";
    HostedSessionStakeholderType["Stakeholder"] = "STAKEHOLDER";
})(HostedSessionStakeholderType = exports.HostedSessionStakeholderType || (exports.HostedSessionStakeholderType = {}));
var HostedSessionStatus;
(function (HostedSessionStatus) {
    HostedSessionStatus["Active"] = "ACTIVE";
    HostedSessionStatus["Completed"] = "COMPLETED";
    HostedSessionStatus["Expired"] = "EXPIRED";
})(HostedSessionStatus = exports.HostedSessionStatus || (exports.HostedSessionStatus = {}));
var Language;
(function (Language) {
    Language["Dutch"] = "DUTCH";
    Language["English"] = "ENGLISH";
    Language["Estonian"] = "ESTONIAN";
    Language["French"] = "FRENCH";
})(Language = exports.Language || (exports.Language = {}));
var MessageAttachmentType;
(function (MessageAttachmentType) {
    MessageAttachmentType["File"] = "FILE";
    MessageAttachmentType["Link"] = "LINK";
    MessageAttachmentType["Video"] = "VIDEO";
})(MessageAttachmentType = exports.MessageAttachmentType || (exports.MessageAttachmentType = {}));
var MessageFormat;
(function (MessageFormat) {
    MessageFormat["Html"] = "HTML";
    MessageFormat["Slate"] = "SLATE";
})(MessageFormat = exports.MessageFormat || (exports.MessageFormat = {}));
var PathwayStatus;
(function (PathwayStatus) {
    PathwayStatus["Active"] = "active";
    PathwayStatus["Completed"] = "completed";
    PathwayStatus["MissingBaselineInfo"] = "missing_baseline_info";
    PathwayStatus["Starting"] = "starting";
    PathwayStatus["Stopped"] = "stopped";
})(PathwayStatus = exports.PathwayStatus || (exports.PathwayStatus = {}));
var PluginActionFieldType;
(function (PluginActionFieldType) {
    PluginActionFieldType["Html"] = "HTML";
    PluginActionFieldType["Json"] = "JSON";
    PluginActionFieldType["Numeric"] = "NUMERIC";
    PluginActionFieldType["String"] = "STRING";
    PluginActionFieldType["Text"] = "TEXT";
})(PluginActionFieldType = exports.PluginActionFieldType || (exports.PluginActionFieldType = {}));
var QuestionType;
(function (QuestionType) {
    QuestionType["Input"] = "INPUT";
    QuestionType["MultipleChoice"] = "MULTIPLE_CHOICE";
    QuestionType["NoInput"] = "NO_INPUT";
})(QuestionType = exports.QuestionType || (exports.QuestionType = {}));
var Sex;
(function (Sex) {
    Sex["Female"] = "FEMALE";
    Sex["Male"] = "MALE";
    Sex["NotKnown"] = "NOT_KNOWN";
})(Sex = exports.Sex || (exports.Sex = {}));
var SwimlaneItemCategory;
(function (SwimlaneItemCategory) {
    SwimlaneItemCategory["Action"] = "ACTION";
    SwimlaneItemCategory["PathwayEnd"] = "PATHWAY_END";
    SwimlaneItemCategory["PathwayStart"] = "PATHWAY_START";
    SwimlaneItemCategory["Step"] = "STEP";
    SwimlaneItemCategory["Track"] = "TRACK";
    SwimlaneItemCategory["TrackEnd"] = "TRACK_END";
    SwimlaneItemCategory["TrackStart"] = "TRACK_START";
})(SwimlaneItemCategory = exports.SwimlaneItemCategory || (exports.SwimlaneItemCategory = {}));
var SwimlaneItemType;
(function (SwimlaneItemType) {
    SwimlaneItemType["Active"] = "active";
    SwimlaneItemType["Completed"] = "completed";
    SwimlaneItemType["Pending"] = "pending";
    SwimlaneItemType["Possible"] = "possible";
})(SwimlaneItemType = exports.SwimlaneItemType || (exports.SwimlaneItemType = {}));
var UserQuestionType;
(function (UserQuestionType) {
    UserQuestionType["Date"] = "DATE";
    UserQuestionType["Description"] = "DESCRIPTION";
    UserQuestionType["LongText"] = "LONG_TEXT";
    UserQuestionType["MultipleChoice"] = "MULTIPLE_CHOICE";
    UserQuestionType["MultipleChoiceGrid"] = "MULTIPLE_CHOICE_GRID";
    UserQuestionType["MultipleSelect"] = "MULTIPLE_SELECT";
    UserQuestionType["Number"] = "NUMBER";
    UserQuestionType["ShortText"] = "SHORT_TEXT";
    UserQuestionType["Signature"] = "SIGNATURE";
    UserQuestionType["Slider"] = "SLIDER";
    UserQuestionType["YesNo"] = "YES_NO";
})(UserQuestionType = exports.UserQuestionType || (exports.UserQuestionType = {}));
exports.StartPathwayDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "StartPathway" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "StartPathwayInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "startPathway" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "pathway_id" } }] } }] } }] };
//# sourceMappingURL=graphql.js.map