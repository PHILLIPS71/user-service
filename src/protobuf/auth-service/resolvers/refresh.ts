import { Metadata } from '@grpc/grpc-js'
import { RefreshTokenInput } from '../../../../grpc/auth/RefreshTokenInput'
import { AccessTokens } from '../../../../grpc/auth/AccessTokens'
import AuthService from 'protobuf/auth-service/cleint'

export default async (args: RefreshTokenInput): Promise<AccessTokens | Error> => {
  const promise = new Promise<AccessTokens>((resolve, reject) => {
    AuthService.refresh(args, new Metadata(), (err, data) => {
      if (err) {
        reject(err)
      }

      resolve(data)
    })
  })

  return promise.catch(() => new Error())
}
