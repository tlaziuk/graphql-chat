import { Resolver, Query, Arg, Subscription, Mutation, PubSub, PubSubEngine, Root } from 'type-graphql'
import { GraphQLID, GraphQLString, GraphQLInt } from 'graphql'
import MessageType from '../types/message';
import { Repository } from 'typeorm'
import { InjectRepository } from 'typeorm-typedi-extensions'
import { Service } from 'typedi';

@Resolver()
@Service()
export default class MessageResolver {
    constructor(
        @InjectRepository(MessageType) private readonly messageRepository: Repository<MessageType>,
    ) { }

    @Query(() => MessageType, { nullable: false })
    public getMessage(
        @Arg('messageId', () => GraphQLID, { nullable: false }) messageId: MessageType['id'],
    ): Promise<MessageType> {
        return this.messageRepository.findOneOrFail(messageId)
    }

    @Query(() => [MessageType], { nullable: false })
    public async getMessages(
        @Arg('skip', () => GraphQLInt, { nullable: true }) skip: number,
        @Arg('take', () => GraphQLInt, { nullable: true }) take: number,
    ): Promise<MessageType[]> {
        return this.messageRepository.find({
            order: {
                createdAt: 'DESC',
            },
            skip,
            take,
        })
    }

    @Mutation(() => MessageType, { nullable: false })
    public async message(
        @PubSub() pubSub: PubSubEngine,
        @Arg('channel', () => GraphQLString, { nullable: false }) channel: string,
        @Arg('content', () => GraphQLString, { nullable: false }) content: string,
    ): Promise<MessageType> {
        const msg = await this.messageRepository.save({ content, channel })

        await pubSub.publish(channel, msg)

        return msg
    }

    @Subscription(() => MessageType, {
        topics: ({ args: { channel } }) => {
            return channel
        },
        nullable: false,
    })
    public subscribeMessage(
        @Root() message: MessageType,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        @Arg('channel', () => GraphQLString, { nullable: false }) channel: string,
    ): MessageType {
        return message
    }
}
