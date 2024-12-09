"use client";

import { useId } from "react";
import { useActiveApplication } from "@/contexts/ApplicationContext";
import { Application } from "@/lib/server/types";
import { redirect } from "next/navigation";

type ApplicationSelectorProps = {
  appsList: Application[];
};

export function ApplicationSelector({ appsList }: ApplicationSelectorProps) {
  const selectId = useId();
  const { activeApplication, setActiveApplication } = useActiveApplication();

  if (appsList.length === 0) {
    return null;
  }

  return (
    <div className="relative flex items-center gap-2">
      <label htmlFor={selectId} className="sr-only">
        Select Application
      </label>
      <select
        id={selectId}
        value={activeApplication?.id || ""}
        onChange={(e) => {
          const selected = appsList.find(
            (app) => app.id === Number(e.target.value),
          );
          setActiveApplication(selected ?? null);
        }}
        className="appearance-none bg-transparent border border-gray-300 rounded-md py-1.5 pl-3 pr-8 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {appsList.map((app) => (
          <option key={app.id} value={app.id}>
            {app.name}
          </option>
        ))}
      </select>
      <svg
        className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  );
}
