import { Query, Mutation, Resolver, Ctx, Args } from 'type-graphql'
import { User, FindOneUserArgs, FindManyUserArgs, CreateUserArgs } from 'generated/type-graphql'
import { findOne, findMany, create } from 'api/user/crud/resolvers'
import Context from 'interfaces/Context'

@Resolver(() => User)
export default class UserCrudResolver {
  @Query(() => User)
  public async user(@Ctx() ctx: Context, @Args() args: FindOneUserArgs): Promise<User | null> {
    return findOne(ctx, args)
  }

  @Query(() => [User])
  public async users(@Ctx() ctx: Context, @Args() args: FindManyUserArgs): Promise<User[] | null> {
    return findMany(ctx, args)
  }

  @Mutation(() => User)
  public async createOneUser(@Ctx() ctx: Context, @Args() args: CreateUserArgs): Promise<User | null> {
    return create(ctx, args)
  }
}
