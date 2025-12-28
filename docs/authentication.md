# Authentication Guidelines

> **When to reference**: When implementing authentication flows, protecting routes, or working with user sessions

## Overview

This application uses **Clerk** as the exclusive authentication provider. No other authentication methods should be implemented or used. Clerk handles user registration, login, session management, and user profile data.

## Core Principles

### 1. Clerk-Only Authentication
- **ALL** authentication is handled by Clerk
- **DO NOT** implement custom auth flows, JWT handling, or session management
- **DO NOT** use alternative auth libraries (NextAuth, Auth.js, Passport, etc.)
- Always use Clerk's provided hooks, components, and utilities

### 2. Modal-Based Authentication
- Sign In and Sign Up must **always** launch as modals (not separate pages)
- Use Clerk's built-in modal components
- Provides seamless user experience without navigation

### 3. Protected Routes
- `/dashboard` and all dashboard-related routes are protected
- Users must be authenticated to access protected routes
- Unauthenticated users attempting to access protected routes are redirected to sign in

### 4. Homepage Redirect Logic
- If a logged-in user visits the homepage (`/`), redirect them to `/dashboard`
- Only show the homepage/landing page to unauthenticated users
- This ensures authenticated users go straight to their workspace

---

## Implementation Patterns

### Server-Side Authentication

#### Protecting Server Components
```typescript
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }
  
  // Component logic for authenticated users
  return <div>Dashboard Content</div>;
}
```

#### Protecting API Routes
```typescript
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  // API logic for authenticated users
  return NextResponse.json({ data: 'protected data' });
}
```

#### Getting User Information (Server)
```typescript
import { auth, currentUser } from '@clerk/nextjs/server';

// Get user ID only (faster)
const { userId } = await auth();

// Get full user object (includes email, name, etc.)
const user = await currentUser();

if (user) {
  console.log(user.id);
  console.log(user.emailAddresses[0]?.emailAddress);
  console.log(user.firstName);
  console.log(user.lastName);
}
```

### Client-Side Authentication

#### Using Clerk Hooks (Client Components)
```typescript
'use client';

import { useAuth, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export function MyClientComponent() {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  
  // Wait for auth to load
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  
  // Handle unauthenticated state
  if (!isSignedIn) {
    router.push('/');
    return null;
  }
  
  // Render for authenticated users
  return <div>Hello, {user?.firstName}!</div>;
}
```

#### Clerk UI Components
```typescript
'use client';

import { 
  SignInButton, 
  SignUpButton, 
  UserButton,
  SignOutButton 
} from '@clerk/nextjs';

export function AuthButtons() {
  return (
    <div>
      {/* Sign In Modal Trigger */}
      <SignInButton mode="modal">
        <button>Sign In</button>
      </SignInButton>
      
      {/* Sign Up Modal Trigger */}
      <SignUpButton mode="modal">
        <button>Sign Up</button>
      </SignUpButton>
      
      {/* User Profile Button (shows when signed in) */}
      <UserButton afterSignOutUrl="/" />
      
      {/* Sign Out Button */}
      <SignOutButton>
        <button>Sign Out</button>
      </SignOutButton>
    </div>
  );
}
```

### Middleware Configuration

Clerk middleware protects routes automatically. Configure in `middleware.ts`:

```typescript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/api/links(.*)',
  '/api/analytics(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
```

### Homepage Redirect Pattern

Implement redirect logic for logged-in users on the homepage:

```typescript
// app/page.tsx
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const { userId } = await auth();
  
  // Redirect authenticated users to dashboard
  if (userId) {
    redirect('/dashboard');
  }
  
  // Show landing page to unauthenticated users
  return (
    <div>
      <h1>Welcome to Link Shortener</h1>
      {/* Landing page content */}
    </div>
  );
}
```

---

## Route Protection Checklist

When creating a new protected route:

- [ ] Add route pattern to `middleware.ts` protected routes matcher
- [ ] Add `await auth()` check in Server Component
- [ ] Redirect unauthenticated users appropriately
- [ ] For API routes, return 401 status for unauthenticated requests
- [ ] Filter data by `userId` to ensure users only access their own data
- [ ] Test both authenticated and unauthenticated access

## Common Authentication Patterns

### Pattern 1: Dashboard Layout Protection
```typescript
// app/dashboard/layout.tsx
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/');
  }
  
  return (
    <div>
      {/* Dashboard layout wrapper */}
      {children}
    </div>
  );
}
```

### Pattern 2: Conditional Rendering Based on Auth
```typescript
// app/components/navbar.tsx
'use client';

import { useAuth } from '@clerk/nextjs';
import { SignInButton, UserButton } from '@clerk/nextjs';

export function Navbar() {
  const { isSignedIn } = useAuth();
  
  return (
    <nav>
      {isSignedIn ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <SignInButton mode="modal">
          <button>Sign In</button>
        </SignInButton>
      )}
    </nav>
  );
}
```

