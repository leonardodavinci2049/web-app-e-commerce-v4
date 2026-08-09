"use client";

import { useEffect, useRef } from "react";
import {
  ANALYTICS_CONSENT_GRANTED_EVENT,
  type GA4Item,
  hasAnalyticsConsent,
  trackViewItem,
} from "./events";

export function ProductViewTracker({ item }: { item: GA4Item }) {
  const trackedItemId = useRef<string | null>(null);

  useEffect(() => {
    const track = () => {
      if (trackedItemId.current === item.item_id || !hasAnalyticsConsent()) {
        return;
      }

      trackViewItem(item);
      trackedItemId.current = item.item_id;
    };

    track();
    window.addEventListener(ANALYTICS_CONSENT_GRANTED_EVENT, track);

    return () => {
      window.removeEventListener(ANALYTICS_CONSENT_GRANTED_EVENT, track);
    };
  }, [item]);

  return null;
}
