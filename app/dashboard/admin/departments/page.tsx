"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<any[]>([]);
  const [faculties, setFaculties] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [facultyId, setFacultyId] = useState("");

  useEffect(() => {
    fetchDepartments();
    fetchFaculties();
    async function fetchDepartments() {
      const { data } = await supabase
        .from("departments")
        .select("*, faculties(name)");
      setDepartments(data || []);
    }

    async function fetchFaculties() {
      const { data } = await supabase.from("faculties").select("*");
      setFaculties(data || []);
    }
  }, []);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("departments").delete().eq("id", id);

    if (error) {
      console.log(`error deleting department ${error}`);
    } else {
      // Refresh UI
      setDepartments((prev) => prev.filter((d) => d.id !== id));
    }
  };

  async function addDepartment(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !facultyId) return alert("All fields required");

    const { error } = await supabase.from("departments").insert([
      {
        name,
        faculty_id: facultyId,
      },
    ]);

    if (!error) {
      setName("");
      setFacultyId("");
      // fetchDepartments();
    } else {
      console.log(error);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Departments</h1>

      {/* Add Form */}
      <form onSubmit={addDepartment} className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Department Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={facultyId}
          onChange={(e) => setFacultyId(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Faculty</option>
          {faculties.map((faculty) => (
            <option key={faculty.id} value={faculty.id}>
              {faculty.name}
            </option>
          ))}
        </select>

        <button className="bg-green-600 text-white px-4 rounded">Add</button>
      </form>

      {/* List */}
      <div className="space-y-2">
        {departments.map((dept) => (
          <div key={dept.id} className="bg-black p-3 rounded shadow">
            <strong>{dept.name}</strong>{" "}
            <button
              onClick={() => handleDelete(dept.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
            <p className="text-sm text-gray-600">
              Faculty: {dept.faculties?.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Imam getting an error. when i visit the site as a new users or existing user it directs me to kinde directly i don't want this i want to be able to sign up as a new user if i want to or not and if i have signed up mon aa device it should rememeber me
