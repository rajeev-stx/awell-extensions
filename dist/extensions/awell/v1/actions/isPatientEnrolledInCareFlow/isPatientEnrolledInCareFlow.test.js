"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("../../gql/graphql");
const awellSdk_1 = __importDefault(require("../../sdk/awellSdk"));
const isPatientEnrolledInCareFlow_1 = require("./isPatientEnrolledInCareFlow");
jest.mock('../../sdk/awellSdk');
const mockGetPatientCareFlowsFn = jest.spyOn(awellSdk_1.default.prototype, 'getPatientCareFlows');
describe('Is patient already enrolled in care flow action', () => {
    const onComplete = jest.fn();
    const onError = jest.fn();
    beforeEach(() => {
        onComplete.mockClear();
        onError.mockClear();
    });
    test('Should call the onComplete callback and return true if patient is already enrolled in the care flow', async () => {
        mockGetPatientCareFlowsFn.mockReturnValueOnce(Promise.resolve([
            {
                id: 'pathway-instance-id-1',
                title: 'Pathway definition one',
                pathway_definition_id: 'pathway-definition-1',
                release_id: 'release-1',
                status: graphql_1.PathwayStatus.Active,
            },
            {
                id: 'pathway-instance-id-2',
                title: 'Pathway definition one',
                pathway_definition_id: 'pathway-definition-1',
                release_id: 'release-1',
                status: graphql_1.PathwayStatus.Active,
            },
        ]));
        await isPatientEnrolledInCareFlow_1.isPatientEnrolledInCareFlow.onActivityCreated({
            pathway: {
                id: 'pathway-instance-id-1',
                definition_id: 'pathway-definition-1',
            },
            activity: {
                id: 'activity-id',
            },
            patient: {
                id: 'a-patient-id',
            },
            fields: {
                pathwayStatus: '',
                careFlowDefinitionIds: undefined, // By default, only care flows with same definition id as current care flow
            },
            settings: {
                apiUrl: 'an-api-url',
                apiKey: 'an-api-key',
            },
        }, onComplete, onError);
        // expect(mockFn).toHaveBeenCalled()
        expect(onComplete).toHaveBeenCalledWith({
            data_points: {
                result: 'true',
                nbrOfResults: '1',
                careFlowIds: 'pathway-instance-id-2',
            },
        });
        expect(onError).not.toHaveBeenCalled();
    });
    test('Should call the onComplete callback and return false if patient is not yet enrolled in another care flow with same care flow definition id', async () => {
        mockGetPatientCareFlowsFn.mockReturnValueOnce(Promise.resolve([
            {
                id: 'pathway-instance-id-1',
                title: 'Pathway definition one',
                pathway_definition_id: 'pathway-definition-1',
                release_id: 'release-1',
                status: graphql_1.PathwayStatus.Active,
            },
        ]));
        await isPatientEnrolledInCareFlow_1.isPatientEnrolledInCareFlow.onActivityCreated({
            pathway: {
                id: 'pathway-instance-id-1',
                definition_id: 'pathway-definition-1',
            },
            activity: {
                id: 'activity-id',
            },
            patient: {
                id: 'a-patient-id',
            },
            fields: {
                pathwayStatus: undefined,
                careFlowDefinitionIds: undefined, // By default, only care flows with same definition id as current care flow
            },
            settings: {
                apiUrl: 'an-api-url',
                apiKey: 'an-api-key',
            },
        }, onComplete, onError);
        expect(onComplete).toHaveBeenCalledWith({
            data_points: {
                result: 'false',
                nbrOfResults: '0',
                careFlowIds: '',
            },
        });
        expect(onError).not.toHaveBeenCalled();
    });
    test('Should call the onComplete callback and return true if patient is already enrolled in a completed care flow when status includes "completed" care flows', async () => {
        mockGetPatientCareFlowsFn.mockReturnValueOnce(Promise.resolve([
            {
                id: 'pathway-instance-id-1',
                title: 'Pathway definition one',
                pathway_definition_id: 'pathway-definition-1',
                release_id: 'release-1',
                status: graphql_1.PathwayStatus.Active,
            },
            {
                id: 'pathway-instance-id-2',
                title: 'Pathway definition one',
                pathway_definition_id: 'pathway-definition-1',
                release_id: 'release-1',
                status: graphql_1.PathwayStatus.Completed,
            },
        ]));
        await isPatientEnrolledInCareFlow_1.isPatientEnrolledInCareFlow.onActivityCreated({
            pathway: {
                id: 'pathway-instance-id-1',
                definition_id: 'pathway-definition-1',
            },
            activity: {
                id: 'activity-id',
            },
            patient: {
                id: 'a-patient-id',
            },
            fields: {
                pathwayStatus: `${graphql_1.PathwayStatus.Completed}`,
                careFlowDefinitionIds: undefined,
            },
            settings: {
                apiUrl: 'an-api-url',
                apiKey: 'an-api-key',
            },
        }, onComplete, onError);
        expect(onComplete).toHaveBeenCalledWith({
            data_points: {
                result: 'true',
                nbrOfResults: '1',
                careFlowIds: 'pathway-instance-id-2',
            },
        });
        expect(onError).not.toHaveBeenCalled();
    });
    test('Should call the onComplete callback and return true if patient is already enrolled in another care flow when careFlowDefinitionIds filter is specified', async () => {
        mockGetPatientCareFlowsFn.mockReturnValueOnce(Promise.resolve([
            {
                id: 'pathway-instance-id-1',
                title: 'Pathway definition one',
                pathway_definition_id: 'pathway-definition-1',
                release_id: 'release-1',
                status: graphql_1.PathwayStatus.Active,
            },
            {
                id: 'pathway-instance-id-2',
                title: 'Pathway definition two',
                pathway_definition_id: 'pathway-definition-2',
                release_id: 'release-1',
                status: graphql_1.PathwayStatus.Active,
            },
        ]));
        await isPatientEnrolledInCareFlow_1.isPatientEnrolledInCareFlow.onActivityCreated({
            pathway: {
                id: 'pathway-instance-id-1',
                definition_id: 'pathway-definition-1',
            },
            activity: {
                id: 'activity-id',
            },
            patient: {
                id: 'a-patient-id',
            },
            fields: {
                pathwayStatus: '',
                careFlowDefinitionIds: 'pathway-definition-2', // Note that this is different than the care flow the patient is currently enrolled in
            },
            settings: {
                apiUrl: 'an-api-url',
                apiKey: 'an-api-key',
            },
        }, onComplete, onError);
        expect(onComplete).toHaveBeenCalledWith({
            data_points: {
                result: 'true',
                nbrOfResults: '1',
                careFlowIds: 'pathway-instance-id-2',
            },
        });
        expect(onError).not.toHaveBeenCalled();
    });
    test('Should call the onComplete callback and return true if patient is already in more than one other active or completed care flow', async () => {
        mockGetPatientCareFlowsFn.mockReturnValueOnce(Promise.resolve([
            {
                id: 'pathway-instance-id-1',
                title: 'Pathway definition one',
                pathway_definition_id: 'pathway-definition-1',
                release_id: 'release-1',
                status: graphql_1.PathwayStatus.Active,
            },
            {
                id: 'pathway-instance-id-2',
                title: 'Pathway definition one',
                pathway_definition_id: 'pathway-definition-1',
                release_id: 'release-1',
                status: graphql_1.PathwayStatus.Active,
            },
            {
                id: 'pathway-instance-id-3',
                title: 'Pathway definition one',
                pathway_definition_id: 'pathway-definition-1',
                release_id: 'release-1',
                status: graphql_1.PathwayStatus.Completed,
            },
        ]));
        await isPatientEnrolledInCareFlow_1.isPatientEnrolledInCareFlow.onActivityCreated({
            pathway: {
                id: 'pathway-instance-id-1',
                definition_id: 'pathway-definition-1',
            },
            activity: {
                id: 'activity-id',
            },
            patient: {
                id: 'a-patient-id',
            },
            fields: {
                pathwayStatus: `${graphql_1.PathwayStatus.Active}, ${graphql_1.PathwayStatus.Completed}`,
                careFlowDefinitionIds: 'pathway-definition-1',
            },
            settings: {
                apiUrl: 'an-api-url',
                apiKey: 'an-api-key',
            },
        }, onComplete, onError);
        expect(onComplete).toHaveBeenCalledWith({
            data_points: {
                result: 'true',
                nbrOfResults: '2',
                careFlowIds: 'pathway-instance-id-2,pathway-instance-id-3',
            },
        });
        expect(onError).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=isPatientEnrolledInCareFlow.test.js.map