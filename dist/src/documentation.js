"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExtensionChangelog = exports.getExtensionDocumentation = void 0;
const fs_1 = __importDefault(require("fs"));
const lodash_1 = require("lodash");
const path_1 = __importDefault(require("path"));
const showdown_1 = __importDefault(require("showdown"));
const converter = new showdown_1.default.Converter({
    tables: true,
    emoji: true,
    underline: true,
});
const loadedDocumentations = {};
const loadedChangelogs = {};
const getAppRootDir = () => {
    let currentDir = __dirname;
    while (!fs_1.default.existsSync(path_1.default.join(currentDir, 'package.json'))) {
        currentDir = path_1.default.join(currentDir, '..');
    }
    return currentDir;
};
const getHtmlFromMarkdownFile = (filePath) => {
    try {
        const md = fs_1.default.readFileSync(filePath, 'utf-8');
        return converter.makeHtml(md);
    }
    catch (_a) {
        return '';
    }
};
const getExtensionDocumentation = (extensionKey) => {
    if ((0, lodash_1.has)(loadedDocumentations, extensionKey)) {
        return loadedDocumentations[extensionKey];
    }
    const extensionReadme = path_1.default.join(getAppRootDir(), 'extensions', extensionKey, 'README.md');
    const documentation = getHtmlFromMarkdownFile(extensionReadme);
    loadedDocumentations[extensionKey] = documentation;
    return documentation;
};
exports.getExtensionDocumentation = getExtensionDocumentation;
const getExtensionChangelog = (extensionKey) => {
    if ((0, lodash_1.has)(loadedChangelogs, extensionKey)) {
        return loadedChangelogs[extensionKey];
    }
    const extensionChangelogPath = path_1.default.join(getAppRootDir(), 'extensions', extensionKey, 'CHANGELOG.md');
    const changelog = getHtmlFromMarkdownFile(extensionChangelogPath);
    loadedChangelogs[extensionKey] = changelog;
    return changelog;
};
exports.getExtensionChangelog = getExtensionChangelog;
//# sourceMappingURL=documentation.js.map