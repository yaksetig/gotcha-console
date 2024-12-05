"use client";

import { useState } from "react";
import { ApiKey } from "@/types";
import ApiKeyCard from "@/components/api-keys/ApiKeyCard";

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: 1,
      label: "New API key",
      siteKey: "site_key_123456789",
      secretKey: "secret_key_987654321",
      showSecret: false,
    },
  ]);

  const generateNewApiKey = () => {
    // In a real application, you would call your API to generate keys
    const newKey: ApiKey = {
      id: Date.now(),
      label: "New API key",
      siteKey: `site_key_${Math.random().toString(36).substr(2, 9)}`,
      secretKey: `secret_key_${Math.random().toString(36).substr(2, 9)}`,
      showSecret: false,
    };
    setApiKeys([...apiKeys, newKey]);
  };

  const toggleSecretVisibility = (id: number) => {
    setApiKeys(
      apiKeys.map((key) =>
        key.id === id ? { ...key, showSecret: !key.showSecret } : key,
      ),
    );
  };

  const revokeKey = (id: number) => {
    // In a real application, you would call your API to revoke the key
    setApiKeys(apiKeys.filter((key) => key.id !== id));
  };

  const updateLabel = async (id: number, newLabel: string) => {
    // Optimistically update the UI
    setApiKeys(
      apiKeys.map((key) => (key.id === id ? { ...key, label: newLabel } : key)),
    );

    try {
      // In a real application, make the API call here
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call

      // If the API call is successful, the UI is already updated
      // If you need to update with data from the server, do it here
    } catch (error) {
      // If the API call fails, revert the change
      setApiKeys(apiKeys.map((key) => (key.id === id ? { ...key } : key)));
      throw error;
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">API Keys</h2>
        <button
          onClick={generateNewApiKey}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Generate New API Key
        </button>
      </div>

      <div className="space-y-4">
        {apiKeys.map((key) => (
          <ApiKeyCard
            key={key.id}
            apiKey={key}
            onRevoke={revokeKey}
            onToggleSecret={toggleSecretVisibility}
            onUpdateLabel={updateLabel}
          />
        ))}
      </div>
    </>
  );
}
