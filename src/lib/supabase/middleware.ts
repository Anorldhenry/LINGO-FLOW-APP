import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  try {
    let supabaseResponse = NextResponse.next({
      request,
    })

    const supabase = createServerClient(
      'https://xkszgpmnzhbltjyrotbj.supabase.co',
      'sb_publishable_gQ01GGeb4-batGTkTeEtOA_9kp8447J',
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    // Optimization: Skip session refresh for public pages and assets to avoid slow auth checks
    const publicPages = ['/', '/auth', '/setup', '/community', '/admin']
    const isPublicPage = publicPages.includes(request.nextUrl.pathname)
    const isAsset = request.nextUrl.pathname.match(/\.(?:svg|png|jpg|jpeg|gif|webp|ico|js|json)$/)

    if (!isPublicPage && !isAsset) {
      // We use a Promise.race to prevent hanging the whole request if Supabase is slow
      // Reduced timeout to 2s to prevent Dev Server HMR/Internal timeouts (blinking)
      await Promise.race([
        supabase.auth.getUser(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Auth Timeout')), 2000))
      ]).catch(e => console.error("AUTH CHECK TIMEOUT (Expected on slow connections):", e.message))
    }

    return supabaseResponse
  } catch (e) {
    console.error("MIDDLEWARE ERROR:", e)
    return NextResponse.next({ request })
  }
}
