import * as jwt from 'jsonwebtoken'

export function sign(data: object) {
  return jwt.sign(data, 'Eitcha le le', { expiresIn: '30s' })
}
