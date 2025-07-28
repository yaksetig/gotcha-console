"use client";

import { XCircleIcon } from "@heroicons/react/24/outline";
import KeyField from "./KeyField";
import EditableLabel from "../EditableLabel";
import { revokeApiKey } from "@/lib/server/api-keys";
import { ApiKey } from "@/lib/server/types";
import { useParams } from "next/navigation";

type ApiKeyCardProps = {
  apiKey: ApiKey;
  onEdit?: (label: string) => Promise<void>;
};

export default function ApiKeyCard({ apiKey, onEdit }: ApiKeyCardProps) {
  const appId = useParams().appId as string;

  async function revokeKey() {
    await revokeApiKey(appId, apiKey.siteKey);
  }

  return (
    <div className="bg-background p-4 rounded-lg shadow border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <EditableLabel
          value={apiKey.label ?? "New API key"}
          onEdit={async (l) => onEdit?.(l)}
        />
        <button
          onClick={revokeKey}
          className="text-red-500 hover:text-red-600 flex items-center"
        >
          <XCircleIcon className="h-5 w-5 mr-1" />
          Revoke
        </button>
      </div>

      <div className="space-y-3">
        <KeyField label="Site Key" value={apiKey.siteKey} />
        <KeyField label="Secret Key" value={apiKey.secretKey} isSecret />
      </div>
    </div>
  );
}
