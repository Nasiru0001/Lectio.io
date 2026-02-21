"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function SidebarLayout({ children }: Props) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>

        <nav className="flex flex-col space-y-2">
          <Link
            href="/dashboard/admin"
            className="hover:bg-gray-700 p-2 rounded"
          >
            Overview
          </Link>
          <Link
            href="/dashboard/admin/faculties"
            className="hover:bg-gray-700 p-2 rounded"
          >
            Faculties
          </Link>
          <Link
            href="/dashboard/admin/departments"
            className="hover:bg-gray-700 p-2 rounded"
          >
            Departments
          </Link>
          <Link
            href="/dashboard/admin/students"
            className="hover:bg-gray-700 p-2 rounded"
          >
            Students
          </Link>
          <Link
            href="/dashboard/admin/courses"
            className="hover:bg-gray-700 p-2 rounded"
          >
            Courses
          </Link>
          <Link
            href="/dashboard/admin/lecturers"
            className="hover:bg-gray-700 p-2 rounded"
          >
            Lecturers
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-black p-6 overflow-auto">{children}</main>
    </div>
  );
}
