"use server";

import { revalidateTag, unstable_cache } from "next/cache";
import { ApiKey } from "./types";
import { getAccessToken } from "@auth0/nextjs-auth0";

export const getApiKeys = unstable_cache(
  async (accessToken: string, appId: string): Promise<ApiKey[]> => {
    const keys: { site_key: string; secret: string }[] = await fetch(
      `http://localhost:8080/api/console/${appId}/api-key`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    ).then((r) => r.json());

    return keys.map((k) => ({
      siteKey: k.site_key,
      secretKey: k.secret,
    }));
  },
  ["api-keys"],
  { tags: ["api-keys"] },
);

export async function generateApiKey(appId: string) {
  await fetch(`http://localhost:8080/api/console/${appId}/api-key`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${(await getAccessToken()).accessToken}`,
    },
  });

  revalidateTag("api-keys");
}

export async function revokeApiKey(appId: string, siteKey: string) {
  await fetch(`http://localhost:8080/api/console/${appId}/api-key/${siteKey}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${(await getAccessToken()).accessToken}`,
    },
  });

  revalidateTag("api-keys");
}
