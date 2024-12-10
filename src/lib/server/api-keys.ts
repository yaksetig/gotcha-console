"use server";

import { revalidateTag, unstable_cache } from "next/cache";
import { ApiKey } from "./types";
import { getApiKeysByApp } from "./store";

export const getApiKeys = unstable_cache(
  async (appId: string) => {
    return getApiKeysByApp(appId);
  },
  ["api-keys"],
  { tags: ["api-keys"] },
);

export async function generateApiKey(appId: string) {
  const newKey: ApiKey = {
    id: Date.now().toString(),
    siteKey: `site_key_${Math.random().toString(36).substring(2, 9)}`,
    secretKey: `secret_key_${Math.random().toString(36).substring(2, 9)}`,
  };
  const apiKeysStore = getApiKeysByApp(appId);
  apiKeysStore?.push(newKey);

  revalidateTag("api-keys");
}

export async function revokeApiKey(appId: string, keyId: string) {
  const apiKeysStore = getApiKeysByApp(appId);
  if (!apiKeysStore) return;

  const idx = apiKeysStore.findIndex((k) => k.id === keyId);
  if (idx > -1) {
    apiKeysStore.splice(idx, 1);
  }

  revalidateTag("api-keys");
}
