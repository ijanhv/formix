import React from "react";
import Logo from "./logo";
import NavLinks from "./nav-links";
import Container from "@/components/common/container";
import PrimaryButton from "@/components/common/primary-button";
import MobileNavbar from "./mobile-nav";

const Navbar = () => {
  return (
    <div className="overflow-x-hidden">
      <header className="py-4 border-b  ">
        <Container>
          <div className="flex items-center gap-5 justify-between">
            <div className="flex-shrink-0">
              <Logo />
            </div>

            <NavLinks />

            <div>
              <div className="hidden lg:ml-auto lg:flex lg:items-center lg:space-x-5">
                {/* <Search /> */}
                <PrimaryButton text="Contact Us" link="/contact" size={"sm"} />
              </div>

              <div className="lg:hidden">
                <MobileNavbar />
              </div>
            </div>
          </div>
        </Container>
      </header>
    </div>
  );
};

export default Navbar;
