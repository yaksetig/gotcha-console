import Link from "next/link";
import { PropsWithChildren } from "react";
import { UrlObject } from "url";

export type NavItemProps = PropsWithChildren<{
  href: string | UrlObject;
}>;

export default function NavItem({ href, children }: NavItemProps) {
  return (
    <Link
      href={href}
      className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    >
      {children}
    </Link>
  );
}
