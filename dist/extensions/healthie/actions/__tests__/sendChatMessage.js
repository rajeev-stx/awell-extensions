"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = require("../../gql/sdk");
const sdk_2 = require("../../gql/__mocks__/sdk");
const sendChatMessage_1 = require("../sendChatMessage");
jest.mock('../../gql/sdk');
jest.mock('../../graphqlClient');
describe('sendChatMessage action', () => {
    const onComplete = jest.fn();
    beforeAll(() => {
        sdk_1.getSdk.mockImplementation(sdk_2.mockGetSdk);
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("Should create a new message when it doesn't exist", async () => {
        await sendChatMessage_1.sendChatMessage.onActivityCreated({
            pathway: {
                id: 'pathway-id',
                definition_id: 'pathway-definition-id',
            },
            activity: {
                id: 'activity-id',
            },
            patient: { id: 'test-patient' },
            fields: {
                healthie_patient_id: 'patient-1',
                message: 'hello',
                provider_id: 'provider-1'
            },
            settings: {
                apiKey: 'apiKey',
                apiUrl: 'test-url'
            },
        }, onComplete, jest.fn());
        expect(sdk_2.mockGetSdkReturn.getConversationList).toHaveReturnedWith({ data: { conversationMemberships: [] } });
        expect(sdk_2.mockGetSdkReturn.createConversation).toHaveBeenCalled();
        expect(sdk_2.mockGetSdkReturn.sendChatMessage).toHaveBeenCalled();
        expect(onComplete).toHaveBeenCalledWith({
            data_points: {
                conversationId: 'conversation-1'
            }
        });
    });
    test("Should not create a new message when it exists", async () => {
        sdk_1.getSdk.mockReturnValueOnce({
            ...sdk_2.mockGetSdkReturn,
            getConversationList: sdk_2.mockGetSdkReturn.getConversationList.mockReturnValueOnce({
                data: {
                    conversationMemberships: [{
                            convo: {
                                id: 'conversation-2',
                                owner: { id: 'provider-1' }
                            }
                        }]
                }
            })
        });
        await sendChatMessage_1.sendChatMessage.onActivityCreated({
            pathway: {
                id: 'pathway-id',
                definition_id: 'pathway-definition-id',
            },
            activity: {
                id: 'activity-id',
            },
            patient: { id: 'test-patient' },
            fields: {
                healthie_patient_id: 'patient-1',
                message: 'hello',
                provider_id: 'provider-1'
            },
            settings: {
                apiKey: 'apiKey',
                apiUrl: 'test-url'
            },
        }, onComplete, jest.fn());
        expect(sdk_2.mockGetSdkReturn.createConversation).not.toHaveBeenCalled();
        expect(sdk_2.mockGetSdkReturn.sendChatMessage).toHaveBeenCalled();
        expect(onComplete).toHaveBeenCalledWith({
            data_points: {
                conversationId: 'conversation-2'
            }
        });
    });
});
//# sourceMappingURL=sendChatMessage.js.map