import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const session_year = searchParams.get("session_year");
  const semester = searchParams.get("semester");

  let query = supabase.from("enrollments").select("*");

  if (session_year) {
    query = query.eq("session_year", parseInt(session_year));
  }

  if (semester) {
    query = query.eq("semester", semester);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json(data);
}
