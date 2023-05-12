"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const types_1 = require("../../../lib/types");
const marketplace_1 = require("../../../lib/types/marketplace");
const fields = {
    hello: {
        id: 'hello',
        label: 'Hello',
        description: 'A string field configured at design time',
        type: types_1.FieldType.STRING,
    },
};
const dataPoints = {
    world: {
        key: 'world',
        valueType: 'string',
    },
};
exports.log = {
    key: 'log',
    category: marketplace_1.Category.DEMO,
    title: 'Log hello world',
    description: 'This is a dummy Custom Action for extension developers.',
    fields,
    previewable: true,
    dataPoints,
    onActivityCreated: async (payload, onComplete) => {
        const { fields } = payload;
        await onComplete({
            data_points: {
                world: fields.hello,
            },
        });
    },
};
//# sourceMappingURL=log.js.map