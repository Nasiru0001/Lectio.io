import { supabase } from "@/app/lib/supabase";
import AddLecturerModal from "../AddLectuerModel/page";
export default async function LecturersPage() {
  const { data: lecturers, error } = await supabase.from("lecturers").select(`
      id,
      full_name,
      email,
      departments (
        name,
        faculties (
          name
        )
      ),
      courses ( id )
    `);

  console.log("error for LecturersPage:", error);

  const totalLecturers = lecturers?.length || 0;

  const totalAssignedCourses =
    lecturers?.reduce((acc, lec) => acc + (lec.courses?.length || 0), 0) || 0;

  const unassignedLecturers =
    lecturers?.filter((lec) => (lec.courses?.length || 0) === 0).length || 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Lecturers</h1>
          <p className="text-gray-500">
            Manage academic staff across departments
          </p>
        </div>
        <AddLecturerModal />
      </div>

      {/* Lectures Grid */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-black text-sm">Total Lecturers</p>
          <h2 className="text-3xl text-black font-bold mt-2">
            {totalLecturers}
          </h2>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-black text-sm">Assigned Courses</p>
          <h2 className="text-3xl text-black font-bold mt-2">
            {totalAssignedCourses}
          </h2>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <p className="text-black text-sm">Unassigned Lecturers</p>
          <h2 className="text-3xl text-black font-bold mt-2">
            {unassignedLecturers}
          </h2>
        </div>
      </div>

      <div className="bg-black shadow rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-black text-white">
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
            {lecturers?.map((lec) => (
              <tr key={lec.id} className="border-t">
                <td className="p-4 font-medium">{lec.full_name}</td>

                <td>{lec.email}</td>

                <td>{lec.departments?.name || "—"}</td>

                <td>{lec.departments?.faculties?.name || "—"}</td>

                <td>{lec.courses?.length || 0}</td>

                <td className="text-right pr-6 space-x-3">
                  <button className="text-blue-600 hover:underline">
                    View
                  </button>
                  <button className="text-yellow-600 hover:underline">
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
