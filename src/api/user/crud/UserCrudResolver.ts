import { Query, Mutation, Resolver, Ctx, Args } from 'type-graphql'
import { findOne, findMany, create, update } from 'api/user/crud/resolvers'
import { User } from '@prisma/client'
import * as Generated from 'generated/type-graphql'
import Context from 'interfaces/Context'

@Resolver(() => Generated.User)
export default class UserCrudResolver {
  @Query(() => Generated.User)
  public async user(@Ctx() ctx: Context, @Args() args: Generated.FindOneUserArgs): Promise<User | null> {
    return findOne(ctx, args)
  }

  @Query(() => [Generated.User])
  public async users(@Ctx() ctx: Context, @Args() args: Generated.FindManyUserArgs): Promise<User[] | null> {
    return findMany(ctx, args)
  }

  @Mutation(() => Generated.User)
  public async createOneUser(@Ctx() ctx: Context, @Args() args: Generated.CreateUserArgs): Promise<User | null> {
    return create(ctx, args)
  }

  @Mutation(() => Generated.User)
  public async updateOneUser(@Ctx() ctx: Context, @Args() args: Generated.UpdateUserArgs): Promise<User | null> {
    return update(ctx, args)
  }
}
