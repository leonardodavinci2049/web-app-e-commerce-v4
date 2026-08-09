/**
 * Analytics Module
 *
 * Exports Google Analytics 4 component and e-commerce event tracking functions.
 */

export { CookieConsent } from "./CookieConsent";
export {
  type GA4Item,
  trackAddToCart,
  trackBeginCheckout,
  trackContact,
  trackEvent,
  trackGenerateLead,
  trackPurchase,
  trackRemoveFromCart,
  trackSearch,
  trackSelectItem,
  trackViewCart,
  trackViewItem,
  trackViewItemList,
} from "./events";
export { GoogleAnalytics } from "./GoogleAnalytics";
export { ProductListViewTracker } from "./ProductListViewTracker";
export { ProductViewTracker } from "./ProductViewTracker";
export { TrackedContactLink } from "./TrackedContactLink";
export { TrackedProductLink } from "./TrackedProductLink";
