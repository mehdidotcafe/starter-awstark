import { Prisma, PrismaClient } from '@prisma/client'

import ErrorPersistance from '../../../domain/db/ErrorPersistance'
import IUserPersistance from '../../../domain/db/IUserPersistance'
import User from '../../../domain/User'

const prisma = new PrismaClient()

const getByEmail = (email: User['email']) => prisma.user.findUnique({
  where: {
    email,
  },
  select: {
    id: true,
    email: true,
    firstname: true,
  },
}).then((foundUser) => foundUser ?? undefined)

const createIfNotExists = async (user: Pick<User, 'email' | 'firstname' | 'password'>) => {
  try {
    return await prisma.user.create({
      data: user,
    })
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      throw new ErrorPersistance('UNIQUE_VIOLATION')
    } else {
      throw new ErrorPersistance('UNKNOWN')
    }
  }
}

const userPersistance: IUserPersistance = {
  getByEmail,
  createIfNotExists,
}

export default userPersistance
