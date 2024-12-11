"use client";

import Link from "next/link";
import { Dropdown, DropdownOption } from "@/components/Dropdown";
import { Application } from "@/lib/server/types";
import { useParams, usePathname } from "next/navigation";

type ApplicationSelectorProps = {
  appsList: Application[];
};

export function ApplicationSelector({ appsList }: ApplicationSelectorProps) {
  const currAppId = useParams().appId as string;
  const pathname = usePathname();

  function generateHref(appId: string): string {
    const segments = pathname.split("/");
    const appIdIndex = segments.findIndex((segment) => segment === currAppId);
    if (appIdIndex !== -1) {
      segments[appIdIndex] = appId;
    }
    return segments.join("/");
  }

  return (
    <Dropdown
      value={appsList.find((app) => app.id === currAppId)?.name}
      label="Select Application"
    >
      {appsList.map((app) => (
        <DropdownOption key={app.id} value={app.id}>
          <Link href={generateHref(app.id)} className="block w-full h-full">
            {app.name}
          </Link>
        </DropdownOption>
      ))}
    </Dropdown>
  );
}
