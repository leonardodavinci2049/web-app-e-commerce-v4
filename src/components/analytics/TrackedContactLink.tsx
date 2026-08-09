"use client";

import { type ComponentProps, forwardRef } from "react";
import { type ContactMethod, trackContact, trackGenerateLead } from "./events";

interface TrackedContactLinkProps extends Omit<ComponentProps<"a">, "href"> {
  href: string;
  method: ContactMethod;
  location: string;
  lead?: boolean;
}

export const TrackedContactLink = forwardRef<
  HTMLAnchorElement,
  TrackedContactLinkProps
>(function TrackedContactLink(
  { href, method, location, lead = false, onClick, ...props },
  ref,
) {
  return (
    <a
      {...props}
      ref={ref}
      href={href}
      onClick={(event) => {
        if (lead) {
          trackGenerateLead(method, location);
        } else {
          trackContact(method, location);
        }
        onClick?.(event);
      }}
    />
  );
});
