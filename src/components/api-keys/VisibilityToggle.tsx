import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

type VisibilityToggleProps = {
  show: boolean;
  onToggle: () => void;
};

export default function VisibilityToggle({
  show,
  onToggle,
}: VisibilityToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="text-gray-500 hover:text-gray-700"
      title={show ? "Hide secret" : "Show secret"}
    >
      {show ? (
        <EyeSlashIcon className="h-5 w-5" />
      ) : (
        <EyeIcon className="h-5 w-5" />
      )}
    </button>
  );
}
