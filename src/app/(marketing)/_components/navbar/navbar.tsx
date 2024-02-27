"use client";

import {cn} from "@/src/lib/utils";

import {Logo} from "../logo/logo";
import {useScrollTop} from "@/hooks/scroll-to-top/use-scroll-top";
import {ToggleBtn} from "@/src/components/ui/toggle-btn/toggle-btn";

export const Navbar = () => {
  const scrolled = useScrollTop();
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
        <ToggleBtn />
      </div>
    </div>
  );
};

export default Navbar;