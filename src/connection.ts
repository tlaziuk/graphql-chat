import Container from 'typedi'
import { useContainer, createConnection, Connection } from 'typeorm'
import MessageType from './types/message'

useContainer(Container)

export default (): Promise<Connection> => createConnection({
    entities: [
        MessageType,
    ],
    type: 'sqlite',
    database: 'database.sqlite',
    synchronize: true,
})
