// prettier.config.cjs

/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
module.exports = {
  semi: true,
  singleQuote: true,
  trailingComma: "es5",
  printWidth: 100,
  tabWidth: 2,
  bracketSpacing: true,
  arrowParens: "avoid",
  endOfLine: "lf",

  plugins: ["prettier-plugin-tailwindcss"],

  tailwindStylesheet: "./src/index.css",

  tailwindFunctions: ["clsx", "cva"],  
  tailwindAttributes: ["className"],  
};
