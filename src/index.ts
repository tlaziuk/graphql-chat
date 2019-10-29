import 'core-js'
import 'reflect-metadata'

import { ApolloServer } from 'apollo-server'
import createSchema from './schema'
import createConnection from './connection'

async function bootstrap(): Promise<void> {
    const [
        schema
    ] = await Promise.all([
        createSchema(),
        createConnection(),
    ])

    const server = new ApolloServer({
        schema,
        playground: true,
    })

    server.listen(8080)

    process.on("beforeExit", () => {
        server.stop()
    })
}

bootstrap()
