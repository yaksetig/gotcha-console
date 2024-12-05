import NavList from "./NavList";
import NavItem from "./NavItem";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg flex-shrink-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800">Your App</h1>
      </div>
      <NavList>
        <NavItem href="/console">
          <span className="mr-3">🏠</span>
          Console
        </NavItem>
        <NavItem href="/api-keys">
          <span className="mr-3">🔐</span>
          API Keys
        </NavItem>
      </NavList>
    </aside>
  );
}
