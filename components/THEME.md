# Theme System Documentation

## Overview
This app uses `next-themes` for dark mode management with shadcn/ui components.

## Features
- **Default Theme**: Dark mode (can be changed to light or system)
- **Theme Toggle**: Available in the header (top-right corner)
- **Options**: Light, Dark, and System (follows OS preference)

## Components

### ThemeProvider
- Location: `components/theme-provider.tsx`
- Wraps the entire app in `layout.tsx`
- Configuration:
  - `attribute="class"` - Uses class-based dark mode
  - `defaultTheme="dark"` - Starts in dark mode
  - `enableSystem` - Allows system preference detection
  - `disableTransitionOnChange` - Prevents flash on theme change

### ThemeToggle
- Location: `components/theme-toggle.tsx`
- Dropdown menu with Sun/Moon icons
- Three options: Light, Dark, System
- Uses shadcn/ui Button and DropdownMenu components

## Usage in Components

All components automatically support dark mode through Tailwind CSS theme colors:

```tsx
// Use theme-aware colors
<div className="bg-background text-foreground">
  <h1 className="text-primary">Title</h1>
  <p className="text-muted-foreground">Description</p>
</div>
```

## Theme Colors
Defined in `app/globals.css`:
- `background` / `foreground` - Main background and text
- `primary` / `primary-foreground` - Primary actions
- `secondary` / `secondary-foreground` - Secondary elements
- `muted` / `muted-foreground` - Muted/disabled states
- `accent` / `accent-foreground` - Accent highlights
- `card` / `card-foreground` - Card backgrounds
- `border` - Border colors
- `input` - Input borders
- `ring` - Focus rings

All colors automatically switch between light and dark variants.
