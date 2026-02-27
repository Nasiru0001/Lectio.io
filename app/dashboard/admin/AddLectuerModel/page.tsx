"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase";

export default function AddLecturerModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [departments, setDepartments] = useState<any[]>([]);
  const [email, setEmail] = useState("");
  const [departmentId, setDepartmentId] = useState("");

  useEffect(() => {
    async function fetchDepartments() {
      const { data } = await supabase.from("departments").select("id, name");

      setDepartments(data || []);
    }

    fetchDepartments();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("lecturers").insert([
      {
        full_name: name,
        email,
        department_id: departmentId,
      },
    ]);

    if (error) {
      console.error("Error adding lecturer:", error);
    }

    setOpen(false);
    // window.location.reload(); // simple refresh for now
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-black text-white px-4 py-2 rounded-lg"
      >
        + Add Lecturer
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-yellow-500 p-6 rounded-xl w-96">
            <h2 className="text-lg font-bold mb-4">Add New Lecturer</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <select
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                className="w-full border p-2 rounded"
                required
              >
                <option value="">Select Department</option>

                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Lecturer Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-2 rounded"
                required
              />

              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-2 rounded"
                required
              />

              <input
                type="text"
                placeholder="Department ID"
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                className="w-full border p-2 rounded"
                required
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-3 py-1 border rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-black text-white px-3 py-1 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
