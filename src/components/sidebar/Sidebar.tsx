import NavList from "./NavList";
import NavItem from "./NavItem";

type SidebarProps = {
  appId?: string;
};

export default function Sidebar({ appId }: SidebarProps) {
  return (
    <aside className="w-64 bg-white shadow-lg flex-shrink-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">Gotcha console</h1>
      </div>
      <NavList>
        <NavItem href={`/console/${appId ?? ""}`}>
          <span className="mr-3">🏠</span>
          Console
        </NavItem>
        <NavItem href={`/console/${appId ?? ""}/api-keys`}>
          <span className="mr-3">🔐</span>
          API Keys
        </NavItem>
      </NavList>
    </aside>
  );
}
