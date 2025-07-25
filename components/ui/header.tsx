import { SignedOut, SignedIn, UserButton, SignInButton } from "@clerk/nextjs";
import { Button } from "./button";
import Link from "next/link";
import { Outlines } from "@react-three/drei";
export default function Header(){
    return (
        <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <div className="flex-gap-2">
              <Link href="my-plans">
              <Button variant={"outline"}>
                 My Plans 
              </Button>
              </Link>
              </div>
              <UserButton />
            </SignedIn>
          </header>
    );
}