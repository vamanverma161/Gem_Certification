import { NextRequest, NextResponse } from 'next/server'
import { getAdminFromToken } from '@/lib/auth'

export async function GET() {
  try {
    const { db } = await import('@/lib/db')

    const admin = await getAdminFromToken()
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const gems = await db.gemCertification.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(gems)
  } catch (error) {
    console.error('Error fetching gems:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await import('@/lib/db')

    const admin = await getAdminFromToken()
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()

    const {
      certificateNumber,
      gemName,
      gemType,
      carat,
      color,
      issueDate,
    } = body

    if (
      !certificateNumber ||
      !gemName ||
      !gemType ||
      !carat ||
      !color ||
      !issueDate
    ) {
      return NextResponse.json(
        { error: 'Certificate number, gem name, type, carat, color, and issue date are required' },
        { status: 400 }
      )
    }

    const existingGem = await db.gemCertification.findUnique({
      where: { certificateNumber: certificateNumber.toUpperCase() },
    })

    if (existingGem) {
      return NextResponse.json(
        { error: 'Certificate number already exists' },
        { status: 400 }
      )
    }

    const gem = await db.gemCertification.create({
      data: {
        certificateNumber: certificateNumber.toUpperCase(),
        gemName,
        gemType,
        carat,
        color,
        shape: body.shape || null,
        cut: body.cut || null,
        origin: body.origin || null,
        treatment: body.treatment || null,
        remarks: body.remarks || null,
        status: body.status || 'Certified',
        issueDate: new Date(issueDate),
      },
    })

    return NextResponse.json(
      {
        message: 'Gem added successfully',
        gem,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating gem:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
