import { createLightship } from 'lightship'
import { ExtensionServer } from './ExtensionServer'
import { extensions } from '../extensions'
import { webServer } from './WebServer'
import { environment } from '../lib/environment'
import moleculer from 'moleculer'
import Container from 'typedi'

const startBroker = async (): Promise<void> => {
  const broker = new moleculer.ServiceBroker({
    transporter: process.env.MOLECULER_TRANSPORTER ?? 'nats://nats:4222',
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
  })
  await broker.start()
  Container.set({ id: 'moleculerBroker', value: broker })
}

const start = async (): Promise<void> => {
  const lightship = await createLightship()
  const log = webServer.log
  const extensionServer = new ExtensionServer({
    log,
  })
  lightship.registerShutdownHandler(async () => {
    log.info('Shutting down extension server')
    await extensionServer.shutDown()
    log.info('Shutting down web server')
    await webServer.close()
  })
  try {
    await webServer.listen({ port: environment.PORT, host: '::' })
    log.info('Initialising extension server')
    await extensionServer.init()
    await extensions.reduce(async (register, extension) => {
      await register
      await extensionServer.registerExtension(extension)
    }, Promise.resolve())
    log.info('Extension registration completed successfully')

    log.info('Starting moleculer broker')
    await startBroker()
    log.info('Moleculer broker started successfully')
    lightship.signalReady()
  } catch (err) {
    log.fatal(err, 'Extension server failed to start')
    await lightship.shutdown()
    process.exit(-1)
  }
}

void start()
