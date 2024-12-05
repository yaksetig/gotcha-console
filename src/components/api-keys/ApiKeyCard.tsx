import { XCircleIcon } from "@heroicons/react/24/outline";
import { ApiKey } from "../../types";
import KeyField from "./KeyField";
import EditableLabel from "./EditableLabel";

type ApiKeyCardProps = {
  apiKey: ApiKey;
  onRevoke: (id: number) => void;
  onToggleSecret: (id: number) => void;
  onUpdateLabel: (id: number, newLabel: string) => Promise<void>;
};

export default function ApiKeyCard({
  apiKey,
  onRevoke,
  onToggleSecret,
  onUpdateLabel,
}: ApiKeyCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow border">
      <div className="flex justify-between items-center mb-4">
        <EditableLabel
          value={apiKey.label}
          onSubmit={async (newLabel) =>
            await onUpdateLabel(apiKey.id, newLabel)
          }
        />
        <button
          onClick={() => onRevoke(apiKey.id)}
          className="text-red-500 hover:text-red-600 flex items-center"
        >
          <XCircleIcon className="h-5 w-5 mr-1" />
          Revoke
        </button>
      </div>

      <div className="space-y-3">
        <KeyField label="Site Key" value={apiKey.siteKey} />
        <KeyField
          label="Secret Key"
          value={apiKey.secretKey}
          isSecret
          showSecret={apiKey.showSecret}
          onToggleVisibility={() => onToggleSecret(apiKey.id)}
        />
      </div>
    </div>
  );
}
