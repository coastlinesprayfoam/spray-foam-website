# Custom Domain Fix Guide

## Issue
Subpages work on `https://spray-foam-website.pages.dev/service-areas` but not on your custom domain.

## Solution Steps

### 1. Check Cloudflare Pages Custom Domain Settings
1. Go to Cloudflare Dashboard
2. Navigate to Pages → Your Project
3. Click on "Custom domains" tab
4. Verify your custom domain is listed and shows "Active" status

### 2. Verify DNS Configuration
1. In Cloudflare Dashboard, go to DNS → Records
2. Ensure you have a CNAME record pointing to your Pages project:
   ```
   Type: CNAME
   Name: @ (or your domain)
   Target: spray-foam-website.pages.dev
   Proxy status: Proxied (orange cloud)
   ```

### 3. Check Domain Status
1. In Pages → Custom domains, look for any error messages
2. Common issues:
   - DNS not propagated (wait 24-48 hours)
   - SSL certificate pending (usually resolves automatically)
   - Domain not verified

### 4. Force SSL/TLS Settings
1. Go to SSL/TLS → Overview
2. Set encryption mode to "Full" or "Full (strict)"
3. Enable "Always Use HTTPS"

### 5. Clear Cache
1. Go to Caching → Purge Cache
2. Select "Purge Everything"
3. Wait a few minutes and test again

### 6. Test Subpages
After fixing, test these URLs on your custom domain:
- `/service-areas`
- `/about`
- `/services`
- `/blog`
- `/faq`

## Common Fixes

### If pages return 404:
- Check that all HTML files are in the root directory
- Verify the build output directory is set correctly
- Ensure file names match exactly (case-sensitive)

### If redirects don't work:
- Check the `_redirects` file is in the root directory
- Verify redirect syntax is correct
- Test redirects individually

## Contact Support
If issues persist, contact Cloudflare Pages support with:
- Your domain name
- Error messages
- Screenshots of DNS settings
- Description of what's working vs. not working
