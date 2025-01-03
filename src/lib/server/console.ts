"use server";

import { revalidateTag, unstable_cache } from "next/cache";
import { Application } from "./types";
import { getAccessToken } from "@auth0/nextjs-auth0";
import env from "./env";

export const getApplications = unstable_cache(
  async (accessToken: string): Promise<Application[]> => {
    const apps: { id: string; label?: string }[] = await fetch(
      `${env.GOTCHA_ORIGIN}/api/console`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    ).then(async (r) => {
      if (r.status !== 200) {
        throw new Error(`error fetching applications: ${r.status}`);
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

export async function createApplication(name?: string) {
  await fetch(`${env.GOTCHA_ORIGIN}/api/console`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${(await getAccessToken()).accessToken}`,
    },
    body: JSON.stringify({
      label: name ?? "New Application",
    }),
  });

  revalidateTag("applications");
}

export async function deleteApplication(id: string) {
  await fetch(`${env.GOTCHA_ORIGIN}/api/console/${id}`, {
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
  await fetch(`${env.GOTCHA_ORIGIN}/api/console/${consoleId}`, {
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
