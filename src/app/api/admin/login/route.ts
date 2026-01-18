import { NextRequest, NextResponse } from 'next/server'
import { verifyPassword } from '@/lib/password'
import { createToken, setAdminToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { db } = await import('@/lib/db')

    const body = await request.json()
    const { email, password } = body

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find admin
    const admin = await db.admin.findUnique({
      where: { email },
    })

    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, admin.password)

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Create JWT token
    const token = await createToken({
      adminId: admin.id,
      email: admin.email,
    })

    // Set token in cookie
    await setAdminToken(token)

    return NextResponse.json({
      message: 'Login successful',
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    })
  } catch (error) {
    console.error('Error logging in admin:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
