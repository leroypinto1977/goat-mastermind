# Vercel Deployment Guide for GOAT Mastermind

This guide will help you deploy the GOAT Mastermind application to Vercel.

## Prerequisites

1. ✅ A Vercel account ([sign up here](https://vercel.com/signup))
2. ✅ A PostgreSQL database (recommended: [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres))
3. ✅ Git repository (GitHub, GitLab, or Bitbucket)

## Quick Start

### 1. Set Up Database (Vercel Postgres - Recommended)

1. Go to your Vercel project dashboard
2. Navigate to the **Storage** tab
3. Click **Create Database** → Select **Postgres**
4. Choose a name for your database
5. Copy the connection string (it will be automatically added as `DATABASE_URL`)

**Note:** Vercel Postgres provides automatic connection pooling, which is perfect for serverless environments.

### 2. Run Database Migrations

After setting up the database, you need to run Prisma migrations:

```bash
# Set your DATABASE_URL first
export DATABASE_URL="your-vercel-postgres-connection-string"

# Run migrations
npx prisma migrate deploy
```

Or use Vercel's build command which runs migrations automatically if you set it up.

### 3. Set Environment Variables in Vercel

Go to your Vercel project → **Settings** → **Environment Variables** and add:

#### Required Variables

```bash
# Database (automatically set if using Vercel Postgres)
DATABASE_URL=postgresql://user:password@host:port/database?schema=public

# NextAuth Configuration
NEXTAUTH_URL=https://your-app.vercel.app  # Change to your actual URL
AUTH_SECRET=your-generated-secret-here    # Generate with: openssl rand -base64 32

# Alternative (if using NEXTAUTH_SECRET instead)
# NEXTAUTH_SECRET=your-generated-secret-here

# Trust Host (NextAuth.js v5 security feature)
# For development: Can be set to true or left unset (code handles it)
# For production: Vercel handles this automatically, but can also set:
# AUTH_TRUST_HOST=true
```

#### Generate AUTH_SECRET

```bash
openssl rand -base64 32
```

Or visit: https://generate-secret.vercel.app/32

#### Optional Variables (for Sanity CMS)

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token
```

**Important:** Set these for all environments:
- ✅ Production
- ✅ Preview (optional, for pull requests)
- ✅ Development (optional, for local preview)

### 4. Deploy to Vercel

#### Method 1: GitHub Integration (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click **Add New Project**
4. Import your repository
5. Vercel will auto-detect Next.js configuration
6. Review and deploy

#### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (preview)
vercel

# Deploy to production
vercel --prod
```

### 5. Post-Deployment Steps

1. **Run Database Migrations:**
   ```bash
   npx prisma migrate deploy
   ```

2. **Seed Initial Data (Optional):**
   ```bash
   # Seed admin user and services
   npm run seed-services
   npm run reset-admin
   ```

3. **Verify Environment Variables:**
   - Check that `NEXTAUTH_URL` matches your deployment URL
   - Verify `DATABASE_URL` is correctly set
   - Ensure `AUTH_SECRET` is set

4. **Test the Application:**
   - Visit your deployment URL
   - Try logging in with admin credentials
   - Test quote generation and PDF download

## Build Configuration

The project is already configured with:

- ✅ `vercel.json` with proper build commands
- ✅ Prisma client generation in `postinstall` script
- ✅ Serverless function timeout configured (30s)
- ✅ CORS headers for API routes
- ✅ Next.js configuration optimized for Vercel

## Troubleshooting

### Build Fails: "Prisma Client not generated"

**Solution:** The `postinstall` script should handle this, but if it fails:
1. Ensure `prisma generate` runs in the build command
2. Check that `@prisma/client` is in dependencies

### Database Connection Errors

**Solution:**
1. Verify `DATABASE_URL` is correctly set in Vercel
2. Check database is accessible (not blocked by firewall)
3. For Vercel Postgres, ensure you're using the correct connection string
4. Check database exists and migrations are run

### PDF Generation Fails

**Solution:** PDF generation uses `pdf-lib` which works in serverless environments. If issues occur:
1. Check function timeout (set to 30s in vercel.json)
2. Verify no file system operations are being used
3. Check serverless function logs in Vercel dashboard

### Authentication Issues

**Solution:**
1. Verify `AUTH_SECRET` or `NEXTAUTH_SECRET` is set
2. Check `NEXTAUTH_URL` matches your deployment URL exactly
3. Clear browser cookies and try again
4. Check Vercel function logs for auth errors

### Environment Variables Not Working

**Solution:**
1. Ensure variables are set for the correct environment (Production/Preview/Development)
2. Redeploy after adding new environment variables
3. Check variable names match exactly (case-sensitive)
4. Verify no typos in variable names

## Monitoring & Logs

- **Function Logs:** Vercel Dashboard → Your Project → Functions tab
- **Build Logs:** Vercel Dashboard → Your Project → Deployments → Click on deployment
- **Real-time Logs:** Use Vercel CLI: `vercel logs`

## Database Migrations in Production

For production migrations, you can:

1. **Use Vercel's Build Command:**
   Add to `package.json` scripts:
   ```json
   "vercel-build": "prisma generate && prisma migrate deploy && next build"
   ```

2. **Manual Migration:**
   ```bash
   DATABASE_URL="your-production-url" npx prisma migrate deploy
   ```

3. **Use Vercel Postgres Dashboard:**
   Connect via Vercel dashboard and run migrations through the SQL editor

## Performance Optimization

- ✅ Serverless functions configured with 30s timeout
- ✅ Prisma client properly configured for serverless
- ✅ Images optimized with Next.js Image component
- ✅ Static assets served from CDN (automatic in Vercel)

## Security Checklist

- ✅ Environment variables stored securely in Vercel
- ✅ `.env` files excluded from Git (in `.gitignore`)
- ✅ Database credentials never exposed
- ✅ Auth secrets properly generated and stored
- ✅ API routes protected with authentication
- ✅ CORS headers configured appropriately

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review function logs for errors
3. Verify all environment variables are set
4. Check database connectivity
5. Review Next.js and Prisma documentation

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma with Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
- [NextAuth.js Deployment](https://next-auth.js.org/deployment)

