"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

interface Props {
  children: ReactNode;
}

export default function StudentSidebar({ children }: Props) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col">
        {/* <h2 className="text-xl font-bold mb-6">LECTIO.IO</h2> */}

        <nav className="flex flex-col space-y-2">
          <Link
            href="/dashboard/students"
            className="hover:bg-gray-700 flex items-center gap-2 hover:text-blue-700 p-2 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-layout-dashboard-icon lucide-layout-dashboard"
            >
              <rect width="7" height="9" x="3" y="3" rx="1" />
              <rect width="7" height="5" x="14" y="3" rx="1" />
              <rect width="7" height="9" x="14" y="12" rx="1" />
              <rect width="7" height="5" x="3" y="16" rx="1" />
            </svg>
            <span className="text-white ">Overview</span>
          </Link>

          <Link
            href="/dashboard/students/courses"
            className="hover:bg-gray-700 p-2 rounded flex justify-start items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-book-open-text-icon lucide-book-open-text"
            >
              <path d="M12 7v14" />
              <path d="M16 12h2" />
              <path d="M16 8h2" />
              <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
              <path d="M6 12h2" />
              <path d="M6 8h2" />
            </svg>
            <span className="text-white ">Courses</span>
          </Link>

          <Link
            href="/dashboard/students/results"
            className="hover:bg-gray-700 p-2 rounded"
          >
            Results
          </Link>

          <LogoutLink>
            <button className="hover:bg-gray-700 p-2 rounded w-full text-left flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-log-out-icon lucide-log-out"
              >
                <path d="m16 17 5-5-5-5" />
                <path d="M21 12H9" />
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              </svg>
              <span className="text-white mt-1 ml-2">Logout</span>
            </button>
          </LogoutLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-black p-6 overflow-auto">{children}</main>
    </div>
  );
}
