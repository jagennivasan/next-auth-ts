import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
export default async function UserInfo() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    return (
      <h2 className="text-2xl grid place-content-center h-screen">
        {" "}
        welcome to admin MR.{session?.user?.email}
      </h2>
    );
  }
  return (
    <div className="text-2xl grid place-content-center h-screen">
      please login to see this admin page
    </div>
  );
}
