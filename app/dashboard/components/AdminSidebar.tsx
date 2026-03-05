"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

interface Props {
  children: ReactNode;
}

export default function SidebarLayout({ children }: Props) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-(--sidebar-bg) text-white p-4 flex flex-col">
        {/* <h2 className="text-xl font-bold mb-6">LECTIO.IO</h2> */}

        <nav className="flex flex-col space-y-2">
          <h4 className="text-gray-400">MAIN MENU</h4>
          <Link
            href="/dashboard/admin"
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
            <span className="text-white mt-1">Dashboard</span>
          </Link>
          <Link
            href="/dashboard/admin/faculties"
            className="hover:bg-gray-700 p-2 flex items-center gap-2 text-white rounded"
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
              className="lucide lucide-landmark-icon lucide-landmark"
            >
              <path d="M10 18v-7" />
              <path d="M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z" />
              <path d="M14 18v-7" />
              <path d="M18 18v-7" />
              <path d="M3 22h18" />
              <path d="M6 18v-7" />
            </svg>
            <span className="text-white mt-1">Faculties</span>
          </Link>

          <Link
            href="/dashboard/admin/departments"
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
              className="lucide lucide-building2-icon lucide-building-2 text-white"
            >
              <path d="M10 12h4" />
              <path d="M10 8h4" />
              <path d="M14 21v-3a2 2 0 0 0-4 0v3" />
              <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
              <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
            </svg>
            <span className="text-white mt-1">Departments</span>
          </Link>

          <Link
            href="/dashboard/admin/lecturers"
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
              className="lucide lucide-square-user-round-icon lucide-square-user-round"
            >
              <path d="M18 21a6 6 0 0 0-12 0" />
              <circle cx="12" cy="11" r="4" />
              <rect width="18" height="18" x="3" y="3" rx="2" />
            </svg>
            <span className="text-white mt-1">Lecturers </span>
          </Link>

          <Link
            href="/dashboard/admin/students"
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
              className="lucide lucide-users-icon lucide-users"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <path d="M16 3.128a4 4 0 0 1 0 7.744" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <circle cx="9" cy="7" r="4" />
            </svg>
            <span className="text-white mt-1">Students</span>
          </Link>

          <Link
            href="/dashboard/admin/courses"
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
            <span className="text-white mt-1">Courses</span>
          </Link>

          <h4 className="my-4 text-gray-400">ANALYTICS</h4>

          <Link
            href="/dashboard/admin/EnrollmentAnalytics"
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
              className="lucide lucide-clipboard-list-icon lucide-clipboard-list"
            >
              <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <path d="M12 11h4" />
              <path d="M12 16h4" />
              <path d="M8 11h.01" />
              <path d="M8 16h.01" />
            </svg>
            <span className="text-white mt-1">Enrollment Analytics</span>
          </Link>

          <Link
            href="/dashboard/admin/performance"
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
              className="lucide lucide-trending-up-icon lucide-trending-up"
            >
              <path d="M16 7h6v6" />
              <path d="m22 7-8.5 8.5-5-5L2 17" />
            </svg>{" "}
            <span className="text-white mt-1">Performance Analytics</span>
          </Link>

          <Link
            href="/dashboard/admin/workload"
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
              className="lucide lucide-clipboard-clock-icon lucide-clipboard-clock"
            >
              <path d="M16 14v2.2l1.6 1" />
              <path d="M16 4h2a2 2 0 0 1 2 2v.832" />
              <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2" />
              <circle cx="16" cy="16" r="6" />
              <rect x="8" y="2" width="8" height="4" rx="1" />
            </svg>
            <span className="text-white mt-1">Lecturer Workload</span>
          </Link>

          <h4 className="text-gray-400 my-4 ">MANAGEMNET</h4>

          <Link
            href="/dashboard/admin/ManageUsersandAdmins"
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
              className="lucide lucide-user-round-cog-icon lucide-user-round-cog"
            >
              <path d="m14.305 19.53.923-.382" />
              <path d="m15.228 16.852-.923-.383" />
              <path d="m16.852 15.228-.383-.923" />
              <path d="m16.852 20.772-.383.924" />
              <path d="m19.148 15.228.383-.923" />
              <path d="m19.53 21.696-.382-.924" />
              <path d="M2 21a8 8 0 0 1 10.434-7.62" />
              <path d="m20.772 16.852.924-.383" />
              <path d="m20.772 19.148.924.383" />
              <circle cx="10" cy="8" r="5" />
              <circle cx="18" cy="18" r="3" />
            </svg>{" "}
            <span className="text-white mt-1">Manage Users</span>
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
