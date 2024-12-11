"use server";

import { revalidateTag, unstable_cache } from "next/cache";
import { Application } from "./types";
import { getStore } from "./store";

export const getApplications = unstable_cache(
  async () => {
    const apps = getStore()
      .entries()
      .map((e) => {
        const app: Application = {
          id: e[0],
          name: e[1].name,
        };
        return app;
      })
      .toArray();
    return apps;
  },
  ["applications"],
  { tags: ["applications"] },
);

export async function createApplication(formData: FormData) {
  getStore().set(Math.random().toString(10).substring(2, 9), {
    name: (formData.get("name") as string | undefined) ?? "New Application",
    keys: [],
  });

  revalidateTag("applications");
}

export async function deleteApplication(form: FormData) {
  const id: string = (form.get("id") as string | null) ?? "";
  getStore().delete(id);

  revalidateTag("applications");
}

type UpdateApplication = {
  name?: string;
};

export async function updateApplication(
  id: string,
  updateApp: UpdateApplication,
) {
  const app = getStore().get(id);
  if (!app) return;

  if (updateApp.name) {
    app.name = updateApp.name;
  }

  revalidateTag("applications");
}
