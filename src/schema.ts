import { buildSchema } from 'type-graphql'
import MessageResolver from './resolvers/message';
import { GraphQLSchema } from 'graphql';
import Container from 'typedi'

export default (): Promise<GraphQLSchema> => buildSchema({
    resolvers: [
        MessageResolver,
    ],
    emitSchemaFile: false,
    container: Container,
})
