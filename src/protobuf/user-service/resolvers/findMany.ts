import { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js'
import { UserUpdateInput } from '../../../../grpc/user/UserUpdateInput'
import { UserList } from '../../../../grpc/user/UserList'
import application from 'main'

export default async (
  call: ServerUnaryCall<UserUpdateInput, UserList>,
  callback: sendUnaryData<UserList>
): Promise<void> => {
  const users = await application.prisma.user.findMany({
    where: {
      first_name: call.request?.first_name,
      last_name: call.request?.last_name,
      is_verified: call.request?.is_verified,
    },
  })

  callback(null, { users: users })
}
