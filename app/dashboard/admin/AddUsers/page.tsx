"use client";
import { useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";

export default function AddUserForm({ onAdded }: { onAdded: () => void }) {
  const { user: loggedInUser } = useKindeAuth(); // your admin
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);

  const handleAddUser = async () => {
    if (!loggedInUser) return alert("You must be logged in to add users.");

    setLoading(true);

    try {
      const { data, error } = await supabase.from("users").insert({
        kinde_id: loggedInUser?.sub, // this is Kinde ID
        email,
        role,
      });

      console.log(data);

      if (error) console.error("Error adding user:", error);
      else onAdded();
    } finally {
      setEmail("");
      setRole("student");
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-50 rounded shadow space-y-2">
      <input
        type="email"
        placeholder="User Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border px-2 py-1 rounded w-full"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border px-2 py-1 rounded w-full"
      >
        <option value="student">Student</option>
        <option value="lecturer">Lecturer</option>
        <option value="admin">Admin</option>
      </select>
      <button
        onClick={handleAddUser}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-1 rounded"
      >
        Add User
      </button>
    </div>
  );
}
