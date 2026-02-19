import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { supabase } from "../lib/supabase";
import { useState, useEffect } from "react";

// const { getUser } = getKindeServerSession();
// const user = await getUser();

// console.log(user);

export default async function Dashboard() {
  async function getStudents() {
    const res = await fetch("http://localhost:3000/api/students");
    return res.json();
  }

  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const students = await getStudents();

  await supabase.from("users").upsert({
    kinde_id: user?.id,
    email: user?.email,
    role: "lecturer",
  });

  return (
    <div>
      <h1>Welcome to Dashboard {user?.given_name}</h1>

      <pre>
        <code>{JSON.stringify(user, null, 2)}</code>
      </pre>

      <h1>Total Students: {students.length}</h1>

      {students.map((student: any) => (
        <div key={student.id}>
          <h2>{student.name}</h2>
        </div>
      ))}
    </div>
  );
}
