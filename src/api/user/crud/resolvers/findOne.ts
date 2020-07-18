import { FindOneUserArgs, User } from 'generated/type-graphql'
import Context from 'interfaces/Context'

export default async (ctx: Context, args: FindOneUserArgs): Promise<User | null> => {
  return ctx.prisma.user.findOne(args)
}
