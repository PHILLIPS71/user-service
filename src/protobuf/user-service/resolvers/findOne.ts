import { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js'
import { UserWhereUniqueInput } from '../../../../grpc/user/UserWhereUniqueInput'
import { User } from '../../../../grpc/user/User'
import application from 'main'

export default async (
  call: ServerUnaryCall<UserWhereUniqueInput, User>,
  callback: sendUnaryData<User>
): Promise<void> => {
  const user = await application.prisma.user.findOne({
    where: {
      id: call.request?.id,
      email: call.request?.email,
    },
  })

  callback(null, user)
}
