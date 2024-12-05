import { ApplicationSelector } from "./ApplicationSelector";

export default function Topbar() {
  return (
    <header className="px-8 h-16 flex items-center justify-between border-b border-gray-100 flex-shrink-0">
      <div className="text-gray-600">
        <ApplicationSelector />
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-gray-900">
          Notifications
        </button>
        <button className="text-gray-600 hover:text-gray-900">Profile</button>
      </div>
    </header>
  );
}
