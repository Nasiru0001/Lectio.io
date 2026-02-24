"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

export default function FacultiesPage() {
  const [faculties, setFaculties] = useState<any[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetchFaculties();
    async function fetchFaculties() {
      const { data, error } = await supabase.from("faculties").select("*");
      if (!error) {
        fetchFaculties();
        setFaculties(data || []);
      }
    }
  }, []);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("faculties").delete().eq("id", id);

    if (error) {
      console.error("Delete error:", error);
    } else {
      // Refresh UI
      setFaculties((prev) => prev.filter((f) => f.id !== id));
    }
  };

  async function addFaculty(e: React.FormEvent) {
    e.preventDefault();

    if (!name) return alert("Faculty name required");

    const { error } = await supabase.from("faculties").insert([{ name }]);

    if (!error) {
      setName("");
    } else {
      console.log(error);
      alert("Error adding faculty");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Faculties</h1>

      {/* Add Form */}
      <form onSubmit={addFaculty} className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Faculty Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-64"
        />
        <button className="bg-blue-600 text-white px-4 rounded">
          Add Faculty
        </button>
      </form>

      {/* List */}
      <div className="space-y-2">
        {faculties.map((faculty) => (
          <div key={faculty.id} className="bg-black p-3 rounded shadow">
            {faculty.name}{" "}
            <button
              onClick={() => handleDelete(faculty.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
