import * as Argon from 'argon2'
import crypto from 'crypto'

const salt = (): string => {
  return crypto.randomBytes(64).toString('base64')
}

export const hash = (plain: string | Buffer): Promise<string> => {
  return Argon.hash(plain, {
    salt: Buffer.from(salt(), 'utf8'),
    secret: Buffer.from(process.env.ARGON_SECRET, 'utf-8'),
  })
}

export const verify = (hashed: string, plain: string): Promise<boolean> => {
  return Argon.verify(hashed, plain, {
    secret: Buffer.from(process.env.ARGON_SECRET, 'utf-8'),
  })
}
