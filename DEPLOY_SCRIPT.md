# Quick Deployment Guide - GitHub + Vercel + NY.com

## Current Status
✅ Git repository initialized
✅ Initial commit created
✅ Project ready to push

## Step 1: Create GitHub Repository

### Option A: Using GitHub Website (Recommended)
1. Go to https://github.com/new
2. Repository name: `nattura-yurtel` (or any name you prefer)
3. Description: "Premium website for Náttúra YÚRTEL"
4. Choose **Public** (free Vercel) or **Private**
5. **DO NOT** check "Initialize with README" (we already have files)
6. Click **"Create repository"**

### Option B: Using GitHub CLI (if installed)
Run this command:
```bash
gh repo create nattura-yurtel --public --source=. --remote=origin --push
```

## Step 2: Push Code to GitHub

After creating the repository on GitHub, run these commands:

```bash
# Add the remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/nattura-yurtel.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 3: Deploy to Vercel

### Method 1: Vercel Dashboard (Easiest)

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click **"Add New..."** → **"Project"**
4. Import your repository: `nattura-yurtel`
5. Configure:
   - Framework: **Next.js** (auto-detected)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
6. **Add Environment Variables:**
   ```
   DATABASE_URL=file:./dev.db
   ADMIN_PASSWORD=your-secure-password
   BOOK_NOW_URL=https://your-booking-url.com
   ```
7. Click **"Deploy"**

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Step 4: Connect Custom Domain (NY.com)

⚠️ **Important**: You must own the domain `NY.com` first!

1. In Vercel Dashboard:
   - Go to your project → **Settings** → **Domains**
   - Click **"Add Domain"**
   - Enter: `NY.com`
   - Also add: `www.NY.com`

2. Configure DNS Records:
   - **Option A (A Record):**
     - Type: A
     - Name: @
     - Value: `76.76.21.21` (Vercel's IP - verify in dashboard)
   
   - **Option B (CNAME - Recommended):**
     - Type: CNAME
     - Name: @
     - Value: `cname.vercel-dns.com`
   
   - For `www.NY.com`:
     - Type: CNAME
     - Name: www
     - Value: `NY.com`

3. **SSL Certificate:**
   - Vercel automatically provisions SSL certificates
   - Wait a few minutes after DNS propagation

## Step 5: Production Database Setup

**⚠️ CRITICAL**: SQLite won't work in production! You need a real database.

### Recommended: Vercel Postgres

1. In Vercel Dashboard → Your Project → **"Storage"** tab
2. Click **"Create Database"** → Choose **Postgres**
3. After creation, copy the connection string
4. Update environment variable `DATABASE_URL` in Vercel
5. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
6. Push changes and run migrations:
   ```bash
   git push
   # Then in Vercel, add build command: npx prisma generate && npm run build
   ```

### Alternative Databases:
- **PlanetScale** (MySQL) - Great for serverless
- **Supabase** (PostgreSQL) - Free tier available
- **Railway** - Easy PostgreSQL setup

## Step 6: Environment Variables Checklist

Set these in Vercel Dashboard → Settings → Environment Variables:

```
DATABASE_URL=<your-production-database-url>
ADMIN_PASSWORD=<secure-password-change-this>
BOOK_NOW_URL=<your-actual-booking-platform-url>
NODE_ENV=production
```

## Step 7: Seed Production Database

After deployment, run seed script once:

```bash
# Set production DATABASE_URL
export DATABASE_URL="<your-production-database-url>"

# Run seed
npm run db:seed
```

Or use Vercel's built-in terminal or connect via SSH.

## After Deployment

1. **Test the site**: Visit `https://NY.com`
2. **Test admin panel**: Visit `https://NY.com/admin`
3. **Update content**: Login and customize via admin panel
4. **Add images**: Upload to `/public/images/` or use a CDN

## Troubleshooting

- **Build fails?** Check build logs in Vercel dashboard
- **Domain not working?** Wait 24-48h for DNS, check DNS records
- **Database errors?** Verify `DATABASE_URL` is correct
- **Admin not working?** Check `ADMIN_PASSWORD` is set correctly

## Quick Commands Reference

```bash
# Check current git status
git status

# Add GitHub remote (replace with your username/repo)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git push -u origin main

# Deploy to Vercel
vercel
vercel --prod

# Check deployment status
vercel ls
```


