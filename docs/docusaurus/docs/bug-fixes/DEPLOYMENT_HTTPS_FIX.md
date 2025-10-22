# 🔒 HTTPS Mixed Content Fix - Deployment Guide

## ❌ Problem

Images were loading over HTTP instead of HTTPS, causing mixed content errors:

```
Mixed Content: The page at 'https://www.markjohnignacio.tech/' was loaded over HTTPS,
but requested an insecure image 'http://188.166.236.231/storage/portfolio/projects/...'.
This request has been blocked; the content must be served over HTTPS.
```

## ✅ Solutions Applied

### 1. Updated `.env.prod` Configuration

Changed:

- `APP_ENV=local` → `APP_ENV=production` (enables HTTPS forcing)
- `APP_DEBUG=true` → `APP_DEBUG=false` (security best practice)
- Added `ASSET_URL=https://www.markjohnignacio.tech` (forces HTTPS for all assets)

### 2. Enhanced AppServiceProvider

Added proxy detection for HTTPS forcing:

```php
// Force HTTPS for asset URLs if behind a proxy
if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') {
    URL::forceScheme('https');
}
```

## 📋 Deployment Steps

### Step 1: Update Production Environment File

```bash
# Copy the updated .env.prod to your server
scp .env.prod your-server:/path/to/laravel/.env
```

Or manually update on the server:

```bash
APP_ENV=production
APP_DEBUG=false
APP_URL=https://www.markjohnignacio.tech
ASSET_URL=https://www.markjohnignacio.tech
```

### Step 2: Clear Laravel Caches

```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
```

### Step 3: Optimize for Production

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Step 4: Restart Services (if applicable)

```bash
# If using PHP-FPM
sudo systemctl restart php8.3-fpm

# If using Nginx
sudo systemctl restart nginx

# If using supervisor for queue workers
sudo supervisorctl restart all
```

### Step 5: Verify Storage Link

Make sure the storage link exists:

```bash
php artisan storage:link
```

### Step 6: Check Permissions

Ensure storage and cache directories are writable:

```bash
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

## 🔍 Testing

### 1. Check Browser Console

Open https://www.markjohnignacio.tech and check the browser console (F12):

- Should see NO mixed content warnings
- All images should load over HTTPS

### 2. Check Network Tab

In browser DevTools → Network tab:

- Filter by Images
- Verify all image URLs start with `https://`

### 3. Test Image URLs

In browser console, run:

```javascript
// Get all image sources
Array.from(document.images).forEach((img) => console.log(img.src));
// All should start with https://
```

### 4. SSL Labs Test

Visit: https://www.ssllabs.com/ssltest/analyze.html?d=www.markjohnignacio.tech

- Should get an A or A+ rating

## 🛠️ Troubleshooting

### Images still loading over HTTP?

1. **Check .env file on server**:

    ```bash
    cat .env | grep -E 'APP_ENV|APP_URL|ASSET_URL'
    ```

    Should show:

    ```
    APP_ENV=production
    APP_URL=https://www.markjohnignacio.tech
    ASSET_URL=https://www.markjohnignacio.tech
    ```

2. **Clear all caches**:

    ```bash
    php artisan optimize:clear
    ```

3. **Check if behind a load balancer/proxy**:
   If using Nginx or Apache as reverse proxy, ensure it's passing the HTTPS headers:

    **Nginx:**

    ```nginx
    location / {
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
    }
    ```

    **Apache:**

    ```apache
    RequestHeader set X-Forwarded-Proto "https"
    ```

4. **Check Laravel trusted proxies** (if behind load balancer):
   Edit `app/Http/Middleware/TrustProxies.php`:
    ```php
    protected $proxies = '*'; // Trust all proxies
    ```

### Storage symbolic link missing?

```bash
php artisan storage:link
```

### Permission issues?

```bash
sudo chown -R www-data:www-data /path/to/laravel
sudo chmod -R 775 storage bootstrap/cache
```

## 📝 Key Configuration Files

### `.env.prod` (Production Environment)

```bash
APP_ENV=production          # CRITICAL: Must be "production"
APP_DEBUG=false            # Security: Disable debug in production
APP_URL=https://www.markjohnignacio.tech
ASSET_URL=https://www.markjohnignacio.tech  # Forces HTTPS for assets
```

### `app/Providers/AppServiceProvider.php`

```php
public function boot(): void
{
    // Force HTTPS in production
    if ($this->app->environment('production')) {
        URL::forceScheme('https');
    }

    // Force HTTPS for asset URLs if behind a proxy
    if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') {
        URL::forceScheme('https');
    }
}
```

## ✅ Verification Checklist

After deployment, verify:

- [ ] `.env` has `APP_ENV=production`
- [ ] `.env` has `APP_DEBUG=false`
- [ ] `.env` has `ASSET_URL=https://...`
- [ ] All caches cleared (`php artisan optimize:clear`)
- [ ] New caches generated (`php artisan optimize`)
- [ ] Storage link exists (`ls -la public/storage`)
- [ ] No mixed content errors in browser console
- [ ] All images load over HTTPS
- [ ] Project images visible on homepage
- [ ] Project detail modals show images correctly

## 🎯 Expected Results

### Before Fix:

```
❌ http://188.166.236.231/storage/portfolio/projects/...
```

### After Fix:

```
✅ https://www.markjohnignacio.tech/storage/portfolio/projects/...
```

## 🔒 Security Improvements

By changing to `APP_ENV=production` and `APP_DEBUG=false`:

- ✅ Error messages won't expose sensitive information
- ✅ Stack traces won't be shown to users
- ✅ Performance improvements from cached configs
- ✅ HTTPS enforcement activated
- ✅ Mixed content warnings eliminated

## 📞 Still Having Issues?

1. **Check Laravel logs**: `storage/logs/laravel.log`
2. **Check web server logs**: `/var/log/nginx/error.log` or `/var/log/apache2/error.log`
3. **Verify SSL certificate**: `openssl s_client -connect www.markjohnignacio.tech:443`
4. **Test asset helper**: In `tinker`, run:
    ```php
    php artisan tinker
    >>> asset('storage/test.png');
    // Should return: "https://www.markjohnignacio.tech/storage/test.png"
    ```

---

**Last Updated**: October 22, 2025  
**Issue**: Mixed Content Error - HTTP images on HTTPS site  
**Status**: ✅ Fixed
