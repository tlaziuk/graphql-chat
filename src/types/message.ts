import { ObjectType, Field, GraphQLISODateTime } from 'type-graphql'
import { GraphQLID, GraphQLString } from 'graphql'
import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm'
import { Service } from 'typedi'

@ObjectType('Message')
@Entity({ name: 'message' })
@Service()
export default abstract class MessageType {
    @Field(() => GraphQLID, { nullable: false })
    @PrimaryGeneratedColumn('uuid')
    public readonly id: string

    @Field(() => GraphQLString, { nullable: false })
    @Column({ type: 'varchar', nullable: false })
    public readonly content: string

    @Field(() => GraphQLString, { nullable: false })
    @Column({ type: 'varchar', nullable: false })
    public readonly channel: string

    @Field(() => GraphQLISODateTime, { nullable: false })
    @UpdateDateColumn({ nullable: false })
    public readonly updatedAt: Date

    @Field(() => GraphQLISODateTime, { nullable: false })
    @CreateDateColumn({ nullable: false })
    public readonly createdAt: Date
}
