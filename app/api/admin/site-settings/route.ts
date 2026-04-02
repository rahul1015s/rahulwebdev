import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import {
  getActiveLandingVariant,
  isLandingVariant,
  setActiveLandingVariant,
} from '@/lib/site-settings'

async function assertAdmin() {
  try {
    const headersList = await headers()
    const session = await auth.api.getSession({ headers: headersList })

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
    }

    return null
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
}

export async function GET() {
  const unauthorizedResponse = await assertAdmin()
  if (unauthorizedResponse) return unauthorizedResponse

  try {
    const activeLandingVariant = await getActiveLandingVariant()
    return NextResponse.json({ ok: true, settings: { activeLandingVariant } })
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: String(error?.message || error) },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  const unauthorizedResponse = await assertAdmin()
  if (unauthorizedResponse) return unauthorizedResponse

  try {
    const body = await request.json()
    const variant = String(body?.activeLandingVariant || '')

    if (!isLandingVariant(variant)) {
      return NextResponse.json(
        {
          ok: false,
          error: `Invalid activeLandingVariant. Allowed: classic, nebula, grid`,
        },
        { status: 400 }
      )
    }

    await setActiveLandingVariant(variant)
    return NextResponse.json({ ok: true, settings: { activeLandingVariant: variant } })
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: String(error?.message || error) },
      { status: 500 }
    )
  }
}
