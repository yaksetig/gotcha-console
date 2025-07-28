"use client";

import Link from "next/link";
import { PropsWithChildren } from "react";
import { UrlObject } from "url";
import { usePathname } from "next/navigation";

export type NavItemProps = PropsWithChildren<{
  href: string | UrlObject;
}>;

export default function NavItem({ href, children }: NavItemProps) {
  const pathname = usePathname();
  const hrefPath = typeof href === "string" ? href : href.pathname ?? "";
  const isActive =
    pathname === hrefPath ||
    (hrefPath !== "/" && pathname.startsWith(`${hrefPath}/`));

  return (
    <Link
      href={href}

      className={`flex items-center px-6 py-3 ${
        isActive
          ? "bg-gray-100 text-gray-900"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      {children}
    </Link>
  );
}
