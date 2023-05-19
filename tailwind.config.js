import plugin from "tailwindcss/plugin";
import colors from "tailwindcss/colors";
import { parseColor } from "tailwindcss/lib/util/color";
const toRGB = val => parseColor(val).color.join(" ");

// Define some CSS variables
const vars = {
  ":root": {
    // Default background (bg) and text-color (fg) applied to <body/>
    "--bg": toRGB(colors.indigo[50]),
    "--fg": toRGB(colors.slate[800]),

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
    // "--input": toRGB(colors.slate[300]),

    // // Focus ring color
    "--ring": toRGB(colors.indigo[300]),

    // // Border radius
    // "--radius": "0.8rem"
  },
  ".dark": {
    "--bg": toRGB(colors.slate[800]),
    "--fg": toRGB(colors.slate[50]),
  }
};


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        reveal: "radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), #55ff5599, #55ff5599,  white)"
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(({ addBase }) => addBase(vars)),
  ],
};
