"use client";

import NavList from "./NavList";
import NavItem from "./NavItem";
import { useSidebar } from "./SidebarContext";
import Image from "next/image";

type SidebarProps = {
  appId?: string;
};

export default function Sidebar({ appId }: SidebarProps) {
  const { open } = useSidebar();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 shadow-lg flex-shrink-0 transform transition-transform md:relative md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
    >
      <div className="p-6 text-center">
        <Image src="/logo.svg" alt="Gotcha logo" width={120} height={120} className="mx-auto mb-2" />
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Gotcha console</h1>
      </div>
      <NavList>
        <NavItem href={`/console/${appId ?? ""}`}>
          <span className="mr-3">🏠</span>
          Console
        </NavItem>
        <NavItem href={`/console/${appId ?? ""}/api-keys`}>
          <span className="mr-3">🔐</span>
          API Keys
        </NavItem>
        <NavItem href={`/console/${appId ?? ""}/challenge-preferences`}>
          <span className="mr-3">🧩</span>
          Challenge preferences
        </NavItem>
      </NavList>
    </aside>
  );
}
