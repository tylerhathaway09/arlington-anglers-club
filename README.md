# Arlington Anglers Club

A modern, responsive website for the Arlington Anglers Club - a local fishing club founded by a 6th grader in Arlington, Massachusetts.

## Features

- **Interactive Photo Gallery**: Lightbox experience with keyboard navigation (arrow keys & ESC)
- **Responsive Design**: Mobile-first design with smooth animations
- **Sections**:
  - About Us - Club mission and values
  - Events - Upcoming fishing events
  - Photo Gallery - Club photos with lightbox viewer
  - Product Reviews - YouTube video section (placeholder ready)
  - Fishing Reports - Latest catch reports
- **Smooth Navigation**: Fixed header with section highlighting
- **Maroon Theme**: Custom color scheme matching club branding

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: Custom components with shadcn/ui
- **Deployment**: Vercel

## Getting Started

### Development Server

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Project Structure

```
app/
  page.tsx          # Main homepage with all sections
public/
  IMG_*.jpg         # Gallery photos
components/
  ui/               # Reusable UI components
```

## Deployment

The site is deployed on Vercel with automatic deployments from the GitHub repository.

**GitHub**: [arlington-anglers-club](https://github.com/tylerhathaway09/arlington-anglers-club)

Any push to the `main` branch automatically deploys to production.

## Adding Content

### Adding Photos to Gallery
1. Add images to the `public/` folder
2. Update the `galleryPhotos` array in `app/page.tsx`
3. Images will automatically appear in the lightbox gallery

### Adding a YouTube Video
Replace the placeholder in the Product Reviews section with:
```jsx
<iframe
  width="100%"
  height="100%"
  src="https://www.youtube.com/embed/VIDEO_ID"
  className="rounded-3xl"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
/>
```

### Updating Events
Modify the events section in `app/page.tsx` to add or change upcoming events.

## License

All rights reserved - Arlington Anglers Club
