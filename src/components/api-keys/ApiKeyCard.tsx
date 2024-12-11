"use client";

import { XCircleIcon } from "@heroicons/react/24/outline";
import KeyField from "./KeyField";
import EditableLabel from "../EditableLabel";
import { useState } from "react";
import { revokeApiKey } from "@/lib/server/api-keys";
import { ApiKey } from "@/lib/server/types";
import { useParams } from "next/navigation";

type ApiKeyCardProps = {
  apiKey: ApiKey;
};

export default function ApiKeyCard({ apiKey }: ApiKeyCardProps) {
  const [label, setLabel] = useState("New API key");
  const appId = useParams().appId as string;

  async function revokeKey() {
    await revokeApiKey(appId, apiKey.id);
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow border">
      <div className="flex justify-between items-center mb-4">
        <EditableLabel value={label} onEdit={async (l) => setLabel(l)} />
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
