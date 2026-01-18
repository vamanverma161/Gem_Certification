import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      certificateNumber,
      gemName,
      gemType,
      weight,
      color,
      clarity,
      issueDate,
    } = body

    // Validate required fields
    if (!certificateNumber || !gemName || !gemType || !weight || !color || !clarity) {
      return NextResponse.json(
        { error: 'All required fields must be provided' },
        { status: 400 }
      )
    }

    // Check if certificate already exists
    const existing = await db.gemCertification.findUnique({
      where: {
        certificateNumber: certificateNumber.toUpperCase(),
      },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Certificate with this number already exists' },
        { status: 409 }
      )
    }

    // Create new gem certification
    const gem = await db.gemCertification.create({
      data: {
        certificateNumber: certificateNumber.toUpperCase(),
        gemName,
        gemType,
        weight,
        color,
        clarity,
        issueDate: issueDate ? new Date(issueDate) : new Date(),
      },
    })

    return NextResponse.json(gem, { status: 201 })
  } catch (error) {
    console.error('Error creating gem certificate:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
