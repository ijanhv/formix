/* eslint-disable camelcase */
/* eslint-disable new-cap */
import localFont from "next/font/local";
import {
  Jost,
  Montserrat,
  Open_Sans,
  Poppins,
  Quicksand,
  DM_Serif_Display,
} from "next/font/google";

export const quickSand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quick",
  weight: ["300", "400", "500", "600", "700"],
});

export const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-mont",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const serifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-serif-display",
  weight: ["400"],
});

export const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500"],
});
export const mangericaBold = localFont({
  src: "fonts/Mangerica-Bold.ttf",
  variable: "--font-mangerica-bold",
});

export const mangericaBoldItalic = localFont({
  src: "fonts/Mangerica-BoldItalic.ttf",
  variable: "--font-mangerica-bold-italic",
});

export const mangericaItalic = localFont({
  src: "fonts/Mangerica-Italic.ttf",
  variable: "--font-mangerica-italic",
});

export const mangericaLight = localFont({
  src: "fonts/Mangerica-Light.ttf",
  variable: "--font-mangerica-light",
});

export const mangericaRegular = localFont({
  src: "fonts/Mangerica-Regular.ttf",
  variable: "--font-mangerica-regular",
});
