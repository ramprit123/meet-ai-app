import { auth } from '@/lib/auth';
import { toNextJsHandler } from 'better-auth/next-js';

// Mount Better Auth's handler at /api/auth/[...all]
export const { GET, POST } = toNextJsHandler(auth.handler);
