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
      className={`flex items-center px-6 py-3 rounded-md transition-colors ${
        isActive
          ? "bg-gray-700 text-white"
          : "text-gray-300 hover:bg-gray-600 hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
}
