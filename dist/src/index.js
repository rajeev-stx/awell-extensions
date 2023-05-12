"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lightship_1 = require("lightship");
const ExtensionServer_1 = require("./ExtensionServer");
const extensions_1 = require("../extensions");
const WebServer_1 = require("./WebServer");
const environment_1 = require("../lib/environment");
const moleculer_1 = __importDefault(require("moleculer"));
const typedi_1 = __importDefault(require("typedi"));
const startBroker = async () => {
    var _a;
    const broker = new moleculer_1.default.ServiceBroker({
        transporter: (_a = process.env.MOLECULER_TRANSPORTER) !== null && _a !== void 0 ? _a : 'nats://nats:4222',
        registry: {
            discoverer: {
                type: 'Local',
                options: {
                    heartbeatInterval: 1,
                    heartbeatTimeout: 10,
                    cleanOfflineNodesTimeout: 0.5,
                },
            },
        },
    });
    await broker.start();
    typedi_1.default.set({ id: 'moleculerBroker', value: broker });
};
const start = async () => {
    const lightship = await (0, lightship_1.createLightship)();
    const log = WebServer_1.webServer.log;
    const extensionServer = new ExtensionServer_1.ExtensionServer({
        log,
    });
    lightship.registerShutdownHandler(async () => {
        log.info('Shutting down extension server');
        await extensionServer.shutDown();
        log.info('Shutting down web server');
        await WebServer_1.webServer.close();
    });
    try {
        await WebServer_1.webServer.listen({ port: environment_1.environment.PORT, host: '::' });
        log.info('Initialising extension server');
        await extensionServer.init();
        await extensions_1.extensions.reduce(async (register, extension) => {
            await register;
            await extensionServer.registerExtension(extension);
        }, Promise.resolve());
        log.info('Extension registration completed successfully');
        log.info('Starting moleculer broker');
        await startBroker();
        log.info('Moleculer broker started successfully');
        lightship.signalReady();
    }
    catch (err) {
        log.fatal(err, 'Extension server failed to start');
        await lightship.shutdown();
        process.exit(-1);
    }
};
void start();
//# sourceMappingURL=index.js.map