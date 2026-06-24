import { NextResponse } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'
 
// This function can be marked `async` if using `await` inside
export async function proxy(request) {
    const session = await auth.api.getSession({
            headers: await headers()
        })

         const { pathname } = request.nextUrl;
        if(!session){
            return NextResponse.redirect(new URL('/login', request.url))
        }
         const role = session.user?.role;

          if (pathname.startsWith("/dashboard/client")) {
    if (role !== "client") {
      return NextResponse.redirect(
        new URL("/unauthorized", request.url)
      );
    }
  }

   if (pathname.startsWith("/dashboard/freelancer")) {
    if (role !== "freelancer") {
      return NextResponse.redirect(
        new URL("/unauthorized", request.url)
      );
    }
  }

   if (pathname.startsWith("/dashboard/admin")) {
    if (role !== "admin") {
      return NextResponse.redirect(
        new URL("/unauthorized", request.url)
      );
    }
  }
  if (pathname.startsWith("/payment/success")) {
    // any logged-in user can access
  }

  return NextResponse.next();
}
 


 
// Alternatively, you can use a default export:
// export default function proxy(request) { ... }
 
export const config = {
  matcher: ['/dashboard/:path*', '/payment/success'],
}