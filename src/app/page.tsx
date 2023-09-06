import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import LoginForm from "./components/LoginForm";

import { authOptions } from "@/utils/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/todos");

  return (
    <main>
      <LoginForm />
    </main>
  );
}
