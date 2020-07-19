import { CreateUserArgs } from 'generated/type-graphql'
import { User } from '@prisma/client'
import { hash } from 'services/argon'
import Context from 'interfaces/Context'

export default async (ctx: Context, args: CreateUserArgs): Promise<User> => {
  const existing = await ctx.prisma.user.findOne({ where: { email: args.data.email } })
  if (existing) {
    throw new Error('an account already exists with that email')
  }

  args.data.password = await hash(args.data.password)
  return ctx.prisma.user.create(args)
}
