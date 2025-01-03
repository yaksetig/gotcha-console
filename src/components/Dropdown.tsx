"use client";

import { useState, useRef, useEffect, PropsWithChildren } from "react";

type DropdownProps = PropsWithChildren<{
  label?: string;
  value?: string;
  className?: string;
}>;

export function Dropdown({
  children,
  label,
  value = "",
  className = "",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`relative flex items-center gap-2 ${className}`}
    >
      {label && <label className="sr-only">{label}</label>}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="appearance-none bg-transparent border border-gray-300 rounded-md py-1.5 pl-3 pr-8 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-44 text-left"
      >
        {value || "Select option"}
      </button>

      <svg
        className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>

      {isOpen && (
        <ol className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {children}
        </ol>
      )}
    </div>
  );
}

type DropdownOptionProps = PropsWithChildren<{
  value: string;
  className?: string;
}>;

export function DropdownOption({
  children,
  className = "",
}: DropdownOptionProps) {
  return (
    <li
      className={`block overflow-x-hidden text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer ${className}`}
    >
      {children}
    </li>
  );
}
