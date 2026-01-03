# Quick Start - View Your Website

## Preview Link

Once the development server is running, open:

**http://localhost:3000**

## If the server isn't running:

1. **Create `.env` file** (if it doesn't exist):
   ```bash
   # Copy this content to a new file named .env
   DATABASE_URL="file:./dev.db"
   ADMIN_PASSWORD="admin123"
   BOOK_NOW_URL="https://booking.example.com"
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and go to:
   ```
   http://localhost:3000
   ```

## Admin Panel

Access the admin CMS at:
**http://localhost:3000/admin**

Password: `admin123` (or whatever you set in `.env`)

## Troubleshooting

- **Port 3000 already in use?** Next.js will automatically use the next available port (3001, 3002, etc.)
- **Database errors?** Run `npx prisma db push` and `npm run db:seed`
- **Images not showing?** Add placeholder images to `public/images/` folder

## Pages Available

- `/` - Homepage
- `/stay` - Stay page
- `/experience` - Experience page
- `/gallery` - Gallery page
- `/location` - Location page
- `/faqs` - FAQs page
- `/contact` - Contact page
- `/admin` - Admin CMS
