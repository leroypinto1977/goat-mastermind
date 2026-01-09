# Vercel Deployment Checklist

Use this checklist to ensure everything is ready for deployment to Vercel.

## Pre-Deployment Checklist

### ✅ Code Preparation
- [ ] All code is committed to Git
- [ ] No `.env` files are committed (checked in `.gitignore`)
- [ ] Build passes locally: `npm run build`
- [ ] Type checking passes: `npm run type-check`
- [ ] Linting passes: `npm run lint`
- [ ] All tests pass (if any)

### ✅ Database Setup
- [ ] PostgreSQL database created (Vercel Postgres or external)
- [ ] Database connection string obtained
- [ ] Database migrations ready to run
- [ ] Initial data seeding script prepared (optional)

### ✅ Environment Variables
- [ ] `DATABASE_URL` - Database connection string
- [ ] `NEXTAUTH_URL` - Your production URL (e.g., `https://your-app.vercel.app`)
- [ ] `AUTH_SECRET` or `NEXTAUTH_SECRET` - Generated secure secret
- [ ] All required variables documented in `.env.example`

### ✅ Configuration Files
- [ ] `vercel.json` configured correctly
- [ ] `next.config.ts` optimized for production
- [ ] `package.json` has correct build scripts
- [ ] `prisma/schema.prisma` is up to date

### ✅ Security
- [ ] No sensitive data in code
- [ ] API routes are protected with authentication
- [ ] CORS headers configured appropriately
- [ ] Environment variables stored securely in Vercel

## Deployment Steps

### 1. Vercel Project Setup
- [ ] Create Vercel account (if not exists)
- [ ] Create new project in Vercel dashboard
- [ ] Connect Git repository (GitHub/GitLab/Bitbucket)

### 2. Database Configuration
- [ ] Create Vercel Postgres database (or configure external DB)
- [ ] Copy database connection string
- [ ] Add `DATABASE_URL` to Vercel environment variables

### 3. Environment Variables in Vercel
- [ ] Go to Project Settings → Environment Variables
- [ ] Add `DATABASE_URL` (Production, Preview, Development)
- [ ] Add `NEXTAUTH_URL` (Production: `https://your-app.vercel.app`)
- [ ] Add `AUTH_SECRET` or `NEXTAUTH_SECRET` (generated with `openssl rand -base64 32`)
- [ ] Add any optional variables (Sanity, etc.)

### 4. Deploy
- [ ] Trigger deployment (push to main branch or manual deploy)
- [ ] Wait for build to complete
- [ ] Check build logs for errors

### 5. Post-Deployment
- [ ] Run database migrations: `npx prisma migrate deploy`
- [ ] Seed initial data (admin user, services): `npm run seed-services && npm run reset-admin`
- [ ] Verify deployment URL is accessible
- [ ] Test authentication (login/logout)
- [ ] Test quote generation and PDF download
- [ ] Test admin panel functionality
- [ ] Verify all API routes work correctly

## Post-Deployment Verification

### ✅ Functionality Tests
- [ ] Home page loads correctly
- [ ] Authentication works (login/logout)
- [ ] User registration works (if applicable)
- [ ] Quote request form works
- [ ] PDF generation works
- [ ] Admin panel accessible and functional
- [ ] Services can be managed in admin panel
- [ ] Staff can be managed in admin panel
- [ ] Quotes display correctly in admin panel

### ✅ Performance Checks
- [ ] Page load times are acceptable
- [ ] Images load correctly
- [ ] No console errors in browser
- [ ] API response times are reasonable
- [ ] Serverless functions execute within timeout

### ✅ Security Checks
- [ ] HTTPS is enforced
- [ ] Environment variables are not exposed
- [ ] Admin routes are protected
- [ ] API routes require authentication where needed
- [ ] No sensitive data in client-side code

## Monitoring Setup

### ✅ Vercel Dashboard
- [ ] Monitor deployment status
- [ ] Check function logs regularly
- [ ] Monitor error rates
- [ ] Track performance metrics

### ✅ Database Monitoring
- [ ] Monitor database connections
- [ ] Check query performance
- [ ] Monitor database size
- [ ] Set up alerts for errors

## Rollback Plan

If something goes wrong:
- [ ] Know how to rollback to previous deployment (Vercel dashboard)
- [ ] Have backup of database migrations
- [ ] Document any manual fixes needed

## Common Issues & Solutions

### Build Fails
- Check build logs in Vercel dashboard
- Verify all dependencies are in `package.json`
- Ensure `prisma generate` runs in build command

### Database Connection Errors
- Verify `DATABASE_URL` is correct
- Check database is accessible
- Ensure migrations are run

### Environment Variables Not Working
- Verify variables are set for correct environment
- Redeploy after adding variables
- Check variable names are exact (case-sensitive)

### Authentication Issues
- Verify `AUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches deployment URL
- Clear browser cookies

## Notes

- Keep this checklist updated as deployment process evolves
- Document any custom deployment steps
- Note any manual interventions required
