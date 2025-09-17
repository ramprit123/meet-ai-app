import { getServerSession } from "@/lib/server/auth";

export default async function Page() {
  const session = await getServerSession();
  return <h1>Welcome to page! {session?.user?.name}</h1>;
}
