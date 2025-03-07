# SEO and Facebook Pixel Setup Guide

This document provides instructions for setting up SEO features and Facebook Pixel in your Omeru Digital website.

## Facebook Pixel Setup

1. **Get your Facebook Pixel ID:**
   - Log in to your [Facebook Business Manager](https://business.facebook.com/)
   - Navigate to Events Manager > Pixels
   - Create a new Pixel or use an existing one
   - Copy your Pixel ID

2. **Add your Pixel ID to the environment variables:**
   - Open your `.env.local` file
   - Replace `YOUR_FACEBOOK_PIXEL_ID_HERE` with your actual Pixel ID:
   ```
   NEXT_PUBLIC_FACEBOOK_PIXEL_ID=123456789012345
   ```

3. **Test your Facebook Pixel:**
   - Use the [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc) Chrome extension
   - Visit your website and confirm that the Pixel is firing correctly

4. **Track custom events:**
   - You can track custom events using the `event` function:
   ```javascript
   import { event } from '../lib/fbpixel';

   // Track a custom event
   event('CompleteRegistration', { currency: 'USD', value: 99.99 });
   ```

## SEO Optimization

### Meta Tags

Meta tags are already set up using the `metadata.ts` utility. For each page, you can customize:

1. **Page-specific metadata:**
   ```typescript
   // Example for a "Services" page
   import { generateMetadata } from '../lib/metadata';

   export const metadata = generateMetadata({
     title: 'Our Services - Omeru Digital',
     description: 'Explore our range of digital services including web development, design, and automation.',
     pathname: '/services'
   });
   ```

### Verification Codes

1. **Google Search Console:**
   - Get your verification code from [Google Search Console](https://search.google.com/search-console)
   - Add it to `app/lib/metadata.ts`:
   ```typescript
   verification: {
     google: 'YOUR_GOOGLE_VERIFICATION_CODE',
     // ...
   }
   ```

2. **Facebook Domain Verification:**
   - Get your verification code from Facebook Business Manager > Business Settings > Brand Safety > Domains
   - Add it to the `other` property in the verification object

### Structured Data

This website has structured data set up using the `StructuredData` component. You can add additional structured data to specific pages:

```jsx
// Example for a blog post
<StructuredData 
  type="Article"
  name="How to Choose the Right Tech Stack for Your Project"
  datePublished="2023-06-15T09:00:00Z"
  dateModified="2023-06-20T14:30:00Z"
  author={{
    name: "Jane Doe",
    url: "https://omerudigital.com/team/jane-doe"
  }}
/>
```

### Images

For optimal social sharing, ensure these images exist:

1. `/public/og-image.jpg` - 1200x630px for Open Graph (Facebook, LinkedIn)
2. `/public/twitter-image.jpg` - 1200x600px for Twitter
3. `/public/logo.png` - Your company logo (used in structured data)
4. `/public/favicon.ico` - Favicon
5. `/public/icon-192.png` and `/public/icon-512.png` - PWA icons

### Sitemap and Robots.txt

The sitemap and robots.txt files are automatically generated. To update:

1. **Sitemap** - Edit `app/sitemap.ts` to include all your routes
2. **Robots.txt** - Edit `app/robots.ts` to customize crawling rules

## Troubleshooting Build Issues

If you encounter build issues related to the Facebook Pixel or other client-side hooks:

1. Make sure all client-side hooks (useSearchParams, usePathname, etc.) are wrapped in Suspense boundaries
2. Check that the not-found.tsx file is a static component without client-side hooks
3. Use the Next.js Image component instead of HTML img tags for better performance
4. Use the "use client" directive at the top of any file using client-side hooks

## Additional Resources

- [Facebook Pixel Documentation](https://developers.facebook.com/docs/facebook-pixel/)
- [Next.js Metadata Documentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Schema.org](https://schema.org/) - For structured data reference
- [Google Rich Results Test](https://search.google.com/test/rich-results) 