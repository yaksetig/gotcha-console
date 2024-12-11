import Link from "next/link";
import { Dropdown, DropdownOption } from "@/components/Dropdown";
import { getApplications } from "@/lib/server/console";

type ApplicationSelectorProps = {
  appId: string;
};

export async function ApplicationSelector({ appId }: ApplicationSelectorProps) {
  const appsList = await getApplications();
  const value = appsList.find((app) => app.id === appId)?.name;

  return (
    <Dropdown value={value} label="Select Application">
      {appsList.map((app) => (
        <DropdownOption key={app.id} value={app.id}>
          <Link href={`/console/${app.id}`} className="block w-full h-full">
            {app.name}
          </Link>
        </DropdownOption>
      ))}
    </Dropdown>
  );
}
