## ❌ Problem

```
Access to script at 'https://www.markjohnignacio.tech/build/assets/app-DLUWJ9Pz.js'
from origin 'https://markjohnignacio.tech' has been blocked by CORS policy:
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

**Root Cause**: Browsers treat `https://markjohnignacio.tech` and `https://www.markjohnignacio.tech` as **different origins**, even though they point to the same server. When you load the page from one and assets from the other, it triggers CORS errors.

## ✅ Solution: Redirect Non-WWW to WWW

The best approach is to **standardize on one domain** (with www) and redirect all traffic from the other.

### Changes Made

#### 1. Created `EnsureWwwDomain` Middleware

**File**: `app/Http/Middleware/EnsureWwwDomain.php`

This middleware automatically redirects:

- `https://markjohnignacio.tech` → `https://www.markjohnignacio.tech`

```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureWwwDomain
{
    public function handle(Request $request, Closure $next): Response
    {
        // Only redirect in production
        if (app()->environment('production')) {
            $host = $request->getHost();

            // If accessing without www, redirect to www
            if ($host === 'markjohnignacio.tech') {
                return redirect()->to(
                    'https://www.' . $host . $request->getRequestUri(),
                    301 // Permanent redirect
                );
            }
        }

        return $next($request);
    }
}
```

#### 2. Registered Middleware

**File**: `bootstrap/app.php`

Added `EnsureWwwDomain::class` to the web middleware stack.

## 🚀 Deployment Steps

### Step 1: Deploy Code Changes

```bash
# Push changes to your repository
git add .
git commit -m "Fix CORS by redirecting non-www to www"
git push origin main

# On production server, pull changes
git pull origin main
```

### Step 2: Clear Caches

```bash
php artisan optimize:clear
php artisan optimize
```

### Step 3: Configure Web Server (Recommended)

While the Laravel middleware handles this, it's more efficient to handle redirects at the web server level:

#### **Option A: Nginx Configuration**

Add to your Nginx server block:

```nginx
server {
    listen 80;
    listen 443 ssl http2;
    server_name markjohnignacio.tech;

    # SSL certificates
    ssl_certificate /path/to/ssl/cert.pem;
    ssl_certificate_key /path/to/ssl/key.pem;

    # Permanent redirect to www
    return 301 https://www.markjohnignacio.tech$request_uri;
}

server {
    listen 80;
    listen 443 ssl http2;
    server_name www.markjohnignacio.tech;

    # SSL certificates
    ssl_certificate /path/to/ssl/cert.pem;
    ssl_certificate_key /path/to/ssl/key.pem;

    root /path/to/laravel/public;
    index index.php index.html;

    # ... rest of your Laravel configuration ...
}
```

After editing, test and reload:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

#### **Option B: Apache Configuration**

Add to your `.htaccess` or VirtualHost:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On

    # Redirect non-www to www
    RewriteCond %{HTTP_HOST} ^markjohnignacio\.tech$ [NC]
    RewriteRule ^(.*)$ https://www.markjohnignacio.tech/$1 [R=301,L]
</IfModule>
```

For VirtualHost:

```apache
<VirtualHost *:80>
    ServerName markjohnignacio.tech
    Redirect permanent / https://www.markjohnignacio.tech/
</VirtualHost>

<VirtualHost *:443>
    ServerName markjohnignacio.tech
    SSLEngine on
    SSLCertificateFile /path/to/cert.crt
    SSLCertificateKeyFile /path/to/private.key
    Redirect permanent / https://www.markjohnignacio.tech/
</VirtualHost>

<VirtualHost *:443>
    ServerName www.markjohnignacio.tech
    # ... Laravel configuration ...
</VirtualHost>
```

After editing:

```bash
sudo apachectl configtest
sudo systemctl reload apache2
```

### Step 4: Update DNS (if needed)

Ensure both records point to your server:

```
A     markjohnignacio.tech     → YOUR_SERVER_IP
A     www.markjohnignacio.tech → YOUR_SERVER_IP
```

Or use CNAME:

```
A       markjohnignacio.tech     → YOUR_SERVER_IP
CNAME   www.markjohnignacio.tech → markjohnignacio.tech
```

### Step 5: Update SSL Certificates

Make sure your SSL certificate covers both domains:

```bash
# If using Let's Encrypt
sudo certbot certonly --nginx -d markjohnignacio.tech -d www.markjohnignacio.tech

# Or for Apache
sudo certbot certonly --apache -d markjohnignacio.tech -d www.markjohnignacio.tech
```

## 🔍 Testing

### 1. Test Redirect

```bash
# Should redirect to www version
curl -I https://markjohnignacio.tech

