# Deploy to Vercel with Custom Domain

## Step 1: Create GitHub Repository

### Option A: Using GitHub Web Interface
1. Go to [github.com](https://github.com) and sign in
2. Click the "+" icon in the top right → "New repository"
3. Name it: `nattura-yurtel` (or your preferred name)
4. Make it **Public** (for free Vercel) or **Private** (for paid plan)
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### Option B: Using GitHub CLI (if installed)
```bash
gh repo create nattura-yurtel --public --source=. --remote=origin --push
```

## Step 2: Push to GitHub

After creating the repository, GitHub will show you commands. Run:

```bash
# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/nattura-yurtel.git

# Or if using SSH:
# git remote add origin git@github.com:YOUR_USERNAME/nattura-yurtel.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### Method 1: Via Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com) and sign in (use GitHub to connect)
2. Click "Add New..." → "Project"
3. Import your GitHub repository (`nattura-yurtel`)
4. Configure the project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
5. **Environment Variables**: Add these:
   ```
   DATABASE_URL=file:./dev.db
   ADMIN_PASSWORD=your-secure-password-here
   BOOK_NOW_URL=https://your-booking-url.com
   ```
6. Click "Deploy"

### Method 2: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel

# For production deployment
vercel --prod
```

## Step 4: Set Up Custom Domain (NY.com)

**Important**: You need to own the domain `NY.com` first.

1. In Vercel Dashboard:
   - Go to your project → "Settings" → "Domains"
   - Click "Add Domain"
   - Enter: `NY.com` and `www.NY.com`
   - Follow DNS configuration instructions

2. Configure DNS records:
   - Add an A record pointing to Vercel's IP (Vercel will provide this)
   - Or add a CNAME record pointing to `cname.vercel-dns.com`
   - For `www.NY.com`, add CNAME pointing to `NY.com`

3. SSL will be automatically provisioned by Vercel

## Step 5: Database Setup (Important!)

**For Production**, SQLite won't work well. You need a proper database:

### Option A: Use Vercel Postgres (Recommended)
1. In Vercel Dashboard → Your Project → "Storage"
2. Create a new Postgres database
3. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
4. Update environment variable `DATABASE_URL` in Vercel
5. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```

### Option B: Use External Database (PlanetScale, Supabase, etc.)
1. Create database account
2. Get connection string
3. Update `DATABASE_URL` in Vercel environment variables
4. Update Prisma schema to use your database type

## Step 6: Environment Variables Checklist

Make sure these are set in Vercel:

```
DATABASE_URL=<your-production-database-url>
ADMIN_PASSWORD=<secure-password>
BOOK_NOW_URL=<your-booking-platform-url>
NODE_ENV=production
```

## Post-Deployment

1. **Seed the database** (run once):
   ```bash
   # Connect to your production database
   DATABASE_URL=<production-url> npm run db:seed
   ```

2. **Access admin panel**:
   - Go to `https://NY.com/admin`
   - Login with your `ADMIN_PASSWORD`

3. **Update content**:
   - Use the admin panel to customize content
   - Add images via the gallery API or admin interface

## Troubleshooting

- **Build fails?** Check build logs in Vercel dashboard
- **Database errors?** Ensure `DATABASE_URL` is set correctly
- **Domain not working?** Wait 24-48 hours for DNS propagation
- **Images not loading?** Ensure images are committed to repository or use external hosting

## Quick Commands Reference

```bash
# Initialize and push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main

# Deploy to Vercel via CLI
vercel
vercel --prod

# Update database schema
npx prisma db push
npx prisma migrate deploy  # For migrations
```


