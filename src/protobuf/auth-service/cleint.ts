import { loadSync } from '@grpc/proto-loader'
import { ProtoGrpcType } from '../../../grpc/auth'
import { credentials, loadPackageDefinition } from '@grpc/grpc-js'

const definition = loadSync('src/protobuf/auth-service/auth.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
})

const pkg = (loadPackageDefinition(definition) as unknown) as ProtoGrpcType
const client = new pkg.auth.AuthService(
  process.env.AUTH_SERVICE_HOST + ':' + process.env.AUTH_SERVICE_PORT,
  credentials.createInsecure()
)

export default client
