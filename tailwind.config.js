import plugin from "tailwindcss/plugin";
import colors from "tailwindcss/colors";
import { parseColor } from "tailwindcss/lib/util/color";
const toRGB = (val) => parseColor(val).color.join(" ");

// Define some CSS variables
const vars = {
  ":root": {
    // Default background (bg) and text-color (fg) applied to <body/>
    "--bg": toRGB(colors.neutral[100]),
    "--fg": toRGB(colors.neutral[500]),
    "--accent-bg": toRGB(colors.neutral[300]),
    "--accent-fg": toRGB(colors.neutral[700]),

    // // Accentuated versions of default background and foreground
    // // Used for:
    // // - <Button variant="outline"/> component hover state
    // // - <Card/> component hover glow effect
    // "--accent-bg": toRGB(colors.slate[300]),
    // "--accent-fg": toRGB(colors.slate[900]),

    // // Primary colors
    // // Used for:
    // // - <Button variant = "default"/> component
    // "--primary-bg": toRGB(colors.indigo[500]),
    // "--primary-fg": toRGB(colors.slate[100]),

    // // Secondary colors
    // // Used for:
    // // - <Button variant="secondary"/> component
    // "--secondary-bg": toRGB(colors.sky[500]),
    // "--secondary-fg": toRGB(colors.slate[800]),

    // // Destructive colors (intended to notice a destructive or critical action to the user)
    // // Used for:
    // // - <Button variant="secondary/> component
    // "--destructive-bg": toRGB(colors.red[500]),
    // "--destructive-fg": toRGB(colors.slate[200]),

    // // Default border color
    // "--border": toRGB(colors.slate[800]),

    // // Border colors for inputs components (input, select, textarea, ...)
    // "--input": toRGB(colors.neutral[300]),

    // // Focus ring color
    "--ring": toRGB(colors.indigo[300]),

    // // Border radius
    // "--radius": "0.8rem"
  },
  ".dark": {
    "--bg": toRGB(colors.neutral[800]),
    "--fg": toRGB(colors.neutral[400]),
    "--accent-bg": toRGB("#383838"),
    "--accent-fg": toRGB(colors.neutral[200]),
    // "--input": toRGB(colors.neutral[400]),
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    fontFamily: {
      logo: ["var(--font-logo)"],
      body: ["var(--font-body)"],
      heading: ["var(--font-heading)"],
    },
    extend: {
      backgroundImage: {
        reveal:
          "radial-gradient(100px circle at var(--mouse-x) var(--mouse-y), #34d39922, #34d39911, transparent)",
      },
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        // primary: {
        //   DEFAULT: "rgb(var(--primary-bg) / <alpha-value>)",
        //   fg: "rgb(var(--primary-fg) / <alpha-value>)",
        // },
        // secondary: {
        //   DEFAULT: "rgb(var(--secondary-bg) / <alpha-value>)",
        //   fg: "rgb(var(--secondary-fg) / <alpha-value>)",
        // },
        // destructive: {
        //   DEFAULT: "rgb(var(--destructive-bg) / <alpha-value>)",
        //   fg: "rgb(var(--destructive-fg) / <alpha-value>)",
        // },
        card: {
          DEFAULT: "rgb(var(--accent-bg) / 0.2)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent-bg) / <alpha-value>)",
          fg: "rgb(var(--accent-fg) / <alpha-value>)",
        },
        border: "rgb(var(--border) / <alpha-value>)",
        input: "rgb(var(--input) / <alpha-value>)",
        ring: "rgb(var(--ring) / <alpha-value>)",
      },
    },
  },
  plugins: [
    // require('@tailwindcss/typography'),
    plugin(({ addBase }) => addBase(vars)),
  ],
};
