"use client";

import { redirect } from "next/navigation";

export default function Home() {
  redirect("/todos");
  return <main>Main page</main>;
}
