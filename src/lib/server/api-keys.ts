"use server";

import { ApiKey } from "@/types";
import { revalidatePath } from "next/cache";

let apiKeysStore: ApiKey[] = [
  {
    id: 1,
    siteKey: "site_key_123456789",
    secretKey: "secret_key_987654321",
  },
];

export async function getApiKeys() {
  return apiKeysStore;
}

export async function generateApiKey() {
  const newKey: ApiKey = {
    id: Date.now(),
    siteKey: `site_key_${Math.random().toString(36).substr(2, 9)}`,
    secretKey: `secret_key_${Math.random().toString(36).substr(2, 9)}`,
  };

  apiKeysStore = [...apiKeysStore, newKey];

  revalidatePath("/api-keys");
}

export async function revokeApiKey(siteKey: string) {
  apiKeysStore = apiKeysStore.filter((k) => k.siteKey !== siteKey);

  revalidatePath("/api-keys");
}
