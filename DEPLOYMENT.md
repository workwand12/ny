# Deployment Guide

This guide explains how to deploy the náttúra YÚRTEL website to various hosting platforms.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git repository set up

## Build the Project

Before deploying, build the production version:

```bash
npm install
npm run build
```

This creates an optimized `dist/` folder ready for deployment.

## Environment Variables

Before deploying, set up environment variables. Copy `.env.example` to `.env.production` and fill in the values:

```bash
cp .env.example .env.production
```

Key environment variables:
- `VITE_API_URL` - Your API endpoint
- `VITE_PAYMENT_PROVIDER` - Payment provider (stripe, paypal, square, or none)
- `VITE_PAYMENT_PUBLIC_KEY` - Payment provider public key
- `VITE_PAYMENT_ENABLED` - Enable/disable payment features

## Hosting Options

### Vercel (Recommended)

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Deploy via Dashboard**:
   - Go to [vercel.com](https://vercel.com)
   - Import your Git repository
   - Vercel auto-detects Vite projects
   - Add environment variables in project settings
   - Deploy!

3. **Deploy via CLI**:
   ```bash
   vercel
   ```

**Vercel automatically:**
- Detects Vite build command (`npm run build`)
- Sets output directory to `dist`
- Configures routing for SPAs

### Netlify

1. **Deploy via Dashboard**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop your `dist/` folder, OR
   - Connect your Git repository

2. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Add environment variables in Site settings → Environment variables

3. **Deploy via CLI**:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

### GitHub Pages

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://yourusername.github.io/your-repo-name"
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

### AWS S3 + CloudFront

1. **Build and upload**:
   ```bash
   npm run build
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```

2. **Configure CloudFront**:
   - Set origin to your S3 bucket
   - Set default root object to `index.html`
   - Configure error pages: 404 → `/index.html` (for SPA routing)

### Traditional Web Hosting (cPanel, etc.)

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Upload contents of `dist/` folder** to your web server's `public_html` or `www` directory

3. **Configure `.htaccess`** (Apache) for SPA routing:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

## Environment Variables Setup

For each hosting platform, set environment variables:

### Vercel
- Dashboard → Project → Settings → Environment Variables

### Netlify
- Site settings → Build & deploy → Environment variables

### GitHub Pages
- Use GitHub Secrets (for build process) or hardcode in build step

## Payment Integration

To enable payment processing:

1. **Choose a provider** (Stripe, PayPal, Square)
2. **Get API keys** from your payment provider
3. **Set environment variables**:
   ```
   VITE_PAYMENT_ENABLED=true
   VITE_PAYMENT_PROVIDER=stripe
   VITE_PAYMENT_PUBLIC_KEY=pk_live_...
   VITE_PAYMENT_ENVIRONMENT=production
   ```
4. **Install payment SDK** in the codebase (see `src/services/payment.ts`)

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test on mobile devices
- [ ] Check environment variables are set
- [ ] Test payment integration (if enabled)
- [ ] Verify analytics tracking (if enabled)
- [ ] Set up custom domain (if applicable)
- [ ] Configure SSL/HTTPS
- [ ] Test error handling and error boundaries

## Troubleshooting

### Build fails
- Check Node.js version (requires 18+)
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run build`

### 404 errors on routes
- Ensure SPA routing is configured (`.htaccess` for Apache, or hosting-specific config)
- Verify `index.html` is served for all routes

### Environment variables not working
- Verify variables start with `VITE_` prefix
- Rebuild after changing environment variables
- Check hosting platform documentation for variable format

### Payment not working
- Verify `VITE_PAYMENT_ENABLED=true`
- Check payment provider keys are correct
- Review browser console for errors
- See `src/services/payment.ts` for integration details

## Support

For deployment issues, check:
- Hosting platform documentation
- Browser console for errors
- Application logs (see `src/utils/logger.ts`)

