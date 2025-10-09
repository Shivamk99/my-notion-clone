"use client";

import Image from "next/image";

import React from "react";
import {useUser} from "@clerk/clerk-react";
import {PlusCircle} from "lucide-react";
import {useMutation} from "convex/react";
import {toast} from "sonner";

import {api} from "@/convex/_generated/api";
import {Button} from "@/src/components/ui/button/button";

export default function DocumentsPage() {
  const {user} = useUser();

  const create = useMutation(api.document.create);

  const onCreate = () => {
    const promise = create({
      title: "New Note",
    });

    toast.promise(promise, {
      loading: "Creating note...",
      success: "Note created successfully!",
      error: "Failed to create note.",
    });
  };

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
        You don&apos;t have any notes yet. Create one to get started.
      </p>

      <Button onClick={onCreate}>
        <PlusCircle className={"h-4 w-4 mr-2"} /> Create note
      </Button>
    </div>
  );
}
