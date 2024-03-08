"use client";

import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {useConvexAuth} from "convex/react";
import {SignInButton} from "@clerk/clerk-react";

import {Button} from "@/src/components/ui/button/button";
import CircularProgress from "../circular-progress/circular-progress";

export const Heading = () => {
  const {isAuthenticated, isLoading} = useConvexAuth();

  const isSignin = !isAuthenticated && !isLoading;
  const isSignout = isAuthenticated && !isLoading;

  return (
    <div className={"max-w-3xl space-y-4"}>
      <h1 className={"text-3xl sm:text-5xl md:text-6xl font-bold"}>
        Your Ideas, Documents, and Plans. Unified. Welcom to{" "}
        <span className={"underline"}>Notion</span>
      </h1>
      <h3 className={"text-base sm:text-xl md:text-2xl font-medium"}>
        Notion is the connected workspace where <br /> better, faster work
        happens.
      </h3>
      {isLoading && (
        <div className={"w-full flex item-center justify-center"}>
          <CircularProgress size={"lg"} />
        </div>
      )}
      {isSignin && (
        <SignInButton mode={"modal"}>
          <Button>
            Get Notion Free <ArrowRight className={"h-4 w-4 ml-2"} />
          </Button>
        </SignInButton>
      )}
      {isSignout && (
        <Button asChild>
          <Link href={"/documents"}>
            Enter Notion <ArrowRight className={"h-4 w-4 ml-2"} />
          </Link>
        </Button>
      )}
    </div>
  );
};

export default Heading;
