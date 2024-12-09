"use client";

import { Application } from "@/lib/server/types";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type ApplicationContextType = {
  activeApplication: Application | null;
  setActiveApplication: (application: Application | null) => void;
};

const ApplicationContext = createContext<ApplicationContextType | undefined>(
  undefined,
);

const STORAGE_KEY = "activeApplication";

export default function ApplicationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [activeApplication, setActiveApplication] =
    useState<Application | null>(() => {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    });

  useEffect(() => {
    if (activeApplication) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activeApplication));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [activeApplication]);

  return (
    <ApplicationContext.Provider
      value={{ activeApplication, setActiveApplication }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export function useActiveApplication() {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error(
      "useActiveApplication must be used within an ApplicationProvider",
    );
  }
  return context;
}
