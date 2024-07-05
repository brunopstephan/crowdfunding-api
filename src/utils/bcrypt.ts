import bcrypt from 'bcrypt'

export function encryptPassword(password: string): string {
  return bcrypt.hashSync(password, 10)
}

export function comparePassword(
  password: string,
  encryptedPassword: string,
): boolean {
  return bcrypt.compareSync(password, encryptedPassword)
}
