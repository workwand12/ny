# Complete Project File Structure

```
nattura-yurtel/
├── app/
│   ├── admin/
│   │   └── page.tsx                    # Admin CMS login & dashboard
│   ├── api/
│   │   ├── admin/
│   │   │   ├── auth/
│   │   │   │   └── route.ts           # Admin authentication
│   │   │   └── content/
│   │   │       └── route.ts           # Get all content for admin
│   │   ├── contact/
│   │   │   └── route.ts               # Contact form submission
│   │   ├── content/
│   │   │   └── [key]/
│   │   │       └── route.ts           # Get/update content
│   │   └── gallery/
│   │       └── route.ts               # Gallery images CRUD
│   ├── contact/
│   │   └── page.tsx                   # Contact page
│   ├── experience/
│   │   └── page.tsx                   # Experience page
│   ├── faqs/
│   │   └── page.tsx                   # FAQs page
│   ├── gallery/
│   │   └── page.tsx                   # Gallery page
│   ├── location/
│   │   └── page.tsx                   # Location page
│   ├── stay/
│   │   └── page.tsx                   # Stay page
│   ├── globals.css                    # Global styles
│   ├── layout.tsx                     # Root layout
│   └── page.tsx                       # Homepage
├── components/
│   ├── sections/
│   │   ├── Amenities.tsx              # Amenities section
│   │   ├── Experience.tsx             # Experience preview
│   │   ├── GalleryPreview.tsx         # Gallery preview
│   │   ├── Hero.tsx                   # Hero section
│   │   ├── LocationPreview.tsx        # Location preview
│   │   └── Story.tsx                  # Story section
│   ├── BookingButton.tsx              # Persistent booking button
│   ├── BookingPanel.tsx               # Booking modal/drawer
│   └── Navigation.tsx                 # Site navigation
├── hooks/
│   └── useBookingPanel.tsx            # Booking panel context
├── lib/
│   ├── content.ts                     # Content management helpers
│   └── prisma.ts                      # Prisma client singleton
├── prisma/
│   ├── schema.prisma                  # Database schema
│   └── seed.ts                        # Database seed script
├── public/
│   └── images/                        # Image assets
│       ├── hero.jpg
│       ├── story.jpg
│       ├── gallery-*.jpg
│       └── ...
├── .env.example                       # Environment variables template
├── .gitignore
├── next.config.js                     # Next.js configuration
├── package.json
├── postcss.config.js
├── README.md                          # Setup & usage guide
├── tailwind.config.ts                 # Tailwind configuration
└── tsconfig.json                      # TypeScript configuration
```

## Key Files

### Core Application
- `app/layout.tsx` - Root layout with navigation and booking components
- `app/page.tsx` - Homepage with all sections
- `app/globals.css` - Global styles and Tailwind setup

### Components
- `components/Navigation.tsx` - Top navigation with scroll effects
- `components/BookingButton.tsx` - Persistent booking CTA
- `components/BookingPanel.tsx` - Booking modal with tabs
- `components/sections/*.tsx` - Reusable page sections

### API Routes
- `app/api/content/[key]/route.ts` - Content CRUD
- `app/api/contact/route.ts` - Contact form handler
- `app/api/admin/*` - Admin authentication and content management

### Database
- `prisma/schema.prisma` - Database models
- `lib/prisma.ts` - Prisma client
- `lib/content.ts` - Content helpers

### Configuration
- `tailwind.config.ts` - Design system (colors, fonts, spacing)
- `next.config.js` - Next.js settings
- `.env.example` - Environment variables template

