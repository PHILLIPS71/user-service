import { loadPackageDefinition, ServerCredentials, Server, UntypedServiceImplementation } from '@grpc/grpc-js'
import { loadSync } from '@grpc/proto-loader'
import { UserServiceHandlers } from '../../../grpc/user/UserService'
import { ProtoGrpcType } from '../../../grpc/user'
import { findOne, findMany } from 'protobuf/user-service/resolvers'

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
    await findOne(call, callback)
  },

  async findMany(call, callback) {
    await findMany(call, callback)
  },
}

const server = new Server()
server.addService(pkg.user.UserService.service, (handler as unknown) as UntypedServiceImplementation)
server.bindAsync(process.env.GRPC_HOST + ':' + process.env.GRPC_PORT, ServerCredentials.createInsecure(), () =>
  server.start()
)

export default server
