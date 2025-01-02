"use server";

import { revalidateTag, unstable_cache } from "next/cache";
import { Application } from "./types";
import { getAccessToken } from "@auth0/nextjs-auth0";

export const getApplications = unstable_cache(
  async (accessToken: string): Promise<Application[]> => {
    const apps: { id: string; label?: string }[] = await fetch(
      "http://localhost:8080/api/console",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    ).then(async (r) => {
      if (r.status !== 200) {
        console.error("getApplications not OK", r);
        return [];
      }
      return await r.json();
    });

    return apps.map((a) => ({
      id: a.id,
      name: a.label,
    }));
  },
  ["applications"],
  { tags: ["applications"] },
);

export async function createApplication(formData: FormData) {
  await fetch("http://localhost:8080/api/console", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${(await getAccessToken()).accessToken}`,
    },
    body: JSON.stringify({
      label: (formData.get("name") as string | undefined) ?? "New Application",
    }),
  });

  revalidateTag("applications");
}

export async function deleteApplication(form: FormData) {
  const id = form.get("id") as string | null;
  if (!id) throw new Error("no application id provided");

  await fetch(`http://localhost:8080/api/console/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${(await getAccessToken()).accessToken}`,
    },
  });

  revalidateTag("applications");
}

type UpdateApplication = {
  name?: string;
};

export async function updateApplication(
  consoleId: string,
  updateApp: UpdateApplication,
) {
  await fetch(`http://localhost:8080/api/console/${consoleId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${(await getAccessToken()).accessToken}`,
    },
    body: JSON.stringify({
      label: updateApp.name ?? null,
    }),
  });

  revalidateTag("applications");
}
