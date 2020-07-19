import { UpdateUserArgs } from 'generated/type-graphql'
import { User } from '@prisma/client'
import Context from 'interfaces/Context'

export default async (ctx: Context, args: UpdateUserArgs): Promise<User | null> => {
  return ctx.prisma.user.update(args)
}
