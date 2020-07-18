import { buildSchema } from 'type-graphql'
import UserCrudResolver from 'api/user/crud/UserCrudResolver'

export default async () => {
  return buildSchema({
    resolvers: [UserCrudResolver],
    validate: false,
    emitSchemaFile: true,
  })
}
