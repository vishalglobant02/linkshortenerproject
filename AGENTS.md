# Agent Instructions - Link Shortener Project

> **Purpose**: This document provides comprehensive coding standards and guidelines for LLMs working on this link shortener project. All detailed instructions are organized in separate markdown files in the `/docs` directory.

## ⚠️ CRITICAL: READ DOCUMENTATION FIRST ⚠️

**BEFORE GENERATING ANY CODE, YOU MUST:**

1. **IDENTIFY** which documentation file(s) are relevant to the task
2. **READ** the complete relevant documentation file(s) from the `/docs` directory
3. **UNDERSTAND** the specific guidelines, patterns, and requirements
4. **APPLY** those guidelines when generating code

**DO NOT:**
- Generate code based on assumptions
- Skip reading the relevant documentation
- Rely only on this overview document
- Implement features without consulting the specific guidelines

**The documentation files contain critical project-specific requirements that MUST be followed.**

## Project Overview

**Type**: Link Shortener Web Application  
**Tech Stack**: Next.js 16 (App Router), TypeScript, React 19, Tailwind CSS 4, Drizzle ORM, Neon PostgreSQL, Clerk Authentication

**Core Functionality**:
- Shorten long URLs into compact, shareable links
- Custom short code support
- Click tracking and analytics
- User authentication and link management
- Dark mode support

## Quick Reference

### Tech Stack Details
- **Framework**: Next.js 16.1.1 with App Router
- **Language**: TypeScript 5 (strict mode)
- **UI**: React 19, Tailwind CSS 4, Lucide React icons
- **Database**: Neon PostgreSQL with Drizzle ORM
- **Authentication**: Clerk
- **Styling**: Tailwind CSS with class-variance-authority

### Project Structure
```
/
├── app/              # Next.js App Router (pages, layouts, API routes)
├── components/       # React components
├── db/              # Database schema and client
├── lib/             # Utility functions
├── docs/            # Agent instructions (this directory)
├── public/          # Static assets
└── hooks/           # Custom React hooks
```

## Documentation Index

> **⚠️ REMINDER**: Before implementing ANY feature or writing ANY code, you MUST read the relevant documentation file(s) below. Each section indicates when to reference it. Reading these files is NOT optional - it is REQUIRED.

### 🔐 [Authentication Guidelines](./docs/authentication.md)
**⚠️ MUST READ BEFORE**: Implementing authentication flows, protecting routes, or working with user sessions

**Key topics**:
- Clerk authentication (EXCLUSIVE auth method)
- Protected route patterns
- Server-side and client-side auth
- Modal-based sign in/up
- Homepage redirect logic for authenticated users
- Security best practices
- Common auth patterns

**Quick rules**:
- Use ONLY Clerk for authentication (no other auth methods)
- Sign In/Sign Up must always be modals, never separate pages
- `/dashboard` is protected and requires authentication
- Redirect logged-in users from homepage to `/dashboard`
- Always verify `userId` server-side for protected operations
- Filter all user data queries by `userId`

---

### 📋 [Coding Standards](./docs/coding-standards.md)
**⚠️ MUST READ BEFORE**: Writing ANY code, creating components, or implementing utilities

**Key topics**:
- TypeScript standards and type safety
- Naming conventions
- React/Next.js component patterns
- Tailwind CSS organization
- Error handling patterns
- Import organization
- Comments and documentation

**Quick rules**:
- Always use explicit types for function parameters and return values
- Server Components by default, Client Components only when needed
- Mobile-first responsive design with Tailwind
- Functional components with hooks exclusively

---

### 🏗️ [Architecture Guidelines](./docs/architecture.md)
**⚠️ MUST READ BEFORE**: Creating new features, API routes, or understanding data flow

**Key topics**:
- Next.js App Router architecture
- Server vs Client Components
- API route patterns
- Data fetching strategies
- State management
- Authentication/authorization with Clerk
- Performance optimization

**Quick rules**:
- Fetch data in Server Components when possible
- Use Server Actions for form submissions
- API routes in `/app/api/` with proper HTTP methods
- Always verify user ownership for protected resources

---

