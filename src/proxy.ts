import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  const token = request.cookies.get('access_token')?.value;

  // If there's no token, but they are trying to access a protected route
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    try {
      // Attempt to refresh using the HttpOnly refresh cookie the browser sent
      const refreshRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
        {
          method: 'POST',
          headers: { Cookie: request.cookies.toString() },
        },
      );

      if (!refreshRes.ok) throw new Error('Refresh failed');

      // The backend returns a new access_token cookie
      const setCookieHeader = refreshRes.headers.get('set-cookie');
      if (setCookieHeader) {
        // Apply the new cookie to the outgoing response to the browser
        response.headers.set('Set-Cookie', setCookieHeader);

        // Also clone it onto the incoming request so Next.js Server Components can read it
        // const newToken = parseCookieStringForToken(setCookieHeader); // Simple utility to extract the value
        const newToken = '';
        request.cookies.set('access_token', newToken);
        response = NextResponse.next({ request });
      }
    } catch {
      // Refresh failed, nuke the session and boot them to login
      response.cookies.delete('access_token');
      response.cookies.delete('refresh_token');
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
