import jwt from 'jsonwebtoken'

//expires in 5 minutes
export const generateToken = () =>
  jwt.sign({}, process.env.JWT_SECRET, {
    expiresIn: '5min',
  })

export const isTokenValid = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {}) as {
      exp: number
    }

    return decoded.exp * 1000 >= new Date().getTime()
  } catch (error) {
    return false
  }
}
