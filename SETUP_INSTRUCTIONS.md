# Quick Setup Instructions

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Environment

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` and set:
- `ADMIN_PASSWORD` - Your admin panel password
- `BOOK_NOW_URL` - Your booking platform URL

## Step 3: Initialize Database

```bash
# Create database and tables
npx prisma db push

# Seed with initial content
npm run db:seed
```

## Step 4: Add Images

Place images in `public/images/`:
- `hero.jpg` (recommended: 1920x1080px)
- `story.jpg`
- `gallery-1.jpg`, `gallery-2.jpg`, etc.

You can use placeholder images for testing.

## Step 5: Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## Step 6: Access Admin Panel

1. Go to http://localhost:3000/admin
2. Enter the password from `.env`
3. Edit content as needed

## Next Steps

- Customize content in the admin panel
- Replace placeholder images
- Update colors/fonts in `tailwind.config.ts` if needed
- Deploy to Vercel (see README.md)

## Troubleshooting

**Database errors?**
```bash
npx prisma db push
npm run db:seed
```

**Images not showing?**
- Check file names match references in components
- Ensure images are in `public/images/`
- Clear browser cache

**Admin not working?**
- Check `ADMIN_PASSWORD` in `.env`
- Clear browser localStorage
- Restart dev server


