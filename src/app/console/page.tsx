import { getApplications } from "@/lib/server/console";
import { redirect } from "next/navigation";

export default async function WelcomeConsolePage() {
  const appsList = await getApplications();
  if (appsList.length > 0) {
    redirect(`/console/${appsList[0].id}`);
  }

  return (
    <>
      <h1>Welcome!</h1>
    </>
  );
}
