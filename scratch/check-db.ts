import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('--- DATABASE DIAGNOSTIC ---')
  try {
    // Check States
    console.log('Checking "states" table...')
    const tableNames = await prisma.$queryRaw`SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'`
    console.log('Tables found in public schema:', tableNames)

    // Try to count rows to see if table exists
    try {
      const stateCount = await prisma.$queryRaw`SELECT count(*) FROM "States"`
      console.log('States (Capitalized) row count:', stateCount)
    } catch (e) {
      console.log('Failed to query "States" (Capitalized)')
    }

    try {
      const stateCountLower = await prisma.$queryRaw`SELECT count(*) FROM states`
      console.log('states (lowercase) row count:', stateCountLower)
    } catch (e) {
      console.log('Failed to query states (lowercase)')
    }

  } catch (err) {
    console.error('DIAGNOSTIC FAILED:', err)
  } finally {
    await prisma.$disconnect()
  }
}

main()
