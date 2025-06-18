# Deployment Guide

This document outlines the comprehensive deployment process for the Hanif Habib & Cco. website across various environments and platforms.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Preparation](#environment-preparation)
- [Building for Production](#building-for-production)
- [Deployment Options](#deployment-options)
  - [Netlify Deployment](#netlify-deployment)
  - [Vercel Deployment](#vercel-deployment)
  - [GitHub Pages Deployment](#github-pages-deployment)
  - [Traditional Web Hosting](#traditional-web-hosting)
- [Environment Variables](#environment-variables)
- [Post-Deployment Verification](#post-deployment-verification)
- [Continuous Deployment](#continuous-deployment)
- [Rollback Procedures](#rollback-procedures)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying the Hanif Habib & Cco. website, ensure you have the following:

- **Node.js**: Version 16.0.0 or higher
- **npm** or **yarn**: Latest stable version
- **Git**: For version control and deployment to certain platforms
- **Access credentials**: For the hosting platform of your choice
- **Build artifacts**: Generated using the build process

## Environment Preparation

1. **Clone the repository** (if deploying from a fresh environment):

```bash
git clone [repository-url]
cd [repository-name]
```

2. **Install dependencies**:

```bash
# Using npm
npm install

# Using yarn
yarn
```

3. **Verify the application** runs correctly in development mode:

```bash
# Using npm
npm run dev

# Using yarn
yarn dev
```

## Building for Production

Before deploying, create an optimized production build:

```bash
# Using npm
npm run build

# Using yarn
yarn build
```

This process:
- Compiles and bundles all React components
- Optimizes and minifies JavaScript
- Processes and minifies CSS
- Optimizes images and other assets
- Creates static HTML files
- Places all production-ready files in the `dist` directory

## Deployment Options

### Netlify Deployment

[Netlify](https://www.netlify.com/) offers a straightforward deployment process with excellent integration for React applications.

#### Option 1: Netlify UI Deployment

1. **Sign in** to your Netlify account
2. Click **"New site from Git"**
3. Connect to your Git provider (GitHub, GitLab, or Bitbucket)
4. Select your repository
5. Configure build settings:
   - **Build command**: `npm run build` or `yarn build`
   - **Publish directory**: `dist`
6. Click **"Deploy site"**

#### Option 2: Netlify CLI Deployment

1. **Install** the Netlify CLI:

```bash
npm install -g netlify-cli
```

2. **Authenticate** with Netlify:

```bash
netlify login
```

3. **Initialize** and deploy:

```bash
# Initialize your project
netlify init

# Deploy to production
netlify deploy --prod
```

4. **Configure** continuous deployment (optional):

```bash
netlify sites:create --name hanif-habib-website
netlify link
netlify build
```

#### Netlify Configuration File

Create a `netlify.toml` file in the project root for advanced configuration:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[context.production]
  environment = { NODE_VERSION = "16" }

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Vercel Deployment

[Vercel](https://vercel.com/) is optimized for React applications and provides an excellent developer experience.

#### Option 1: Vercel UI Deployment

1. **Sign in** to your Vercel account
2. Click **"New Project"**
3. Import your repository from GitHub, GitLab, or Bitbucket
4. Configure project settings:
   - Vercel will automatically detect Vite/React configuration
   - Customize build settings if needed
5. Click **"Deploy"**

#### Option 2: Vercel CLI Deployment

1. **Install** the Vercel CLI:

```bash
npm install -g vercel
```

2. **Authenticate** with Vercel:

```bash
vercel login
```

3. **Deploy** the application:

```bash
# For development preview
vercel

# For production deployment
vercel --prod
```

#### Vercel Configuration File

Create a `vercel.json` file in the project root:

```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "buildCommand": "npm run build",
        "outputDirectory": "dist"
      }
    }
  ],
  "routes": [
    { "handle": "filesystem" },
    { "src": "/.*", "dest": "/index.html" }
  ]
}
```

### GitHub Pages Deployment

For hosting on [GitHub Pages](https://pages.github.com/), additional configuration is needed.

1. **Update `vite.config.js`** for GitHub Pages:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/repository-name/', // Replace with your repository name if deploying to GitHub Pages
});
```

2. **Install** the gh-pages package:

```bash
npm install --save-dev gh-pages
```

3. **Add** deployment scripts to `package.json`:

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

4. **Deploy** to GitHub Pages:

```bash
npm run deploy
```

5. **Configure** your GitHub repository:
   - Go to repository Settings > Pages
   - Set source to "gh-pages" branch

### Traditional Web Hosting

For traditional web hosting services (cPanel, FTP, etc.):

1. **Build** the project:

```bash
npm run build
```

2. **Transfer** files via FTP:
   - Use an FTP client (FileZilla, Cyberduck, etc.)
   - Connect to your hosting server
   - Upload the contents of the `dist` directory to your web server's public directory (often `public_html` or `www`)

3. **Configure** server for SPAs:
   - For Apache, create a `.htaccess` file in the root directory:

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

   - For Nginx, update your server configuration:

```nginx
server {
  listen 80;
  server_name yourdomain.com;
  root /path/to/dist;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

## Environment Variables

For environment-specific configuration, manage environment variables carefully:

### Local Development

Create a `.env.local` file for local development:

```
VITE_API_URL=http://localhost:3000/api
VITE_GA_TRACKING_ID=UA-XXXXXXXXX-X
```

### Production Deployment

Set environment variables in your hosting platform:

- **Netlify**: Site settings > Build & deploy > Environment
- **Vercel**: Project settings > Environment Variables
- **GitHub Pages**: Environment variables must be built into the application

### Accessing Environment Variables

In the application code, access environment variables using the `import.meta.env` syntax:

```tsx
// Example usage
const apiUrl = import.meta.env.VITE_API_URL;
```

## Post-Deployment Verification

After deployment, perform these checks:

### Functional Verification

- **Navigation**: Test all navigation links and routes
- **Responsive Design**: Verify layout on multiple device sizes
- **Features**: Test all interactive elements and features
- **Forms**: Submit test data through all forms
- **Media**: Ensure all images, videos, and other media load correctly

### Performance Verification

Run performance tests using:

- **Lighthouse**: For overall performance, accessibility, and best practices
- **WebPageTest**: For detailed performance metrics
- **Google PageSpeed Insights**: For mobile and desktop performance

### SEO Verification

- **Meta Tags**: Verify title, description, and Open Graph tags
- **Structured Data**: Test using Google's Structured Data Testing Tool
- **Sitemap**: Verify the sitemap is accessible
- **Robots.txt**: Ensure it's correctly configured

## Continuous Deployment

Set up continuous deployment for automated updates:

### GitHub Actions

Create a `.github/workflows/deploy.yml` file:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v1.2
        with:
          publish-dir: './dist'
          production-branch: main
          github-token: ${{ secrets.GITHUB_TOKEN }}
          deploy-message: "Deploy from GitHub Actions"
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## Rollback Procedures

In case of deployment issues:

### Netlify/Vercel Rollback

Both platforms maintain deployment history:

1. Go to your site's deployment page
2. Find the last working deployment
3. Click "Publish deploy" or "Rollback to this deploy"

### Manual Rollback

For traditional hosting:

1. Maintain backup copies of previous builds
2. Replace the current deployment with the previous working version
3. Test to ensure the rollback was successful

## Troubleshooting

Common deployment issues and solutions:

### 404 Errors on Routes

**Problem**: Direct access to routes returns 404 errors.

**Solution**: Implement server-side redirects to `index.html`:

For Netlify, create a `_redirects` file in the `public` directory:
```
/* /index.html 200
```

### Missing Assets

**Problem**: Some assets (images, styles) are not loading.

**Solution**: 
- Check file paths and ensure they're relative
- Verify the assets were included in the build
- Check network requests for errors

### Environment Variable Issues

**Problem**: Environment variables not accessible.

**Solution**:
- Verify variables are prefixed with `VITE_` (for Vite projects)
- Check that variables are properly set in the hosting platform
- Rebuild and redeploy after updating environment variables

### CORS Issues

**Problem**: API requests failing due to CORS errors.

**Solution**:
- Configure the API server to allow requests from your domain
- Use a proxy in development
- Consider implementing a serverless function as a proxy

### Performance Issues

**Problem**: Site loads slowly in production.

**Solution**:
- Use Lighthouse to identify performance bottlenecks
- Optimize images and assets
- Implement code splitting
- Enable compression on the server
- Use a CDN for asset delivery