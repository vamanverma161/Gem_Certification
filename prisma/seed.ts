import { db } from '@/lib/db'

async function main() {
  console.log('Seeding gem certifications...')

  const sampleGems = [
    {
      certificateNumber: 'GEM-2024-001',
      gemName: 'Royal Blue Sapphire',
      gemType: 'Natural Sapphire',
      weight: '3.52 carats',
      color: 'Royal Blue',
      clarity: 'VS2',
      issueDate: new Date('2024-01-15'),
    },
    {
      certificateNumber: 'GEM-2024-002',
      gemName: 'Pigeon\'s Blood Ruby',
      gemType: 'Natural Ruby',
      weight: '2.18 carats',
      color: 'Pigeon\'s Blood Red',
      clarity: 'VVS1',
      issueDate: new Date('2024-02-20'),
    },
    {
      certificateNumber: 'GEM-2024-003',
      gemName: 'Emerald Cut Diamond',
      gemType: 'Natural Diamond',
      weight: '1.75 carats',
      color: 'G',
      clarity: 'VVS2',
      issueDate: new Date('2024-03-10'),
    },
    {
      certificateNumber: 'GEM-2024-004',
      gemName: 'Colombian Emerald',
      gemType: 'Natural Emerald',
      weight: '4.25 carats',
      color: 'Vivid Green',
      clarity: 'SI1',
      issueDate: new Date('2024-04-05'),
    },
    {
      certificateNumber: 'GEM-2024-005',
      gemName: 'Padparadscha Sapphire',
      gemType: 'Natural Sapphire',
      weight: '2.85 carats',
      color: 'Pink-Orange',
      clarity: 'VS1',
      issueDate: new Date('2024-05-12'),
    },
  ]

  for (const gem of sampleGems) {
    const existing = await db.gemCertification.findUnique({
      where: { certificateNumber: gem.certificateNumber },
    })

    if (!existing) {
      await db.gemCertification.create({
        data: gem,
      })
      console.log(`Created certificate: ${gem.certificateNumber}`)
    } else {
      console.log(`Certificate already exists: ${gem.certificateNumber}`)
    }
  }

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
