"use client";

import { FormEvent } from "react";
import EditableLabel from "../EditableLabel";
import Link from "next/link";
import { deleteApplication, updateApplication } from "@/lib/server/console";
import { Application } from "@/lib/server/types";

type ApplicationCardProps = {
  app: Application;
};

export default function ApplicationCard({ app }: ApplicationCardProps) {

  return (
    <div className="border border-gray-700 rounded-xl shadow bg-background transition-shadow hover:shadow-md">
      <div className="px-6 py-4 flex items-center justify-between">
        <EditableLabel
          value={app.name ?? "New Application"}
          onEdit={async (newName) =>
            await updateApplication(app.id, { name: newName })
          }
          showEditIcon
        />
        <div className="flex-grow"></div>
      </div>
      <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex items-center justify-between">
        <Link
          href={`/console/${app.id}/api-keys`}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Manage API Keys
        </Link>
        <form
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            if (!confirm("Are you sure you want to delete this application?")) {
              e.preventDefault();
            }
          }}
          action={deleteApplication.bind(null, app.id)}
        >
          <input type="hidden" name="id" value={app.id} />
          <button
            type="submit"
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Delete Application
          </button>
        </form>
      </div>
    </div>
  );
}
