import { FindManyUserArgs, User } from 'generated/type-graphql'
import Context from 'interfaces/Context'

export default async (ctx: Context, args: FindManyUserArgs): Promise<User[] | null> => {
  return ctx.prisma.user.findMany(args)
}
