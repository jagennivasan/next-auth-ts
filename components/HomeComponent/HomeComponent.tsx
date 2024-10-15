import Link from "next/link";
import { buttonVariants } from "../ui/button";

export default function HomeComponent(){
    return(
        <div className="h-screen grid place-content-center">
          Home
          <Link href={"/dashboard"} className={`bg-emerald-700 hover:bg-emerald-600 ${buttonVariants()}` }>    open my dashboard</Link>
        </div>
    )
}