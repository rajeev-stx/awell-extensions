"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cloudinary = void 0;
const marketplace_1 = require("../../lib/types/marketplace");
const actions_1 = require("./actions");
const settings_1 = require("./settings");
exports.Cloudinary = {
    key: 'cloudinary',
    title: 'Cloudinary (alpha)',
    icon_url: 'https://res.cloudinary.com/da7x4rzl4/image/upload/v1681407040/Awell%20Extensions/cloudinary_logo.png',
    description: 'Cloudinary is a cloud-based image and video management platform for storing, managing, and delivering digital media assets.',
    category: marketplace_1.Category.CONTENT_AND_FILES,
    author: {
        authorType: marketplace_1.AuthorType.AWELL,
    },
    actions: {
        uploadFiles: actions_1.uploadFiles,
    },
    settings: settings_1.settings,
};
//# sourceMappingURL=index.js.map