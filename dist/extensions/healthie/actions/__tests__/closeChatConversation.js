"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = require("../../gql/sdk");
const sdk_2 = require("../../gql/__mocks__/sdk");
const closeChatConversation_1 = require("../closeChatConversation");
jest.mock('../../gql/sdk');
jest.mock('../../graphqlClient');
describe('closeChatConversation action', () => {
    const onComplete = jest.fn();
    beforeAll(() => {
        sdk_1.getSdk.mockImplementation(sdk_2.mockGetSdk);
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("Should close a conversation", async () => {
        await closeChatConversation_1.closeChatConversation.onActivityCreated({
            pathway: {
                id: 'pathway-id',
                definition_id: 'pathway-definition-id',
            },
            activity: {
                id: 'activity-id',
            },
            patient: { id: 'test-patient' },
            fields: {
                id: 'conversation-1',
                provider_id: 'provider-1'
            },
            settings: {
                apiKey: 'apiKey',
                apiUrl: 'test-url'
            },
        }, onComplete, jest.fn());
        expect(sdk_2.mockGetSdkReturn.updateConversation).toHaveBeenCalledWith({
            input: {
                id: 'conversation-1',
                closed_by_id: 'provider-1'
            }
        });
        expect(onComplete).toHaveBeenCalled();
    });
});
//# sourceMappingURL=closeChatConversation.js.map