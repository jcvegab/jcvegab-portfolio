export default {
  "*.{js,jsx,ts,tsx}": [
    "prettier --write",
    (files) => `next lint --fix --file ${files.join(" --file ")}`,
  ],
  "*.{json,css,scss,md,yml,yaml}": ["prettier --write"],
};