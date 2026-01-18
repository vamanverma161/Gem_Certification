import { NextResponse } from 'next/server'
import { clearAdminToken } from '@/lib/auth'

export async function POST() {
  await clearAdminToken()

  return NextResponse.json({
    message: 'Logout successful',
  })
}
