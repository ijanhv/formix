import React from "react";
import Container from "@/components/globals/container";
import Wrapper from "@/components/globals/wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Marquee from "@/components/ui/marquee";
import SectionBadge from "@/components/ui/section-badge";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronRight, UserIcon, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BorderBeam } from "@/components/ui/border-beam";
import Icons from "@/components/globals/icons";
import { features, perks, pricingCards, reviews } from "@/constants";

import { LampContainer } from "@/components/ui/lamp";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata | null> {
  return {
    title: `Formix | Home`,
    description:
      "Formix empowers developers to create elegant, responsive forms by simply selecting themes, fonts, and input types.",
    icons: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon-32x32.png" },
      { url: "/favicon-16x16.png" },
    ],
    openGraph: {
      title: `Formix | Home`,
      description:
        "Formix empowers developers to create elegant, responsive forms by simply selecting themes, fonts, and input types.",

      images: [
        {
          url: "https://eeoiaaigtkpwkppddqwb.supabase.co/storage/v1/object/public/formix/Screenshot%202024-11-03%20at%2011.13.26%20PM.png?t=2024-11-03T17%3A43%3A38.794Z",
          secureUrl:
            "https://eeoiaaigtkpwkppddqwb.supabase.co/storage/v1/object/public/formix/Screenshot%202024-11-03%20at%2011.13.26%20PM.png?t=2024-11-03T17%3A43%3A38.794Z",
          width: 1200,
          height: 630,
          alt: `Formix`,
        },
      ],
    },
  };
}

