"use server";

import { revalidateTag, unstable_cache } from "next/cache";
import { Application } from "./types";

let applicationsStore: Application[] = [
  {
    id: "1",
    name: "Development",
  },
  {
    id: "2",
    name: "Production",
  },
];

export const getApplications = unstable_cache(
  async () => {
    return applicationsStore;
  },
  ["applications"],
  { tags: ["applications"] },
);

export async function createApplication(formData: FormData) {
  const newApp: Application = {
    id: Math.random().toString(36).substr(2, 9),
    name: (formData.get("name") as string | undefined) ?? "New Application",
  };
  applicationsStore = [...applicationsStore, newApp];

  revalidateTag("applications");
}

export async function deleteApplication(form: FormData) {
  const id: string = (form.get("id") as string | null) ?? "";
  // The `!==` doesn't work. Joke of a language.
  applicationsStore = applicationsStore.filter((a) => a.id !== id);

  revalidateTag("applications");
}

type UpdateApplication = {
  name?: string;
};

export async function updateApplication(
  id: string,
  updateApp: UpdateApplication,
) {
  const app = applicationsStore.find((a) => a.id === id);
  if (!app) return;

  if (updateApp.name) {
    app.name = updateApp.name;
  }

  revalidateTag("applications");
}
