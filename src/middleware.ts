import { withAuth } from 'next-auth/middleware';
import { NextRequest } from 'next/server';

// middleware is applied to all routes, use conditionals to select

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default withAuth(function middleware(req: NextRequest) {}, {});

export const config = {
  matcher: ['/protected/:path*'],
};
