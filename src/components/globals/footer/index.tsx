import Container from "@/components/common/container";
import React from "react";

import { Button } from "@/components/ui/button";
import Links from "./links";

const Footer = () => {
  return (
    <div className="dark:bg-blue-voilet pt-28 border-t">
      <Container>
        <div className="flex flex-col lg:flex-row justify-between gap-8 w-full ">
          <div className="lg:w-1/2 space-y-3">
            <h2 className="font-bold text-xl">Trusted Tally</h2>
            <p className="text-base">
              Tally is your Email newsletter. Lorem Ipsum Leodre Lorem Ipsum.
            </p>

            <Button className="bg-white text-primary p-5 hover:bg-gray-100 rounded-full">
              Try For Free
            </Button>
          </div>

          <Links />
        </div>

        <div className="pt-20 pb-10 text-center">
          <hr className="border border-white/40" />
          <p className="mt-10">
            © 2024 Trusted Talley. All rights reserved | Cookie Settings,
            Anti-Spam, Privacy, User agreement, Legal Notice, and Responsible
            Disclosure
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
