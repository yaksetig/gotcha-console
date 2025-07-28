import ApiKeyCard from "@/components/api-keys/ApiKeyCard";
import {
  generateApiKey,
  getApiKeys,
  updateApiKey,
} from "@/lib/server/api-keys";
import { getAccessToken } from "@auth0/nextjs-auth0";

export const dynamic = "force-dynamic";

export default async function ApiKeysPage({
  params,
}: {
  params: { appId: string };
}) {
  const accessToken = (await getAccessToken()).accessToken!!;
  const apiKeys = await getApiKeys(accessToken, params.appId);

  async function handleGenKey() {
    "use server";
    return await generateApiKey(params.appId);
  }

  async function handleEditKey(siteKey: string, label: string) {
    "use server";
    return await updateApiKey(params.appId, siteKey, { name: label });
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">API Keys</h2>
        <form action={handleGenKey}>
          <input
            type="submit"
            value="Generate New API Key"
            className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-md"
          />
        </form>
      </div>

      <div className="space-y-4">
        {apiKeys.length === 0 ? (
          <p className="text-gray-600">No API keys yet.</p>
        ) : (
          apiKeys.map((key) => (
            <ApiKeyCard
              key={key.siteKey}
              apiKey={key}
              onEdit={async (l) => {
                "use server";
                await handleEditKey(key.siteKey, l);
              }}
            />
          ))
        )}
      </div>
    </>
  );
}
