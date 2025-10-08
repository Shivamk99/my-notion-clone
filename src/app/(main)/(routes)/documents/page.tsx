"use client";

import Image from "next/image";

import React from "react";
import {useUser} from "@clerk/clerk-react";
import {Button} from "@/src/components/ui/button/button";
import {PlusCircle} from "lucide-react";

export default function DocumentsPage() {
  const {user} = useUser();

  return (
    <div
      className={"h-full flex flex-col items-center justify-center space-x-4"}
    >
      <Image
        src={"/empty.png"}
        alt={"empty"}
        width={300}
        height={300}
        className={"dark:hidden"}
      />
      <Image
        src={"/empty-dark.png"}
        alt={"empty"}
        width={300}
        height={300}
        className={"hidden dark:block"}
      />
      <h2>Welcome to Notion Clone {user?.fullName}</h2>
      <p className={"text-muted-foreground"}>
        You don&apos;t have any documents yet. Create one to get started.
      </p>

      <Button>
        <PlusCircle className={"h-4 w-4 mr-2"} /> Create new
      </Button>
    </div>
  );
}
