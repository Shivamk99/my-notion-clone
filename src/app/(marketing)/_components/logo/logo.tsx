import Image from "next/image";

import {Poppins} from "next/font/google";
import {cn} from "@/src/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const Logo = () => {
  return (
    <div className={"hidden md:flex items-center gap-x-2"}>
      <Image
        priority
        src={"/logo.svg"}
        alt={"Logo"}
        height={"40"}
        width={"40"}
        className="dark:hidden"
      />
      <Image
        priority
        src={"/logo-dark.svg"}
        alt={"Logo"}
        height={"40"}
        width={"40"}
        className="hidden dark:block"
      />

      <p className={cn("font-semibold", font.className)}>Notion</p>
    </div>
  );
};

export default Logo;
