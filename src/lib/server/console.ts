"use server";

import { revalidateTag, unstable_cache } from "next/cache";
import { Application } from "./types";

let applicationsStore: Application[] = [
  // {
  //   id: 0,
  //   name: "Development",
  // },
  // {
  //   id: 1,
  //   name: "Production",
  // },
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
    id: applicationsStore.at(-1)?.id ?? 0,
    name: (formData.get("name") as string | undefined) ?? "New Application",
  };
  applicationsStore = [...applicationsStore, newApp];

  revalidateTag("applications");
}

export async function deleteApplication(id: number) {
  applicationsStore = applicationsStore.filter((a) => a.id !== id);

  revalidateTag("applications");
}
