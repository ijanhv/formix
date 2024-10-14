import Container from "@/components/common/container";
import Wrapper from "@/components/globals/wrapper";
import React from "react";
import Navbar from "@/components/globals/navbar";
import Footer from "@/components/globals/footer";
import TemplateList from "@/components/template/template-list";
export default function TemplatesPage() {
  return (
    <>
      <Navbar />
      <section className="w-full relative flex items-center justify-center flex-col px-4 md:px-0 py-8">
        {/* hero */}

        <Wrapper>
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] 
          dark:bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10 h-[150vh]"
          />

          <Container>
            <div className="flex flex-col items-center justify-center py-20 h-full">
              <div className="flex flex-col items-center mt-8 max-w-3xl w-11/12 md:w-full">
                <h1 className="text-2xl md:text-7xl w-full md:!leading-snug font-semibold text-center bg-clip-text bg-gradient-to-b from-foreground to-foreground/60 text-transparent">
                  Start from templates
                </h1>
                <p className="text-sm md:text-lg text-foreground/80 mt-6 text-center">
                  Choose from a variety of pre-designed templates to kickstart
                  your form-building journey! Whether you need a simple survey,
                  a feedback form, or a comprehensive registration form, we{"'"}
                  ve got you covered.
                </p>
              </div>
            </div>
          </Container>
        </Wrapper>

        <TemplateList />
      </section>

      <Footer />
    </>
  );
}
