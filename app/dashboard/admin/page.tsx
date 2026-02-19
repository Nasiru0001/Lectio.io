"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase";

export default function AdminPage() {
  const [faculties, setFaculties] = useState<any[]>([]);
  const [departmentName, setDepartmentName] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchFaculties() {
      const { data } = await supabase.from("faculties").select("*");

      setFaculties(data || []);
    }
    fetchFaculties();
  }, []);

  async function addDepartment() {
    const { error } = await supabase.from("departments").insert([
      {
        name: departmentName,
        faculty_id: selectedFaculty,
      },
    ]);

    if (error) {
      console.log(error);
      alert("Error adding department");
    } else {
      setMessage("Department added successfully");
      setDepartmentName("");
    }
  }

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-xl font-bold">Add Department</h2>

      <input
        type="text"
        placeholder="Department Name"
        value={departmentName}
        onChange={(e) => setDepartmentName(e.target.value)}
        className="border p-2 rounded w-full"
      />

      <select
        value={selectedFaculty}
        onChange={(e) => setSelectedFaculty(e.target.value)}
        className="border p-2 rounded w-full"
      >
        <option className="bg-black" value="">
          Select Faculty
        </option>
        {faculties.map((faculty) => (
          <option className="bg-black" key={faculty.id} value={faculty.id}>
            {faculty.name}
          </option>
        ))}
      </select>

      <button
        onClick={addDepartment}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Add Department
      </button>

      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}

// "use client";
// import { useState } from "react";
// import { supabase } from "@/app/lib/supabase";

// export default function AdminPage() {
//   const [name, setName] = useState("");
//   const [faculty, setFaculty] = useState("");
//   const [message, setMessage] = useState("");

//   async function addDepartment() {
//     const { data, error } = await supabase
//       .from("departments")
//       .insert([{ name, faculty }]);
//     if (error) setMessage("Error: " + error.message);
//     else setMessage("Department  added successfully");
//   }

//   return (
//     <div className="p-8 max-w-lg mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Add Department</h1>
//       <input
//         type="text"
//         placeholder="Department Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         className="border p-2 rounded w-full mb-2"
//       />
//       <input
//         type="text"
//         placeholder="Faculty"
//         value={faculty}
//         onChange={(e) => setFaculty(e.target.value)}
//         className="border p-2 rounded w-full mb-2"
//       />
//       <button
//         onClick={addDepartment}
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Add Department
//       </button>
//       {message && <p className="mt-2">{message}</p>}
//     </div>
//   );
// }