### 🗄️ [Database Guidelines](./docs/database.md)
**⚠️ MUST READ BEFORE**: Working with data models, queries, or migrations

**Key topics**:
- Drizzle ORM usage and patterns
- Schema design (links, clicks, analytics)
- Common query patterns
- Transaction handling
- Migration workflow
- Query optimization
- Security best practices

**Quick rules**:
- Use Drizzle query builder (prevents SQL injection)
- Always filter by `userId` for user data
- Use indexes for frequently queried columns
- Validate data before inserting

---

### 🎨 [UI/UX Guidelines](./docs/ui-ux.md)
**⚠️ MUST READ BEFORE**: Creating UI components, layouts, or implementing designs

**Key topics**:
- Design system (colors, typography, spacing)
- Component design patterns
- Responsive design
- Accessibility (a11y)
- Loading and error states
- Dark mode implementation
- Form design

**Quick rules**:
- Use Tailwind utility classes consistently
- Mobile-first responsive design
- Support dark mode with `dark:` modifier
- Minimum 44x44px touch targets
- Semantic HTML and ARIA labels

---

### 🧩 [shadcn/ui Component Guidelines](./docs/shadcn-ui.md)
**⚠️ MUST READ BEFORE**: Creating ANY UI element or component (MANDATORY - NO EXCEPTIONS)

**Key topics**:
- shadcn/ui component usage (MANDATORY)
- Available components and variants
- Installing new components
- Composition patterns
- Form components with validation
- Dialog/modal patterns
- Loading states with Skeleton

**Quick rules**:
- ALL UI elements MUST use shadcn/ui components
- NEVER create custom UI components from scratch
- Use variants and className for customization
- Compose components for complex UI
- Install missing components with `npx shadcn@latest add [component]`

---

### 🔌 [API Guidelines](./docs/api.md)
**⚠️ MUST READ BEFORE**: Creating or modifying API routes

**Key topics**:
- RESTful API conventions
- Route handler patterns
- Request/response structure
- Status codes
- Input validation
- Authentication in API routes
- Rate limiting
- CORS configuration

**Quick rules**:
- Use appropriate HTTP methods (GET, POST, PATCH, DELETE)
- Return consistent JSON structure
- Proper error status codes (400, 401, 403, 404, 500)
- Always authenticate and authorize
- Validate all input

---

### 🔒 [Security Guidelines](./docs/security.md)
**⚠️ MUST READ BEFORE**: Implementing ANY feature - security is CRITICAL and NON-NEGOTIABLE

**Key topics**:
- Authentication with Clerk
- Authorization patterns
- Input validation and sanitization
- XSS and SQL injection prevention
- Environment variables
- Rate limiting
- Secure headers
- Logging best practices

**Quick rules**:
- Never expose sensitive data in errors
- Always verify resource ownership
- Validate and sanitize all user input
- Use environment variables for secrets
- Never log sensitive data
- Implement rate limiting on public endpoints

---

### 🧪 [Testing Guidelines](./docs/testing.md)
**⚠️ MUST READ BEFORE**: Writing tests or implementing new features

**Key topics**:
- Unit testing utilities and components
- API route testing
- Integration testing
- Mocking strategies
- Test coverage
- E2E testing with Playwright
- CI/CD testing

**Quick rules**:
- Test business-critical features
- Write tests for edge cases
- Use descriptive test names
- Mock external dependencies
- Aim for meaningful coverage

---

## 🚨 MANDATORY WORKFLOW 🚨

**Every time you are asked to write code, follow this workflow:**

### Step 1: Identify Requirements
- What is the user asking for?
- What type of code needs to be written? (component, API, database query, etc.)

### Step 2: Read Relevant Documentation
- Identify which `/docs` file(s) are relevant
- **READ THE ENTIRE RELEVANT FILE(S)** using the read_file tool
- Take note of specific requirements, patterns, and constraints

### Step 3: Plan Implementation
- Design your solution following the guidelines you just read
- Ensure compliance with all rules and patterns

### Step 4: Generate Code
- Write code that adheres to ALL guidelines from the documentation
- Follow the patterns and examples provided

### Step 5: Verify Compliance
- Double-check your code against the documentation
- Ensure all requirements are met

