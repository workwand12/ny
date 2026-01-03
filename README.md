# Náttúra YÚRTEL Website

A premium, "quiet luxury" website for Náttúra YÚRTEL built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Premium Design**: Editorial layouts, cinematic imagery, warm Icelandic wilderness vibe
- **CMS**: Simple admin panel for content management
- **Booking System**: Persistent booking button with availability checker and contact forms
- **Fast & Accessible**: Optimized for performance and accessibility
- **Mobile-First**: Responsive design that works beautifully on all devices

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Prisma** + **SQLite**
- **Framer Motion**
- **Radix UI**

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` and set:
- `DATABASE_URL` - SQLite database path (default: `file:./dev.db`)
- `ADMIN_PASSWORD` - Password for admin panel access
- `BOOK_NOW_URL` - External booking URL

### 3. Set Up Database

```bash
# Push Prisma schema to database
npx prisma db push

# Seed the database with initial content
npm run db:seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Adding Images

Place images in the `public/images/` folder:

- `hero.jpg` - Homepage hero image
- `story.jpg` - Story section image
- `gallery-1.jpg`, `gallery-2.jpg`, etc. - Gallery images
- Other images as needed

Update image references in components as needed.

## Changing the Booking Link

1. **Via Environment Variable**: Set `BOOK_NOW_URL` in `.env`
2. **Via Admin Panel**: Log in at `/admin` and edit the `book_now_url` content field
3. **Via API**: POST to `/api/content/book_now_url` with `{ "value": "your-url" }`

## Admin CMS

Access the admin panel at `/admin`

Default password is set in `.env` (`ADMIN_PASSWORD`).

The admin allows you to:
- Update hero titles and subtitles
- Edit section content
- Update booking URLs
- Manage gallery images (coming soon)

## Deployment to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add environment variables:
   - `DATABASE_URL`
   - `ADMIN_PASSWORD`
   - `BOOK_NOW_URL`
4. Deploy!

**Note**: For production, consider using a persistent database (PostgreSQL, MySQL) instead of SQLite.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin CMS pages
│   ├── api/               # API routes
│   └── [pages]/           # Public pages
├── components/            # React components
│   └── sections/          # Page sections
├── lib/                   # Utilities
│   ├── prisma.ts         # Prisma client
│   └── content.ts        # Content management
├── prisma/               # Database schema
│   ├── schema.prisma
│   └── seed.ts
└── public/               # Static assets
    └── images/           # Image files
```

## Key Features Explained

### Booking Button

- **Desktop**: Fixed bottom-right pill button
- **Mobile**: Sticky bottom bar
- Opens modal with three tabs:
  1. Book Now - External link
  2. Check Availability - Date form
  3. Contact - Enquiry form

### Navigation

- Transparent over hero
- Becomes solid on scroll
- Mobile hamburger menu
- Smooth transitions

### Design System

- **Colors**: Off-white, charcoal, slate, moss/forest accents
- **Typography**: Serif headlines, sans-serif body
- **Spacing**: Generous whitespace
- **Borders**: 2xl rounded corners
- **Shadows**: Soft, subtle

## Performance

- Server-side rendering where possible
- Image optimization with Next.js Image
- Code splitting
- Minimal JavaScript

## Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus states
- Reduced motion support

## Development

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Database studio (GUI)
npm run db:studio
```

## License

All rights reserved - Náttúra YÚRTEL
