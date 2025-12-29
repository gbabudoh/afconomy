
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Checking Prisma Client...')
  const userClient = prisma.user
  if (userClient) {
    console.log('SUCCESS: prisma.user exists')
  } else {
    console.log('FAILURE: prisma.user is undefined')
  }
}

main()
  .catch(e => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
