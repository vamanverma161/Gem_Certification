#!/usr/bin/env bun
/**
 * Admin utility script to add gem certifications
 * Usage: bun scripts/add-gem-cert.ts
 */

interface GemCertification {
  certificateNumber: string
  gemName: string
  gemType: string
  weight: string
  color: string
  clarity: string
  issueDate?: string
}

async function addGemCertification(data: GemCertification) {
  try {
    const response = await fetch('http://localhost:3000/api/gems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to add certification')
    }

    const result = await response.json()
    console.log('✅ Certification added successfully:')
    console.log(JSON.stringify(result, null, 2))
    return result
  } catch (error) {
    console.error('❌ Error adding certification:', error)
    process.exit(1)
  }
}

// Example usage
const sampleCert: GemCertification = {
  certificateNumber: 'GEM-2024-999',
  gemName: 'Blue Diamond',
  gemType: 'Natural Diamond',
  weight: '2.50 carats',
  color: 'Fancy Blue',
  clarity: 'VS1',
  issueDate: new Date().toISOString(),
}

// Run the function
console.log('Adding gem certification...')
await addGemCertification(sampleCert)
console.log('\n✨ Done!')

// To add your own certification, modify the sampleCert object above
// or call this script programmatically
