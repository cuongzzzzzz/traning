import type { Config } from "tailwindcss";
import flowbite from "flowbite/plugin"

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js", "./app/**/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {

    },
  },
  plugins: [flowbite],
} satisfies Config;
