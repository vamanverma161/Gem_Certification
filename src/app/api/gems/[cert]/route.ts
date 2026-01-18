import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ cert: string }> }
) {
  try {
    const { cert: certificateNumber } = await params

    if (!certificateNumber) {
      return NextResponse.json(
        { error: 'Certificate number is required' },
        { status: 400 }
      )
    }

    const gem = await db.gemCertification.findUnique({
      where: {
        certificateNumber: certificateNumber.toUpperCase(),
      },
    })

    if (!gem) {
      return NextResponse.json(
        { error: 'Certificate not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(gem)
  } catch (error) {
    console.error('Error fetching gem certificate:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