**THIS WORKFLOW IS NOT OPTIONAL. SKIPPING STEP 2 WILL RESULT IN NON-COMPLIANT CODE.**

---

## Core Principles

### 1. Type Safety First
- Use TypeScript strictly
- Explicit types for all function signatures
- No `any` type unless absolutely necessary
- Leverage type inference where appropriate

### 2. Security by Default
- Authenticate all protected routes
- Verify resource ownership
- Validate all inputs
- Sanitize outputs
- Follow principle of least privilege

### 3. Performance Matters
- Use Server Components for data fetching
- Minimize client-side JavaScript
- Optimize images with Next.js Image
- Implement proper caching strategies
- Use loading states and Suspense

### 4. User Experience
- Mobile-first responsive design
- Fast page loads
- Clear error messages
- Accessible to all users
- Support dark mode

### 5. Code Quality
- Self-documenting code with clear names
- Comments for complex logic only
- Consistent formatting (use Prettier/ESLint)
- Small, focused components and functions
- DRY principle but avoid premature abstraction

## Common Patterns

### Creating a New Feature


### Creating a New Component

```typescript
// 1. Import dependencies
import { useState } from 'react';
import { Button } from '@/components/ui/button';

// 2. Define props interface
interface MyComponentProps {
  title: string;
  onAction: () => void;
}

// 3. Determine if Server or Client Component
// Use "use client" only if needed (state, effects, browser APIs)

// 4. Implement component
export function MyComponent({ title, onAction }: MyComponentProps) {
  return (
    <div className="flex flex-col gap-4 p-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <Button onClick={onAction}>Action</Button>
    </div>
  );
}
```

### Creating an API Route

```typescript
// 1. Import dependencies
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { db } from '@/db';

// 2. Implement route handler
export async function GET(request: Request) {
  try {
    // 3. Authenticate
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 4. Fetch data
    const data = await db.query.links.findMany({
      where: (links, { eq }) => eq(links.userId, userId),
    });

    // 5. Return response
    return NextResponse.json({ data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

## Environment Setup

### Required Environment Variables
```env
# Database
DATABASE_URL="postgresql://..."

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."

# Application
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

### Development Commands
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run linter
npm run lint

# Build for production
npm run build

# Database commands
npm run db:generate  # Generate migrations
npm run db:push      # Push schema to database
npm run db:studio    # Open Drizzle Studio
```

## Key Files to Reference

- `tsconfig.json` - TypeScript configuration
- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `drizzle.config.ts` - Database configuration
- `db/schema.ts` - Database schema definitions
- `middleware.ts` - Clerk authentication middleware
- `lib/utils.ts` - Utility functions

## Getting Help

1. **Check the relevant documentation file** in `/docs` directory
2. **Review existing code** for similar patterns
3. **Consult official documentation**:
   - [Next.js Docs](https://nextjs.org/docs)
   - [React Docs](https://react.dev)
   - [Drizzle ORM Docs](https://orm.drizzle.team)
   - [Clerk Docs](https://clerk.com/docs)
   - [Tailwind CSS Docs](https://tailwindcss.com/docs)

## Version Information

- Next.js: 16.1.1
- React: 19.2.3
- TypeScript: 5.x
- Tailwind CSS: 4.x
- Drizzle ORM: 0.45.1
- Node.js: 20+

---

**Last Updated**: December 2025

---

## 🚨 FINAL REMINDER FOR LLMs 🚨

**THIS IS NOT A SUGGESTION - IT IS A REQUIREMENT:**

1. **BEFORE** writing a single line of code, **READ** the relevant documentation file(s) from `/docs`
2. This AGENTS.md file is an **OVERVIEW ONLY** - it does NOT contain the detailed guidelines
3. The detailed guidelines in `/docs/*.md` files are **MANDATORY** and **COMPREHENSIVE**
4. Generating code without reading the relevant documentation files will result in:
   - Non-compliant code
   - Security vulnerabilities
   - Architecture violations
   - Inconsistent patterns
   - Failed implementation

**ALWAYS READ THE RELEVANT DOCUMENTATION FILES FIRST. NO EXCEPTIONS.**
