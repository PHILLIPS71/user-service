import { loadPackageDefinition, ServerCredentials, Server, UntypedServiceImplementation } from '@grpc/grpc-js'
import { loadSync } from '@grpc/proto-loader'
import { UserServiceHandlers } from '../../../grpc/user/UserService'
import { ProtoGrpcType } from '../../../grpc/user'
import application from 'main'

const definition = loadSync('src/protobuf/user-service/user.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
})

const pkg = (loadPackageDefinition(definition) as unknown) as ProtoGrpcType

const handler: UserServiceHandlers = {
  async findOne(call, callback) {
    const user = await application.prisma.user.findOne({
      where: {
        id: call.request?.id,
        email: call.request?.email,
      },
    })

    callback(null, user)
  },

  async findMany(call, callback) {
    console.log(call.request)
    const users = await application.prisma.user.findMany({
      where: {
        first_name: call.request?.first_name,
        last_name: call.request?.last_name,
        is_verified: call.request?.is_verified,
      },
    })

    console.log(users)
    callback(null, { users: users })
  },

  async update(call, callback) {
    const user = await application.prisma.user.update({
      where: {
        id: call.request?.id,
        email: call.request?.email,
      },
      data: {
        first_name: call.request?.first_name,
        last_name: call.request?.last_name,
        avatar: call.request?.avatar,
        is_verified: call.request?.is_verified,
      },
    })

    callback(null, user)
  },
}

const server = new Server()
server.addService(pkg.user.UserService.service, (handler as unknown) as UntypedServiceImplementation)
server.bindAsync(process.env.GRPC_HOST + ':' + process.env.GRPC_PORT, ServerCredentials.createInsecure(), () =>
  server.start()
)

export default server
