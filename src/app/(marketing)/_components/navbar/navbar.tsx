"use client";

import {useConvexAuth} from "convex/react";
import {SignInButton, UserButton} from "@clerk/clerk-react";
import Link from "next/link";

import {cn} from "@/src/lib/utils";
import {Logo} from "../logo/logo";
import {useScrollTop} from "@/hooks/scroll-to-top/use-scroll-top";
import {ToggleBtn} from "@/src/components/ui/toggle-btn/toggle-btn";
import {Button} from "@/src/components/ui/button/button";
import {CircularProgress} from "../circular-progress/circular-progress";

export const Navbar = () => {
  const {isAuthenticated, isLoading} = useConvexAuth();
  const scrolled = useScrollTop();

  const isSignin = !isAuthenticated && !isLoading;
  const isSignout = isAuthenticated && !isLoading;

  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div
        className={
          "md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2"
        }
      >
        {isLoading && <CircularProgress />}
        {isSignin && (
          <>
            <SignInButton mode={"modal"}>
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </SignInButton>
            <SignInButton>
              <Button size="sm">Get Notion Free</Button>
            </SignInButton>
          </>
        )}
        {isSignout && (
          <>
            <Button variant={"ghost"} size={"sm"} asChild>
              <Link href={"/documents"}>Enter Notion</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        <ToggleBtn />
      </div>
    </div>
  );
};

export default Navbar;