### Pattern 3: Server Action with Auth
```typescript
'use server';

import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { links } from '@/db/schema';

export async function createLink(url: string) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error('Unauthorized');
  }
  
  const link = await db.insert(links).values({
    userId,
    originalUrl: url,
    shortCode: generateShortCode(),
  });
  
  return link;
}
```

---

## Environment Variables

Required Clerk environment variables in `.env.local`:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Optional: Customize Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/dashboard"
```

## Security Best Practices

### 1. Always Verify User Identity
```typescript
// ❌ BAD: Trusting client-provided userId
export async function deleteLink(linkId: string, userId: string) {
  await db.delete(links).where(eq(links.id, linkId));
}

// ✅ GOOD: Getting userId from Clerk
export async function deleteLink(linkId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');
  
  await db.delete(links)
    .where(and(
      eq(links.id, linkId),
      eq(links.userId, userId) // Verify ownership
    ));
}
```

### 2. Filter All User Data Queries
```typescript
// Always include userId filter
const userLinks = await db.query.links.findMany({
  where: (links, { eq }) => eq(links.userId, userId),
});
```

### 3. Handle Auth Loading States
```typescript
'use client';

export function ProtectedComponent() {
  const { isLoaded, isSignedIn } = useAuth();
  
  if (!isLoaded) {
    return <LoadingSpinner />;
  }
  
  if (!isSignedIn) {
    return <AccessDenied />;
  }
  
  return <SecureContent />;
}
```

### 4. Never Expose User Data
```typescript
// ❌ BAD: Exposing other users' data
export async function GET() {
  const allLinks = await db.query.links.findMany();
  return NextResponse.json({ links: allLinks });
}

// ✅ GOOD: Only return current user's data
export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const userLinks = await db.query.links.findMany({
    where: (links, { eq }) => eq(links.userId, userId),
  });
  
  return NextResponse.json({ links: userLinks });
}
```

---

## Testing Authentication

### Manual Testing Checklist
- [ ] Sign up creates new user account
- [ ] Sign in authenticates existing user
- [ ] Sign out clears session
- [ ] Protected routes redirect unauthenticated users
- [ ] Homepage redirects authenticated users to dashboard
- [ ] Users can only access their own data
- [ ] Sign In/Up modals open correctly (not separate pages)
- [ ] Session persists across page refreshes

### Testing Protected Routes
1. Open route in incognito/private window
2. Verify redirect to sign in occurs
3. Sign in
4. Verify redirect back to intended route
5. Verify data loads correctly

---

## Common Pitfalls to Avoid

### ❌ DON'T: Implement custom authentication
```typescript
// NEVER DO THIS
export async function customLogin(email: string, password: string) {
  // Custom auth logic
}
```

### ❌ DON'T: Use navigation for sign in/up
```typescript
// NEVER DO THIS
<Link href="/sign-in">Sign In</Link>
```

### ❌ DON'T: Store sensitive auth tokens
```typescript
// NEVER DO THIS
localStorage.setItem('authToken', token);
```

### ❌ DON'T: Trust client-side auth state for security
```typescript
// NEVER DO THIS - always verify on server
'use client';

export function DeleteButton({ linkId }: { linkId: string }) {
  const { userId } = useAuth();
  
  const handleDelete = async () => {
    // Sending userId from client is insecure!
    await fetch('/api/links', {
      method: 'DELETE',
      body: JSON.stringify({ linkId, userId }),
    });
  };
  
  return <button onClick={handleDelete}>Delete</button>;
}
```

### ✅ DO: Verify auth on server
```typescript
// API route handler
export async function DELETE(request: Request) {
  const { userId } = await auth(); // Get userId server-side
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Rest of the logic
}
```

---

## Quick Reference

### Clerk Imports
```typescript
// Server-side
import { auth, currentUser } from '@clerk/nextjs/server';

// Client-side
import { 
  useAuth, 
  useUser, 
  SignInButton, 
  SignUpButton, 
  UserButton,
  SignOutButton 
} from '@clerk/nextjs';

// Middleware
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
```

### Common Auth Checks
```typescript
// Server Component
const { userId } = await auth();
if (!userId) redirect('/');

// API Route
const { userId } = await auth();
if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

// Client Component
const { isLoaded, isSignedIn } = useAuth();
if (!isLoaded) return <Loading />;
if (!isSignedIn) return <AccessDenied />;
```

---

## Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk Next.js Integration](https://clerk.com/docs/quickstarts/nextjs)
- [Clerk Components](https://clerk.com/docs/components/overview)
- [Clerk Middleware](https://clerk.com/docs/references/nextjs/clerk-middleware)

---

**Last Updated**: December 2025
