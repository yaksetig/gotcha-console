import ApiKeyCard from "@/components/api-keys/ApiKeyCard";
import { generateApiKey, getApiKeys } from "@/lib/server/api-keys";

export const dynamic = "force-dynamic";

export default async function ApiKeysPage({
  params,
}: {
  params: { appId: string };
}) {
  const apiKeys = await getApiKeys(params.appId);

  async function handleGenKey() {
    "use server";
    return await generateApiKey(params.appId);
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
        {apiKeys?.map((key) => <ApiKeyCard key={key.id} apiKey={key} />)}
      </div>
    </>
  );
}
