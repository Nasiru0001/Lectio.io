"use client";
import { supabase } from "@/app/lib/supabase";
import AddLecturerModal from "../AddLectuerModel/page";
import { useEffect, useState } from "react";
import { Trash, SquarePen, Search, SlidersHorizontal, X } from "lucide-react";

export default function LecturersPage() {
  const [lecturers, setLecturers] = useState<any[]>([]);

  // --- Filter State ---
  const [searchInput, setSearchInput] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchLecturers();
    async function fetchLecturers() {
      const { data: lecturers, error } = await supabase.from("lecturers")
        .select(`
          id,
          full_name,
          email,
          departments (
            name,
            faculties ( name )
          ),
          courses ( id )
        `);
      if (lecturers) setLecturers(lecturers);
      else console.log("error for LecturersPage:", error);
    }
  }, []);

  // --- Derived Stats ---
  const totalLecturers = lecturers?.length || 0;
  const totalAssignedCourses =
    lecturers?.reduce((acc, lec) => acc + (lec.courses?.length || 0), 0) || 0;
  const unassignedLecturers =
    lecturers?.filter((lec) => (lec.courses?.length || 0) === 0).length || 0;

  // --- Unique departments for filter dropdown ---
  const departments = [
    ...new Set(lecturers.map((l) => l.departments?.name).filter(Boolean)),
  ] as string[];

  // --- Filtering Logic (runs on Search button click) ---
  const filtered = lecturers.filter((lec) => {
    const matchesSearch =
      appliedSearch === "" ||
      lec.full_name?.toLowerCase().includes(appliedSearch.toLowerCase()) ||
      lec.email?.toLowerCase().includes(appliedSearch.toLowerCase());

    const matchesDept =
      departmentFilter === "" || lec.departments?.name === departmentFilter;

    return matchesSearch && matchesDept;
  });

  const handleSearch = () => {
    setAppliedSearch(searchInput);
  };

  const handleClear = () => {
    setSearchInput("");
    setAppliedSearch("");
    setDepartmentFilter("");
  };

  const activeFilters = [appliedSearch, departmentFilter].filter(
    Boolean,
  ).length;

  async function handleDelete(lecturerId: number) {
    const { data } = await supabase
      .from("lecturers")
      .delete()
      .eq("id", lecturerId);
    console.log("Delete response:", data);
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-row border w-[19%] p-1 rounded-xl  ">
        {/* Search input */}
        <div className="relative  ">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full pl-2 pr-4 py-2 text-sm rounded-lg border-none outline-none"
          />
        </div>

        {/* Search button */}
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-2 py-2 rounded-lg text-sm hover:bg-blue-700 transition flex items-center gap-2 cursor-pointer"
        >
          <Search size={16} className="text-white" />
        </button>

        {/* Clear button — only shows when filters are active */}
        {activeFilters > 0 && (
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 px-3 py-2 rounded-lg hover:bg-red-50 transition"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Lecturers</h1>
          <p className="text-gray-500">
            Manage academic staff across departments
          </p>
        </div>

        <div className="flex items-center gap-2">
          <AddLecturerModal />

          {/* Toggle filters button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm border transition ${
              showFilters || activeFilters > 0
                ? "border-blue-500 text-blue-600 bg-blue-50"
                : "border-gray-200 text-white hover:bg-gray-50 hover:text-black cursor-pointer "
            }`}
          >
            <SlidersHorizontal size={15} />
            Filters
            {activeFilters > 0 && (
              <span className="bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {activeFilters}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Expandable filter row */}
      {showFilters && (
        <div className="flex justify-end gap-3 border-gray-100">
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-600"
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl px-6 py-10">
          <p className="text-black text-sm">Total Lecturers</p>
          <h2 className="text-3xl text-black font-bold mt-2">
            {totalLecturers}
          </h2>
        </div>
        <div className="bg-white shadow rounded-xl px-6 py-10">
          <p className="text-black text-sm">Assigned Courses</p>
          <h2 className="text-3xl text-black font-bold mt-2">
            {totalAssignedCourses}
          </h2>
        </div>
        <div className="bg-white shadow rounded-xl px-6 py-10">
          <p className="text-black text-sm">Unassigned Lecturers</p>
          <h2 className="text-3xl text-black font-bold mt-2">
            {unassignedLecturers}
          </h2>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className=" shadow rounded-xl p-4 space-y-3">
        {/* Top row — search + buttons */}

        {/* Results count */}
        <p className="text-xs text-gray-400">
          Showing <strong>{filtered.length}</strong> of{" "}
          <strong>{totalLecturers}</strong> lecturers
        </p>
      </div>

      {/* Table */}
      <div className="bg-black shadow rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-blue-300 text-white border-black">
            <tr className="text-left">
              <th className="p-4">Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Faculty</th>
              <th>Courses</th>
              <th className="text-right pr-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-400">
                  No lecturers match your search
                </td>
              </tr>
            ) : (
              filtered.map((lec) => (
                <tr
                  key={lec.id}
                  className="border-t hover:bg-gray-400 hover:cursor-pointer transition duration-200"
                >
                  <td className="p-4 font-medium">{lec.full_name}</td>
                  <td>{lec.email}</td>
                  <td>{lec.departments?.name || "—"}</td>
                  <td>{lec.departments?.faculties?.name || "—"}</td>
                  <td>{lec.courses?.length || 0}</td>
                  <td className="text-right pr-6 space-x-3">
                    <button className="text-yellow-600 hover:underline">
                      <SquarePen className="w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(lec.id)}
                      className="text-red-600 hover:underline"
                    >
                      <Trash className="w-5" />
                    </button>
                    <button className="text-blue-600 hover:underline">
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
