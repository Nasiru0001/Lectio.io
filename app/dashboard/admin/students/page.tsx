"use client";
import { supabase } from "@/app/lib/supabase";
import React, { useEffect, useState } from "react";

const StudentsPage = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [studentId, setStudentId] = useState("");
  const [gender, setGender] = useState("");
  const [admissionYear, setAdmissionYear] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetchStudents();

    async function fetchStudents() {
      const { data, error } = await supabase.from("students").select("*");

      if (error) console.log(error);
      else setStudents(data || []);
    }
  }, []);

  async function addStudent(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase
      .from("students")
      .insert([
        {
          full_name: name,
          level: level,
          student_id: studentId,
          gender: gender,
          admission_year: admissionYear,
          status: status,
        },
      ])
      .select();

    if (!error) {
      setName("");
      setLevel("");
      setStudentId("");
      setGender("");
      setAdmissionYear("");
      setStatus("");

      setMessage("Student added successfully");
    } else if (error) {
      console.log(error);
      setMessage("Error creating student");
    }

    console.log(error);
  }

  return (
    <div>
      <form onSubmit={addStudent} action="">
        <input
          type="text"
          value={name}
          placeholder="John Dose"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={level}
          placeholder="100"
          onChange={(e) => setLevel(e.target.value)}
        />
        <input
          type="text"
          value={studentId}
          placeholder="20AB1234"
          onChange={(e) => setStudentId(e.target.value)}
        />

        <input
          type="text"
          value={gender}
          placeholder="Male/Female"
          onChange={(e) => setGender(e.target.value)}
        />

        <input
          type="text"
          value={admissionYear}
          placeholder="2024"
          onChange={(e) => setAdmissionYear(e.target.value)}
        />

        <input
          type="text"
          value={status}
          placeholder="Active/Inactive"
          onChange={(e) => setStatus(e.target.value)}
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
          Add Student
        </button>

        {message && <p className="mt-2">{message}</p>}
      </form>

      <div className="flex justify-between w-full border-2">
        <h2 className="uppercase">Full Name</h2>
        <h2 className="uppercase">Level</h2>
        <h2 className="uppercase">Mat No</h2>
        <h2 className="uppercase">Gender</h2>
        <h2 className="uppercase">Admission year</h2>
        <h2 className="uppercase">status</h2>
      </div>
      {students.map((s) => (
        <div className="flex justify-between w-full border-2" key={s.id}>
          <h1>{s.full_name}</h1>
          <p>{s.level}</p>
          <p>{s.student_id}</p>
          <p>{s.gender}</p>
          <p>{s.admission_year}</p>
          <p>{s.status}</p>
        </div>
      ))}
    </div>
  );
};

export default StudentsPage;
