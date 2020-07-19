import { FindManyUserArgs } from 'generated/type-graphql'
import { User } from '@prisma/client'
import Context from 'interfaces/Context'

export default async (ctx: Context, args: FindManyUserArgs): Promise<User[] | null> => {
  return ctx.prisma.user.findMany(args)
}
