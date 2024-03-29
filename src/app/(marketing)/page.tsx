import React from "react";

import Heading from "./_components/heading/heading";
import Heroes from "./_components/heroes/heroes";
import Footer from "./_components/footer/footer";

const MarketingPage = () => {
  return (
    <div className={"min-h-full flex flex-col"}>
      <div
        className={
          "flex flex-col items-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10 "
        }
      >
        <Heading />
        <Heroes />
      </div>
      <Footer />
    </div>
  );
};

export default MarketingPage;
