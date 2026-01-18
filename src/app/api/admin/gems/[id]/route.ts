import { NextRequest, NextResponse } from 'next/server'
import { getAdminFromToken } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { db } = await import('@/lib/db')

    const admin = await getAdminFromToken()
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const gem = await db.gemCertification.findUnique({
      where: { id: params.id },
    })

    if (!gem) {
      return NextResponse.json(
        { error: 'Gem not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(gem)
  } catch (error) {
    console.error('Error fetching gem:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const existingGem = await db.gemCertification.findUnique({
      where: { id: params.id },
    })

    if (!existingGem) {
      return NextResponse.json(
        { error: 'Gem not found' },
        { status: 404 }
      )
    }

    if (body.certificateNumber && body.certificateNumber !== existingGem.certificateNumber) {
      const conflict = await db.gemCertification.findUnique({
        where: { certificateNumber: body.certificateNumber.toUpperCase() },
      })

      if (conflict) {
        return NextResponse.json(
          { error: 'Certificate number already exists' },
          { status: 400 }
        )
      }
    }

    const gem = await db.gemCertification.update({
      where: { id: params.id },
      data: {
        ...(body.certificateNumber && {
          certificateNumber: body.certificateNumber.toUpperCase(),
        }),
        ...(body.gemName && { gemName: body.gemName }),
        ...(body.gemType && { gemType: body.gemType }),
        ...(body.carat && { carat: body.carat }),
        ...(body.color && { color: body.color }),
        ...(body.shape !== undefined && { shape: body.shape }),
        ...(body.cut !== undefined && { cut: body.cut }),
        ...(body.origin !== undefined && { origin: body.origin }),
        ...(body.treatment !== undefined && { treatment: body.treatment }),
        ...(body.remarks !== undefined && { remarks: body.remarks }),
        ...(body.status && { status: body.status }),
        ...(body.issueDate && { issueDate: new Date(body.issueDate) }),
      },
    })

    return NextResponse.json({
      message: 'Gem updated successfully',
      gem,
    })
  } catch (error) {
    console.error('Error updating gem:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { db } = await import('@/lib/db')

    const admin = await getAdminFromToken()
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const gem = await db.gemCertification.findUnique({
      where: { id: params.id },
    })

    if (!gem) {
      return NextResponse.json(
        { error: 'Gem not found' },
        { status: 404 }
      )
    }

    await db.gemCertification.delete({
      where: { id: params.id },
    })

    return NextResponse.json({
      message: 'Gem deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting gem:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
