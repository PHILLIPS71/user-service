import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { PrismaClient } from '@prisma/client'
import { ProtoGrpcType } from '../grpc/hello'
import { UserServiceHandlers } from '../grpc/user/UserService'

const definition = protoLoader.loadSync('./src/hello.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
})

const pkg = (grpc.loadPackageDefinition(definition) as unknown) as ProtoGrpcType
const prisma = new PrismaClient()

const handler: UserServiceHandlers = {
  async findById(call, callback) {
    const user = await prisma.user.findOne({
      where: {
        id: call.request?.id,
      },
    })

    callback(null, user)
  },
}

async function main() {
  var server = new grpc.Server()
  server.addService(pkg.user.UserService.service, (handler as unknown) as grpc.UntypedServiceImplementation)
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => server.start())
}

main()
