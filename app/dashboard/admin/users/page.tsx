"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchUsers();
    async function fetchUsers() {
      const { data, error } = await supabase
        .from("users")
        .select("id, email, role, department_id");

      if (error) console.log(error);
      else setUsers(data || []);
    }
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Users</h1>

      <table className="w-full table-auto bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Department</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b">
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.role}</td>
              <td className="p-2">{u.department_id || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