const HomePage = () => {
  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);

  return (
    <section className="w-full relative flex items-center justify-center flex-col px-4 md:px-0 py-8">
      {/* hero */}

      <Wrapper>
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] 
        dark:bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10 h-[150vh]"
        />

        <Container>
          <div className="flex flex-col items-center justify-center py-20 h-full">
            <button className="group relative grid overflow-hidden rounded-full px-4 py-1 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200">
              <span>
                <span className="spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
              </span>
              <span className="backdrop absolute inset-[1px] rounded-full bg-white dark:bg-slate-900 transition-colors duration-200 dark:group-hover:bg-slate-950" />
              <span className="h-full w-full blur-md absolute bottom-0 inset-x-0 bg-gradient-to-tr from-foreground/10"></span>
              <span className="z-10 py-0.5 text-sm 0 flex items-center text-foreground justify-center gap-1.5">
                {/* <Image
                  src="/icons/sparkles-dark.svg"
                  alt="✨"
                  width={24}
                  height={24}
                  className="w-4 h-4"
                /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="ffe500"
                    d="M9.5 45.75a14.5 1.25 0 1 0 29 0a14.5 1.25 0 1 0-29 0"
                    opacity={0}
                  ></path>
                  <path
                    fill="#ffe500"
                    d="M33.7 30.66c.47-1.51 2.06-4 4.08-4.33l8.22-1.4a.57.57 0 0 0 .53-.49A.56.56 0 0 0 46 24l-8.19-1.41c-2-.34-3.61-2.81-4.08-4.32L31.81 7.59a.75.75 0 0 0-1.32 0L28.6 18.22c-.47 1.51-2.05 4-4.08 4.32L16.33 24a.55.55 0 0 0-.52.49a.56.56 0 0 0 .52.49l8.19 1.4c2 .35 3.61 2.82 4.08 4.33l1.89 10.68a.75.75 0 0 0 1.32 0Z"
                  ></path>
                  <path
                    fill="#fff48c"
                    d="m46 24l-8.19-1.41c-2-.34-3.61-2.81-4.08-4.32L31.81 7.59a.75.75 0 0 0-1.32 0L29.88 11l1.82 10.28c.47 1.51 2.06 4 4.08 4.32l3.14.54l7-1.21a.57.57 0 0 0 .53-.49A.56.56 0 0 0 46 24"
                  ></path>
                  <path
                    fill="none"
                    stroke="ffe500"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M33.7 30.66c.47-1.51 2.06-4 4.08-4.33l8.22-1.4a.57.57 0 0 0 .53-.49A.56.56 0 0 0 46 24l-8.19-1.41c-2-.34-3.61-2.81-4.08-4.32L31.81 7.59a.75.75 0 0 0-1.32 0L28.6 18.22c-.47 1.51-2.05 4-4.08 4.32L16.33 24a.55.55 0 0 0-.52.49a.56.56 0 0 0 .52.49l8.19 1.4c2 .35 3.61 2.82 4.08 4.33l1.89 10.68a.75.75 0 0 0 1.32 0Z"
                  ></path>
                  <path
                    fill="#ffe500"
                    stroke="ffe500"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.62 16.27c.26-.82 1.13-2.17 2.24-2.36l4.49-.76c.17 0 .29-.14.29-.27s-.12-.24-.29-.27l-4.49-.76a3.54 3.54 0 0 1-2.24-2.35l-1-5.79a.36.36 0 0 0-.36-.21a.37.37 0 0 0-.36.21l-1 5.79a3.52 3.52 0 0 1-2.24 2.35l-4.48.76c-.17 0-.29.14-.29.27s.12.24.29.27l4.48.76c1.12.19 2 1.54 2.24 2.36l1 5.81a.36.36 0 0 0 .36.22a.35.35 0 0 0 .36-.22ZM10 34.83a2.39 2.39 0 0 1 1.54-1.59l3.08-.51a.19.19 0 1 0 0-.37l-3.08-.51A2.41 2.41 0 0 1 10 30.26l-.71-3.9a.29.29 0 0 0-.5 0l-.71 3.9a2.42 2.42 0 0 1-1.53 1.59l-3.09.51a.19.19 0 1 0 0 .37l3.08.51a2.39 2.39 0 0 1 1.54 1.59l.71 3.92a.29.29 0 0 0 .5 0Z"
                  ></path>
                </svg>
                Introducing Formix
                <ChevronRight className="w-4 h-4" />
              </span>
            </button>

            <div className="flex flex-col items-center mt-8 max-w-3xl w-11/12 md:w-full">
              <h1 className="text-2xl md:text-6xl w-full md:!leading-snug font-semibold text-center bg-clip-text bg-gradient-to-b from-foreground to-foreground/60 text-transparent">
                Tailored for Developers, Designed for Everyone
              </h1>
              <p className="text-sm md:text-lg text-foreground/80 mt-6 text-center">
                Formix empowers developers to create elegant, responsive forms
                by simply selecting themes, fonts, and input types. When your
                form is ready, generate code and view submissions in a robust
                dashboard.
              </p>
              <div className="hidden md:flex relative items-center justify-center mt-8 md:mt-12 w-full">
                <Link
                  href="#"
                  className="flex items-center justify-center w-max rounded-full border-t border-foreground/30 bg-white/20 backdrop-blur-lg px-2 py-1 md:py-2 gap-2 md:gap-8 shadow-3xl shadow-background/40 cursor-pointer select-none"
                >
                  <p className="text-foreground text-sm text-center md:text-base font-medium pl-4 pr-4 lg:pr-0">
                    ✨ {"  "} Start building your dream form now!
                  </p>
                  <Button
                    size="sm"
                    className="rounded-full hidden lg:flex border border-foreground/20"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative flex items-center py-10 md:py-20 w-full">
              <div className="absolute top-1/2 left-1/2 -z-10 gradient w-3/4 -translate-x-1/2 h-3/4 -translate-y-1/2 inset-0 blur-[10rem]"></div>
              <div className="-m-2 rounded-xl p-2 ring-1 ring-inset ring-foreground/20 lg:-m-4 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl">
                <Image
                  // src="https://eeoiaaigtkpwkppddqwb.supabase.co/storage/v1/object/public/formix/Screenshot%202024-10-13%20at%2011.28.26%20AM.png"
                  src="https://eeoiaaigtkpwkppddqwb.supabase.co/storage/v1/object/public/formix/Screenshot%202024-10-14%20at%207.58.21%20PM.png"
                  alt="banner image"
                  width={1200}
                  height={1200}
                  quality={100}
                  unoptimized
                  className="rounded-md lg:rounded-xl bg-foreground/10 shadow-2xl ring-1 ring-border"
                />

                <BorderBeam size={250} duration={12} delay={9} />
              </div>
            </div>
          </div>
        </Container>
      </Wrapper>

      {/* how it works */}
      <Wrapper className="flex flex-col items-center justify-center py-12 relative">
        <Container>
          <div className="max-w-md mx-auto text-start md:text-center">
            <SectionBadge title="The Process" />
            <h2 className="text-3xl lg:text-4xl font-semibold mt-6">
              Three steps to build your dream website
            </h2>
            <p className="text-muted-foreground mt-6">
              Turn your vision into reality in just 3 simple steps
            </p>
          </div>
        </Container>
        <Container>
          <div className="flex flex-col items-center justify-center py-10 md:py-20 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full divide-x-0 md:divide-x divide-y md:divide-y-0 divide-gray-900 first:border-l-2 lg:first:border-none first:border-gray-900">
              {perks.map((perk) => (
                <div
                  key={perk.title}
                  className="flex flex-col items-start px-4 md:px-6 lg:px-8 lg:py-6 py-4"
                >
                  <div className="flex items-center justify-center">
                    <perk.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-medium mt-4">{perk.title}</h3>
                  <p className="text-muted-foreground mt-2 text-start lg:text-start">
                    {perk.info}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Wrapper>

      {/* features */}
      <Wrapper className="flex flex-col items-center justify-center py-12 relative">
        <div className="hidden md:block absolute top-0 -right-1/3 w-72 h-72 bg-primary rounded-full blur-[10rem] -z-10"></div>
        <div className="hidden md:block absolute bottom-0 -left-1/3 w-72 h-72 bg-indigo-600 rounded-full blur-[10rem] -z-10"></div>
        <Container>
          <div className="max-w-md mx-auto text-start md:text-center">
            <SectionBadge title="Features" />
            <h2 className="text-3xl lg:text-4xl font-semibold mt-6">
              Discover our powerful features
            </h2>
            <p className="text-muted-foreground mt-6">
              Formix offers a range of features to help you build a stunning
              website in no time
            </p>
          </div>
        </Container>
        <Container>
          <div className="flex items-center justify-center mx-auto mt-8">
            <Icons.feature className="w-auto h-80" />
          </div>
        </Container>
        <Container>
          <div className="flex flex-col items-center justify-center py-10 md:py-20 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-8">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex flex-col items-start lg:items-start px-0 md:px-0"
                >
                  <div className="flex items-center justify-center">
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-medium mt-4">{feature.title}</h3>
                  <p className="text-muted-foreground mt-2 text-start lg:text-start">
                    {feature.info}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Wrapper>

      {/* pricing */}
      <Wrapper className="flex flex-col items-center justify-center py-12 relative">
        <div className="hidden md:block absolute top-0 -right-1/3 w-72 h-72 bg-blue-500 rounded-full blur-[10rem] -z-10"></div>
        <Container>
          <div className="max-w-md mx-auto text-start md:text-center">
            <SectionBadge title="Pricing" />
            <h2 className="text-3xl lg:text-4xl font-semibold mt-6">
              Unlock the right plan for your business
            </h2>
            <p className="text-muted-foreground mt-6">
              Choose the best plan for your business and start building your
              dream website today
            </p>
          </div>
        </Container>
        <Container className="flex items-center justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full md:gap-8 py-10 md:py-20 flex-wrap max-w-4xl">
            {pricingCards.map((card) => (
              <Card
                key={card.title}
                className={cn(
                  "flex flex-col w-full border-neutral-700",
                  card.title === "Unlimited Saas" && "border-2 border-primary"
                )}
              >
                <CardHeader className="border-b border-border">
                  <span>{card.title}</span>
                  <CardTitle
                    className={cn(
                      card.title !== "Unlimited Saas" && "text-muted-foreground"
                    )}
                  >
                    {card.price}
                  </CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-3">
                  {card.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Zap className="w-4 h-4 fill-primary text-primary" />
                      <p>{feature}</p>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="mt-auto">
                  <Link
                    href="#"
                    className={cn(
                      "w-full text-center text-primary-foreground bg-primary p-2 rounded-md text-sm font-medium",
                      card.title !== "Unlimited Saas" &&
                        "!bg-foreground !text-background"
                    )}
                  >
                    {card.buttonText}
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Container>
      </Wrapper>

      {/* testimonials */}
      <Wrapper className="flex flex-col items-center justify-center py-12 relative">
        <div className="hidden md:block absolute -top-1/4 -left-1/3 w-72 h-72 bg-indigo-500 rounded-full blur-[10rem] -z-10"></div>
        <Container>
          <div className="max-w-md mx-auto text-start md:text-center">
            <SectionBadge title="Our Customers" />
            <h2 className="text-3xl lg:text-4xl font-semibold mt-6">
              What people are saying
            </h2>
            <p className="text-muted-foreground mt-6">
              See how Formiz empowers businesses of all sizes. Here&apos;s what
              real people are saying on Twitter
            </p>
          </div>
        </Container>
        <Container>
          <div className="py-10 md:py-20 w-full">
            <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden py-10">
              <Marquee pauseOnHover className="[--duration:20s] select-none">
                {firstRow.map((review) => (
                  <figure
                    key={review.name}
                    className={cn(
                      "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                      "border-zinc-50/[.1] bg-background over:bg-zinc-50/[.15]"
                    )}
                  >
                    <div className="flex flex-row items-center gap-2">
                      <UserIcon className="w-6 h-6" />
                      <div className="flex flex-col">
                        <figcaption className="text-sm font-medium">
                          {review.name}
                        </figcaption>
                        <p className="text-xs font-medium text-muted-foreground">
                          {review.username}
                        </p>
                      </div>
                    </div>
                    <blockquote className="mt-2 text-sm">
                      {review.body}
                    </blockquote>
                  </figure>
                ))}
              </Marquee>
              <Marquee
                reverse
                pauseOnHover
                className="[--duration:20s] select-none"
              >
                {secondRow.map((review) => (
                  <figure
                    key={review.name}
                    className={cn(
                      "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                      "border-zinc-50/[.1] bg-background over:bg-zinc-50/[.15]"
                    )}
                  >
                    <div className="flex flex-row items-center gap-2">
                      <UserIcon className="w-6 h-6" />
                      <div className="flex flex-col">
                        <figcaption className="text-sm font-medium">
                          {review.name}
                        </figcaption>
                        <p className="text-xs font-medium text-muted-foreground">
                          {review.username}
                        </p>
                      </div>
                    </div>
                    <blockquote className="mt-2 text-sm">
                      {review.body}
                    </blockquote>
                  </figure>
                ))}
              </Marquee>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background"></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background"></div>
            </div>
          </div>
        </Container>
      </Wrapper>

      {/* newsletter */}
      <Wrapper className="flex flex-col items-center justify-center py-12 relative">
        <Container>
          <LampContainer>
            <div className="flex flex-col items-center justify-center relative w-full text-center">
              <h2 className="text-4xl lg:text-5xl xl:text-6xl lg:!leading-snug font-semibold mt-8">
                From Idea to Launch <br /> Faster Than Ever
              </h2>
              <p className="text-muted-foreground mt-6 max-w-md mx-auto">
                Build stunning forms with Formix&apos;s intuitive form builder
              </p>
              <Button variant="white" className="mt-6" asChild>
                <Link href="/auth?authType=signUp">
                  Get started for free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </LampContainer>
        </Container>
        <Container className="relative z-[999999]">
          <div className="flex items-center justify-center w-full -mt-40">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between w-full px-4 md:px-8 rounded-lg lg:rounded-2xl border border-border/80 py-4 md:py-8">
              <div className="flex flex-col items-start gap-4 w-full">
                <h4 className="text-xl md:text-2xl font-semibold">
                  Join our newsletter
                </h4>
                <p className="text-base text-muted-foreground">
                  Be up to date with everything about formix
                </p>
              </div>
              <div className="flex flex-col items-start gap-2 md:min-w-80 mt-5 md:mt-0 w-full md:w-max">
                <form
                  action="#"
                  className="flex flex-col md:flex-row items-center gap-2 w-full md:max-w-xs"
                >
                  <Input
                    required
                    type="email"
                    placeholder="Enter your email"
                    className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:border-primary duration-300 w-full"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    variant="secondary"
                    className="w-full md:w-max"
                  >
                    Subscribe
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground">
                  By subscribing you agree with our{" "}
                  <Link href="#">Privacy Policy</Link>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Wrapper>
    </section>
  );
};

export default HomePage;