# Expected response:
HTTP/2 301
location: https://www.markjohnignacio.tech/
```

### 2. Test in Browser

1. Clear browser cache (Ctrl+Shift+Delete)
2. Visit `https://markjohnignacio.tech`
3. Should automatically redirect to `https://www.markjohnignacio.tech`
4. Check browser console (F12) - should see NO CORS errors

### 3. Test Assets Loading

```javascript
// In browser console
performance.getEntriesByType('resource').forEach((r) => {
    console.log(r.name);
});
// All URLs should start with https://www.markjohnignacio.tech
```

## 🛠️ Alternative Solution: Prefer Non-WWW

If you prefer to use the non-www version instead, modify the middleware:

```php
// In EnsureWwwDomain.php
if ($host === 'www.markjohnignacio.tech') {
    return redirect()->to(
        'https://markjohnignacio.tech' . $request->getRequestUri(),
        301
    );
}
```

And update `.env.prod`:

```bash
APP_URL=https://markjohnignacio.tech
ASSET_URL=https://markjohnignacio.tech
```

Then update web server config to redirect www → non-www.

## 📋 Why This Works

### The Problem

```
Page loads from: https://markjohnignacio.tech
Assets load from: https://www.markjohnignacio.tech
→ Browser sees different origins → CORS error
```

### The Solution

```
User visits: https://markjohnignacio.tech
→ Redirects to: https://www.markjohnignacio.tech (301)
Page loads from: https://www.markjohnignacio.tech
Assets load from: https://www.markjohnignacio.tech
→ Same origin → No CORS error ✅
```

## 🎯 Best Practices

### ✅ DO:

- Choose one canonical domain (www or non-www)
- Use 301 permanent redirects
- Handle redirects at web server level for performance
- Ensure SSL covers both domains
- Update all external links to use canonical domain

### ❌ DON'T:

- Try to serve the same content from both domains
- Use CORS headers as a workaround (redirect is cleaner)
- Use temporary (302) redirects for this purpose
- Forget to update internal links

## 🔒 SEO Benefits

301 redirects are SEO-friendly:

- ✅ Consolidates domain authority
- ✅ Prevents duplicate content issues
- ✅ Passes link equity (PageRank)
- ✅ Tells search engines your preferred domain

## 🧪 Verification Checklist

After deployment:

- [ ] `https://markjohnignacio.tech` redirects to `https://www.markjohnignacio.tech`
- [ ] Redirect is 301 (permanent)
- [ ] No CORS errors in browser console
- [ ] All assets load from `https://www.markjohnignacio.tech`
- [ ] SSL certificate valid for both domains
- [ ] No mixed content warnings
- [ ] Google Search Console shows preferred domain

## 🐛 Troubleshooting

### Still seeing CORS errors?

1. **Clear browser cache completely**:

    ```
    Chrome: Settings → Privacy → Clear browsing data → Cached images and files
    ```

2. **Check if redirect is working**:

    ```bash
    curl -IL https://markjohnignacio.tech
    ```

    Should show `301` and `Location: https://www.markjohnignacio.tech/`

3. **Verify middleware is active**:

    ```bash
    php artisan route:list --middleware=EnsureWwwDomain
    ```

4. **Check APP_ENV is set to production**:

    ```bash
    php artisan tinker
    >>> app()->environment()
    => "production"
    ```

5. **Check web server configuration**:
    - Ensure no caching is interfering with redirects
    - Verify SSL is properly configured
    - Check for conflicting redirect rules

### Redirect not happening?

1. **Verify .env settings**:

    ```bash
    APP_ENV=production  # Middleware only runs in production
    APP_URL=https://www.markjohnignacio.tech
    ```

2. **Clear Laravel caches**:

    ```bash
    php artisan optimize:clear
    ```

3. **Check middleware registration**:
   Ensure `EnsureWwwDomain::class` is in `bootstrap/app.php`

## 📊 Performance Impact

### Laravel Middleware Approach:

- ⚡ Fast (happens before app processes request)
- 🎯 Environment-aware (only production)
- 🔧 Easy to modify

### Web Server Approach:

- ⚡⚡⚡ Fastest (doesn't hit PHP at all)
- 📦 Less server resources used
- 🚀 Best for high-traffic sites

**Recommendation**: Use **both** for defense in depth!

---

## 📞 Quick Reference

### Files Changed:

- ✅ `app/Http/Middleware/EnsureWwwDomain.php` (new)
- ✅ `bootstrap/app.php` (updated)

### Commands to Run:

```bash
php artisan optimize:clear
php artisan optimize
```

### Web Server Config:

- Nginx: Add redirect in server block for non-www
- Apache: Add redirect in VirtualHost or .htaccess

### Testing:

```bash
curl -I https://markjohnignacio.tech
```

---

**Last Updated**: October 22, 2025  
**Issue**: CORS Error - WWW vs Non-WWW  
**Status**: ✅ Fixed with 301 Redirects
