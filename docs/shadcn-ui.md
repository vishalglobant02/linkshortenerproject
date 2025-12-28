# shadcn/ui Component Guidelines

> **Purpose**: This document defines the standards for using shadcn/ui components throughout the Link Shortener application.

## Core Principle

**ALL UI elements in this app MUST use shadcn/ui components. DO NOT create custom UI components from scratch.**

## What is shadcn/ui?

shadcn/ui is a collection of re-usable, accessible components built with Radix UI and Tailwind CSS. Components are copied into your project (in `/components/ui/`), giving you full control over the code.

## Component Usage Rules

### 1. Always Use shadcn/ui Components

❌ **NEVER DO THIS:**
```typescript
// Creating custom button component
export function CustomButton({ children, onClick }: ButtonProps) {
  return (
    <button 
      className="px-4 py-2 bg-blue-500 text-white rounded"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

✅ **ALWAYS DO THIS:**
```typescript
// Use shadcn/ui Button component
import { Button } from '@/components/ui/button';

export function MyComponent() {
  return <Button>Click me</Button>;
}
```

### 2. Available Components

Common shadcn/ui components used in this project:
- **Button** - All clickable actions
- **Input** - Text input fields
- **Card** - Content containers
- **Dialog** - Modals and overlays
- **Form** - Form controls with validation
- **Label** - Input labels
- **Tabs** - Tabbed interfaces
- **Badge** - Status indicators
- **Alert** - Messages and notifications
- **Tooltip** - Contextual help
- **Select** - Dropdown selections
- **Checkbox** - Toggle options
- **Switch** - On/off controls
- **Separator** - Visual dividers
- **Skeleton** - Loading placeholders

### 3. Installing New Components

If you need a shadcn/ui component that isn't installed:

```bash
npx shadcn@latest add [component-name]
```

Examples:
```bash
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add form
```

### 4. Customizing Components

Customize using **variants** and **Tailwind classes**, not by creating new components:

```typescript
import { Button } from '@/components/ui/button';

// Use built-in variants
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Close</Button>

// Add custom styling with className
<Button className="w-full mt-4">
  Full Width Button
</Button>
```

### 5. Composition Pattern

Build complex UI by **composing** shadcn/ui components:

```typescript
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function LinkCard({ link }: { link: Link }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{link.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{link.url}</p>
        <Button variant="outline" className="mt-2">
          Copy Link
        </Button>
      </CardContent>
    </Card>
  );
}
```

## Common Patterns

### Forms with Validation

Always use shadcn/ui Form components with react-hook-form:

```typescript
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export function LinkForm() {
  const form = useForm();
  
  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>URL</FormLabel>
            <FormControl>
              <Input placeholder="https://example.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
}
```

### Dialogs/Modals

Use Dialog component for all modals:

```typescript
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function DeleteDialog({ onDelete }: { onDelete: () => void }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <Button onClick={onDelete}>Confirm Delete</Button>
      </DialogContent>
    </Dialog>
  );
}
```

### Loading States

Use Skeleton for loading states:

```typescript
import { Skeleton } from '@/components/ui/skeleton';

export function LinkCardSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}
```

## When You Can Create Custom Components

You can create **feature components** (business logic components) that **use** shadcn/ui components internally:

✅ **ALLOWED:**
```typescript
// Feature component that uses shadcn/ui components
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function LinkStats({ linkId }: { linkId: string }) {
  const stats = useStats(linkId);
  
  return (
    <Card>
      <CardContent>
        <p>Clicks: {stats.clicks}</p>
        <Button>View Details</Button>
      </CardContent>
    </Card>
  );
}
```

❌ **NOT ALLOWED:**
```typescript
// Creating a custom UI component from scratch
export function CustomCard({ children }: { children: React.ReactNode }) {
  return <div className="border rounded p-4">{children}</div>;
}
```

## Styling Guidelines

### Using className

Always style using Tailwind CSS classes via `className`:

```typescript
<Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500">
  Gradient Button
</Button>
```

### Responsive Design

Use Tailwind responsive modifiers:

```typescript
<Button className="w-full md:w-auto lg:px-8">
  Responsive Button
</Button>
```

### Dark Mode

shadcn/ui components support dark mode automatically. Use `dark:` modifiers when needed:

```typescript
<Card className="bg-white dark:bg-gray-800">
  <CardContent>Content</CardContent>
</Card>
```

## Component Configuration

Components are configured in `components.json`:

```json
{
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "slate"
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

## Accessibility

shadcn/ui components are built on Radix UI and include:
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ ARIA attributes
- ✅ Screen reader support

Always use components as designed to maintain accessibility.

## Quick Reference

| Need | Use |
|------|-----|
| Button/Link | `Button` with variants |
| Text Input | `Input` |
| Container | `Card` with sub-components |
| Modal | `Dialog` |
| Dropdown | `Select` or `DropdownMenu` |
| Form | `Form` with `FormField` |
| Loading | `Skeleton` |
| Message | `Alert` |
| Status | `Badge` |
| Toggle | `Switch` or `Checkbox` |

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Radix UI Documentation](https://www.radix-ui.com)
- [Component Examples](https://ui.shadcn.com/examples)

---

**Remember**: Never reinvent the wheel. shadcn/ui provides battle-tested, accessible components. Always use them.
