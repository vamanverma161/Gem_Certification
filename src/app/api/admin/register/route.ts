import { NextRequest, NextResponse } from 'next/server'
import { hashPassword } from '@/lib/password'
import { createToken, setAdminToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { db } = await import('@/lib/db')

    const body = await request.json()
    const { name, email, password, confirmPassword } = body

    console.log('Registration attempt:', { name, email })

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // Check if admin already exists
    console.log('Checking for existing admin...')
    const existingAdmin = await db.admin.findFirst()

    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Admin already exists. Please login.' },
        { status: 400 }
      )
    }

    // Check if email already exists
    console.log('Checking for existing email...')
    const emailExists = await db.admin.findUnique({
      where: { email },
    })

    if (emailExists) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    // Hash password and create admin
    console.log('Hashing password...')
    const hashedPassword = await hashPassword(password)
    console.log('Creating admin...')

    const admin = await db.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    console.log('Admin created:', admin)

    // Create JWT token
    const token = await createToken({
      adminId: admin.id,
      email: admin.email,
    })

    // Set token in cookie
    await setAdminToken(token)

    return NextResponse.json(
      {
        message: 'Admin registered successfully',
        admin: {
          id: admin.id,
          name: admin.name,
          email: admin.email,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error registering admin:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
