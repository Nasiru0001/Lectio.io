// "use client";
// import { useEffect, useState } from "react";
// import { supabase } from "@/app/lib/supabase";

// interface Department {
//   id: string;
//   name: string;
//   faculty: string;
// }

// export default function Dashboard() {
//   const [departments, setDepartments] = useState<Department[]>([]);

//   useEffect(() => {
//     async function fetchDepartments() {
//       const { data, error } = await supabase.from("departments").select("*");

//       if (error) {
//         console.log("Error:", error);
//         return;
//       }

//       console.log("Data:", data);
//       setDepartments(data || []);
//     }
//     fetchDepartments();
//   }, []);

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">Departments</h1>
//       {departments.length === 0 && <p>No departments found</p>}
//       <ul className="space-y-2">
//         {departments.map((dept) => (
//           <li key={dept.id} className="p-4 text-white rounded shadow">
//             {dept.name} - {dept.faculty}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

export default function Dashboard() {
  const [faculties, setFaculties] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from("faculties").select(`
          id,
          name,
          departments (
            id,
            name
          )
        `);

      if (error) {
        console.log(error);
        return;
      }

      setFaculties(data || []);
    }
    fetchData();
  }, []);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Faculties & Departments</h1>

      {faculties.map((faculty) => (
        <div key={faculty.id} className="text-white shadow p-4 rounded">
          <h2 className="text-lg font-semibold text-blue-600">
            {faculty.name}
          </h2>

          <ul className="mt-2 list-disc ml-6">
            {faculty.departments?.map((dept: any) => (
              <li key={dept.id}>{dept.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
