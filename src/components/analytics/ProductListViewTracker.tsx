"use client";

import { useEffect, useRef } from "react";
import {
  ANALYTICS_CONSENT_GRANTED_EVENT,
  type GA4Item,
  hasAnalyticsConsent,
  trackViewItemList,
} from "./events";

interface ProductListViewTrackerProps {
  listId: string;
  listName: string;
  items: GA4Item[];
}

export function ProductListViewTracker({
  listId,
  listName,
  items,
}: ProductListViewTrackerProps) {
  const trackedSignature = useRef<string | null>(null);

  useEffect(() => {
    const signature = `${listId}:${items.map((item) => item.item_id).join(",")}`;
    const track = () => {
      if (
        items.length === 0 ||
        trackedSignature.current === signature ||
        !hasAnalyticsConsent()
      ) {
        return;
      }

      trackViewItemList(listId, listName, items);
      trackedSignature.current = signature;
    };

    track();
    window.addEventListener(ANALYTICS_CONSENT_GRANTED_EVENT, track);

    return () => {
      window.removeEventListener(ANALYTICS_CONSENT_GRANTED_EVENT, track);
    };
  }, [items, listId, listName]);

  return null;
}
