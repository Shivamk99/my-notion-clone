"use client";

import {redirect} from "next/navigation";

import {useConvexAuth} from "convex/react";

import CircularProgress from "../(marketing)/_components/circular-progress/circular-progress";
import Navigation from "./_components/navigation/navigation";

export const Layout = ({children}: {children: React.ReactNode}) => {
  const {isAuthenticated, isLoading} = useConvexAuth();

  if (isLoading)
    return (
      <div className={"h-full flex items-center justify-center"}>
        <CircularProgress size={"lg"} />
      </div>
    );

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className={"h-full flex dark:bg-[#1F1F1F]"}>
      <Navigation />
      <main className={"flex-1 h-full overflow-y-auto"}>{children}</main>
    </div>
  );
};

export default Layout;
