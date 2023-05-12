"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const extensions_1 = require("../../extensions");
const documentation_1 = require("../documentation");
describe('Extensions', () => {
    describe('All extensions should have documentation (i.e. a README file in their root dir)', () => {
        test.each(extensions_1.extensions)('Check $key extension has documentation', (ext) => {
            const documentation = (0, documentation_1.getExtensionDocumentation)(ext.key);
            expect((0, lodash_1.isEmpty)(documentation)).toBe(false);
        });
    });
    describe('All extensions should have a changelog (i.e. a CHANGELOG file in their root dir)', () => {
        test.each(extensions_1.extensions)('Check $key extension has changelog', (ext) => {
            const documentation = (0, documentation_1.getExtensionChangelog)(ext.key);
            expect((0, lodash_1.isEmpty)(documentation)).toBe(false);
        });
    });
});
//# sourceMappingURL=extensions.test.js.map