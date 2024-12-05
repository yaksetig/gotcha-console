import { Children } from "react";
import { PropsWithChildren } from "react";

export type NavListProps = PropsWithChildren<{}>;

export default function NavList({ children }: NavListProps) {
  return (
    <nav className="mt-6">
      <ul className="space-y-2">
        {Children.map(children, (c) => (
          <li>{c}</li>
        ))}
      </ul>
    </nav>
  );
}
