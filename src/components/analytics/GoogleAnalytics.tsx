import Script from "next/script";
import { envs } from "@/core/config";

/**
 * Google Analytics 4 Component
 *
 * Loads gtag.js and initializes GA4 tracking.
 * Uses next/script with afterInteractive strategy to minimize impact on LCP.
 *
 * @see https://developers.google.com/analytics/devguides/collection/ga4
 */
export function GoogleAnalytics() {
  const measurementId = envs.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script id="google-consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};

          window.gtag('consent', 'default', {
            analytics_storage: 'granted',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
          });
        `}
      </Script>

      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.gtag('js', new Date());
          window.gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
