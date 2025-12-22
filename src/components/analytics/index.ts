/**
 * Analytics Module
 *
 * Exports Google Analytics 4 component and e-commerce event tracking functions.
 */

export { GoogleAnalytics } from "./GoogleAnalytics";
export {
  trackViewItem,
  trackAddToCart,
  trackRemoveFromCart,
  trackViewCart,
  trackBeginCheckout,
  trackPurchase,
  trackViewItemList,
  trackSelectItem,
  trackSearch,
  trackEvent,
  type GA4Item,
} from "./events";
