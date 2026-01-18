import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { db } = await import('@/lib/db')

    const admin = await db.admin.findFirst()

    return NextResponse.json({
      exists: !!admin,
    })
  } catch (error) {
    console.error('Error checking admin:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
