import clsx from "clsx";
import { Merienda, Inter, Poppins as Tmp } from "next/font/google";

const logoFont = Merienda({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-logo",
});

const headingFont = Tmp({
  weight: ["600"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});


const bodyFont = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-body",
});

export const fonts = clsx(logoFont.variable, headingFont.variable, bodyFont.variable);