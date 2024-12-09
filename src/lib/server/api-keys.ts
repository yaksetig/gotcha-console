"use server";

import { revalidateTag, unstable_cache } from "next/cache";
import { ApiKey } from "./types";

let apiKeysStore: ApiKey[] = [
  {
    id: 1,
    siteKey: "site_key_123456789",
    secretKey: "secret_key_987654321",
  },
];

export const getApiKeys = unstable_cache(
  async () => {
    return apiKeysStore;
  },
  ["api-keys"],
  { tags: ["api-keys"] },
);

export async function generateApiKey() {
  const newKey: ApiKey = {
    id: Date.now(),
    siteKey: `site_key_${Math.random().toString(36).substr(2, 9)}`,
    secretKey: `secret_key_${Math.random().toString(36).substr(2, 9)}`,
  };
  apiKeysStore = [...apiKeysStore, newKey];

  revalidateTag("api-keys");
}

export async function revokeApiKey(siteKey: string) {
  apiKeysStore = apiKeysStore.filter((k) => k.siteKey !== siteKey);

  revalidateTag("api-keys");
}
