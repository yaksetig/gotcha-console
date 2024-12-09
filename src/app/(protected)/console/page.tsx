import { createApplication, getApplications } from "@/lib/server/console";

export default async function ConsolePage() {
  const apps = await getApplications();

  return (
    <>
      <h1>Console</h1>
      <ul>
        {apps.map((app) => (
          <li>{app.name}</li>
        ))}
      </ul>
      <form action={createApplication}>
        <input type="submit" value="New application" />
      </form>
    </>
  );
}
