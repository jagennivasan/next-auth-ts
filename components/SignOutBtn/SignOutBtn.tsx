"use client"

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";


export default function SignOutBtn(){
    return(
        <Button variant={"destructive"} onClick={()=>signOut({
            redirect:true,
            callbackUrl: `${window.location.origin}/login`
        })} >Sign Out</Button>  
    )
}