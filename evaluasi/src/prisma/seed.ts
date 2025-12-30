import prisma from '../database' // sesuaikan path prisma client kamu
import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'

async function main() {
  console.log('🌱 Starting library database seeding...')

  // =========================
  // 🧹 CLEAN DATABASE (URUTAN PENTING)
  // =========================
  await prisma.borrowItem.deleteMany()
  await prisma.borrowRecord.deleteMany()
  await prisma.profile.deleteMany()
  await prisma.book.deleteMany()
  await prisma.user.deleteMany()

  console.log('🧹 Database cleaned')

  // =========================
  // 👥 USERS + PROFILE
  // =========================
  console.log('👥 Creating users & profiles...')
  const users = []

  for (let i = 0; i < 30; i++) {
    const password = await bcrypt.hash('password123', 10)

    const user = await prisma.user.create({
      data: {
        email: faker.internet.email().toLowerCase(),
        username: faker.internet.username(),
        password_hash: password,
        role: faker.helpers.arrayElement(['MEMBER', 'ADMIN']),
        profile: {
          create: {
            name: faker.person.fullName(),
            gender: faker.helpers.arrayElement(['MALE', 'FEMALE']),
            address: faker.location.streetAddress(),
            profile_picture_url: faker.image.avatar()
          }
        }
      }
    })

    users.push(user)
  }

  console.log(`✅ Created ${users.length} users`)

  // =========================
  // 📚 BOOKS
  // =========================
  console.log('📚 Creating books...')
  const books = []

  for (let i = 0; i < 50; i++) {
    const book = await prisma.book.create({
      data: {
        title: faker.lorem.words({ min: 2, max: 5 }),
        author: faker.person.fullName(),
        stock: faker.number.int({ min: 0, max: 20 }),
        cover: faker.image.urlLoremFlickr({ category: 'book' })
      }
    })

    books.push(book)
  }

  console.log(`✅ Created ${books.length} books`)

  // =========================
  // 📖 BORROW RECORDS + ITEMS
  // =========================
  console.log('📖 Creating borrow records...')
  const borrowRecords = []

  for (let i = 0; i < 40; i++) {
    const user = faker.helpers.arrayElement(users)
    const totalItems = faker.number.int({ min: 1, max: 3 })
    const selectedBooks = faker.helpers.arrayElements(books, totalItems)

    const record = await prisma.borrowRecord.create({
      data: {
        user: {
          connect: { id: user.id }
        },
        status: faker.helpers.arrayElement(['BORROWED', 'RETURNED']),
        items: {
          create: selectedBooks.map((book) => ({
            book: {
              connect: { id: book.id }
            },
            qty: faker.number.int({ min: 1, max: 2 })
          }))
        }
      },
      include: {
        items: true
      }
    })

    borrowRecords.push(record)
  }

  console.log(`✅ Created ${borrowRecords.length} borrow records`)

  // =========================
  // 📊 SUMMARY
  // =========================
  const totalBorrowItems = borrowRecords.reduce(
    (sum, record) => sum + record.items.length,
    0
  )

  console.log('\n🎉 Seeding completed successfully!')
  console.log('📊 Summary:')
  console.log(`   - Users: ${users.length}`)
  console.log(`   - Profiles: ${users.length}`)
  console.log(`   - Books: ${books.length}`)
  console.log(`   - Borrow Records: ${borrowRecords.length}`)
  console.log(`   - Borrow Items: ${totalBorrowItems}`)
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
