"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

interface Props {
  children: ReactNode;
}

export default function LecturerSidebar({ children }: Props) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col">
        {/* <h2 className="text-xl font-bold mb-6">LECTIO.IO</h2> */}

        <nav className="flex flex-col space-y-2">
          <Link
            href="/dashboard/lecturer"
            className="hover:bg-gray-700 p-2 rounded"
          >
            Dashboard
          </Link>

          <Link
            href="/dashboard/lecturer/courses"
            className="hover:bg-gray-700 p-2 rounded"
          >
            My courses
          </Link>

          <Link
            href="/dashboard/lecturer/students"
            className="hover:bg-gray-700 p-2 rounded"
          >
            My Students
          </Link>

          <Link
            href="/dashboard/lecturer/results"
            className="hover:bg-gray-700 p-2 rounded"
          >
            My Results
          </Link>

          <LogoutLink>
            <button className="hover:bg-gray-700 p-2 rounded w-full text-left">
              Logout
            </button>
          </LogoutLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-black p-6 overflow-auto">{children}</main>
    </div>
  );
}
