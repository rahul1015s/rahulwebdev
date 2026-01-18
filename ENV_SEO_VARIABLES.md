# SEO Environment Variables

Add these environment variables to your `.env.local` file for full SEO functionality:

## Required Variables

```env
# Site URL (used for canonical URLs and Open Graph)
NEXT_PUBLIC_SITE_URL=https://rahulwebdev.in

# Search Engine Verification (optional)
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-google-verification-code
NEXT_PUBLIC_YANDEX_VERIFICATION=your-yandex-verification-code
NEXT_PUBLIC_BING_VERIFICATION=your-bing-verification-code
```

## Optional Variables for Enhanced SEO

```env
# Author email (used in structured data)
NEXT_PUBLIC_AUTHOR_EMAIL=hello@rahulwebdev.in

# Social media handles (used in schema)
NEXT_PUBLIC_TWITTER_HANDLE=@rahulwebdev
NEXT_PUBLIC_GITHUB_URL=https://github.com/rahulwebdev
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/rahulwebdev

# OpenAI GPT Bot Allowance
NEXT_PUBLIC_ALLOW_GPT_INDEXING=true

# Analytics and Tracking
NEXT_PUBLIC_GA_ID=your-google-analytics-id
NEXT_PUBLIC_CLARITY_ID=your-clarity-tracking-id
```

## How to Get Verification Codes

### Google Search Console Verification
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add/select your property
3. Go to Settings > Verification details
4. Copy the meta tag content

### Bing Webmaster Tools Verification
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmaster)
2. Add/select your site
3. Go to Settings > Verify ownership
4. Copy the meta tag content

### Yandex Webmaster Verification
1. Go to [Yandex Webmaster](https://webmaster.yandex.com/)
2. Add your site
3. Verify with meta tag
4. Copy the content attribute value

## Example `.env.local` File

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://rahulwebdev.in
NODE_ENV=production

# Search Engine Verification Codes
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=abcd1234efgh5678ijkl90
NEXT_PUBLIC_YANDEX_VERIFICATION=yandex1234567890abcdef
NEXT_PUBLIC_BING_VERIFICATION=bing1234567890abcdef

# Author Information
NEXT_PUBLIC_AUTHOR_EMAIL=hello@rahulwebdev.in

# Social Media
NEXT_PUBLIC_TWITTER_HANDLE=@rahulwebdev
NEXT_PUBLIC_GITHUB_URL=https://github.com/rahulwebdev
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/rahulwebdev

# AI Indexing
NEXT_PUBLIC_ALLOW_GPT_INDEXING=true

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_ID=xxxxx

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# Authentication (if applicable)
NEXTAUTH_URL=https://rahulwebdev.in
NEXTAUTH_SECRET=your-secret-key
```

## Verification Steps After Setting Variables

1. **Restart Development Server**
   ```bash
   npm run dev
   ```

2. **Verify Meta Tags**
   - Visit your site
   - Right-click > View Page Source
   - Search for `<meta` tags with your verification codes

3. **Test in Search Console**
   - Go to Google Search Console
   - Check "Verification" status
   - Should show "Verified"

4. **Submit Sitemap**
   - Go to Google Search Console
   - Sitemaps section
   - Add your sitemap URL: `https://rahulwebdev.in/sitemap.xml`

5. **Request Indexing**
   - In Search Console
   - Use URL inspection tool
   - Request indexing for main pages

## Environment-Specific Configuration

### Development
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ALLOW_GPT_INDEXING=false
```

### Staging
```env
NEXT_PUBLIC_SITE_URL=https://staging.rahulwebdev.in
NEXT_PUBLIC_ALLOW_GPT_INDEXING=false
```

### Production
```env
NEXT_PUBLIC_SITE_URL=https://rahulwebdev.in
NEXT_PUBLIC_ALLOW_GPT_INDEXING=true
```

## Security Notes

⚠️ **Important:** 
- Never commit `.env.local` to version control
- Keep verification codes private
- Use `.env.example` for template documentation
- Add `.env.local` to `.gitignore`

---

For more information, see [SEO_IMPLEMENTATION.md](../SEO_IMPLEMENTATION.md)
