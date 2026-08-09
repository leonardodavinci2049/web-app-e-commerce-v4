"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { type GA4Item, trackSelectItem } from "./events";

interface TrackedProductLinkProps
  extends Omit<ComponentProps<typeof Link>, "href" | "onClick"> {
  href: string;
  item: GA4Item;
  listId?: string;
  listName?: string;
}

export function TrackedProductLink({
  href,
  item,
  listId = "products",
  listName = "Produtos",
  ...props
}: TrackedProductLinkProps) {
  return (
    <Link
      {...props}
      href={href}
      onClick={() => trackSelectItem(listId, listName, item)}
    />
  );
}
