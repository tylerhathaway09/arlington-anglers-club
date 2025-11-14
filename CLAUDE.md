# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Single-page Next.js 16 website for Arlington Anglers Club, a local fishing club. Built with App Router, React 19, Tailwind CSS v4, and Framer Motion. Deployed on Vercel with automatic deployments from GitHub.

## Development Commands

```bash
npm run dev      # Start development server (usually port 3000)
npm run build    # Build production bundle
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

### Monolithic Single-Page Component

The entire application logic lives in **`app/page.tsx`** (344 lines) - a client component (`'use client'`) that handles:

- **Navigation**: Smooth scrolling with `IntersectionObserver` tracking 5 sections: `#about`, `#events`, `#gallery`, `#reviews`, `#reports`
- **Mobile Menu**: AnimatePresence wrapper with expand/collapse animation
- **Lightbox Gallery**: Click-to-open modal with keyboard navigation (Arrow keys, ESC)
- **State Management**: 5 React hooks managing menu, scroll state, active section, lightbox visibility, and selected image

### Component System

Uses **shadcn/ui** pattern with CVA (class-variance-authority):
- `components/ui/button.tsx` - Variant-based button
- `components/ui/card.tsx` - Card with CardContent subcomponent
- `lib/utils.ts` - Single utility: `cn()` (clsx + tailwind-merge)

### Styling

- **Tailwind CSS v4** with PostCSS
- **Brand color**: Maroon `#800000` (primary throughout)
- **Border radius**: `rounded-3xl` everywhere (brand consistency)
- **Font**: Geist (loaded in `layout.tsx`)
- **Theme**: OKLCH color space variables in `globals.css`

## Key Technical Details

### Gallery Implementation

Gallery photos array defined at component top:
```typescript
const galleryPhotos = [
  { src: '/IMG_4784.jpg', alt: 'Arlington Anglers Club Photo 1' },
  // ...
];
```

Images stored in `public/` directory. Thumbnails are square (`aspect-square`) with `object-cover`. Lightbox uses AnimatePresence for smooth transitions.

### Navigation Pattern

- **Fixed header** with 88px offset for scroll anchoring
- **Active state**: Intersection Observer with root margins `-30% 0px -50% 0px`
- **Smooth scroll**: Set via `document.documentElement.style.scrollBehavior = 'smooth'`
- Custom `handleNavClick()` manually calculates scroll position

### State Architecture

No external state management. All state is local:
- `menuOpen` - Mobile menu toggle
- `scrolled` - Header styling trigger
- `activeId` - Current visible section
- `lightboxOpen` - Modal visibility
- `selectedImageIndex` - Gallery navigation

## Content Management

### Adding Gallery Photos
1. Place images in `public/` folder
2. Update `galleryPhotos` array in `app/page.tsx`
3. Format: `{ src: '/filename.jpg', alt: 'Description' }`

### Adding YouTube Video
Replace placeholder in Product Reviews section (lines ~200-210) with iframe embed

### Updating Events
Modify the event card JSX in Events section (lines ~165-177)

## Dependencies

**Critical runtime dependencies:**
- `framer-motion` - All animations (mobile menu, lightbox transitions, image hover)
- `lucide-react` - Icons (Fish, Menu, Mail, Calendar, X, ChevronLeft/Right)
- `class-variance-authority` - Button variants
- `tailwind-merge` + `clsx` - Class composition in `cn()` utility

## Deployment

- **Platform**: Vercel
- **Auto-deploy**: Any push to `main` branch triggers deployment
- **Repository**: https://github.com/tylerhathaway09/arlington-anglers-club

## Important Conventions

- **All content is hardcoded** - No CMS, no API, no database
- **Single client component** - Everything interactive happens browser-side
- **Path alias**: `@/*` maps to repository root
- **TypeScript strict mode** enabled
- **Color consistency**: Always use `#800000` for maroon theme elements
- **Responsive breakpoint**: `md:` prefix for 768px+ (desktop layout)
