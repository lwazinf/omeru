// Facebook Pixel utility functions
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

// Initializes the Facebook Pixel
export const initFacebookPixel = (): void => {
  if (!FB_PIXEL_ID) return;
  
  if (typeof window !== 'undefined') {
    // Initialize Facebook Pixel
    window.fbq?.('init', FB_PIXEL_ID);
    window.fbq?.('track', 'PageView');
  }
};

// Track a Page View
export const pageview = (): void => {
  if (!FB_PIXEL_ID) return;
  
  if (typeof window !== 'undefined') {
    window.fbq?.('track', 'PageView');
  }
};

// Track specific events
export const event = (name: string, options = {}): void => {
  if (!FB_PIXEL_ID) return;
  
  if (typeof window !== 'undefined') {
    window.fbq?.('track', name, options);
  }
};

// Add TypeScript interface for the window object
declare global {
  interface Window {
    fbq?: (command: string, eventName: string, params?: Record<string, unknown>) => void;
    _fbq?: unknown;
  }
} 