module.exports = {
  root: true,
  env: {
    node: true,
    es2024: true,
    serviceworker: true,
    worker: true,
    "vue/setup-compiler-macros": true
  },
  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/typescript/recommended"
  ],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2022
  },
  ignorePatterns: [
    "node_modules/**/*",
    "src/lang/**",
    "src/assets/**",
    "src/api/**",
    "packages/**",
    "**/*.svg",
    "**/*.scss",
    "**/*.md",
    "**/*.json",
    "*.d.ts"
  ],
  rules: {
    "vue/script-setup-uses-vars": "error",
    "comma-dangle": ["warn", "never"],
    "vue/comma-dangle": ["warn", "never"],
    "vue/multi-word-component-names": ["warn"],
    "max-len": [
      "warn",
      {
        code: 120,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
        ignorePattern:
          '((grid-template-columns|backgroundImage|animation|:).*;?)|(:.*="(.|[\n\r])*")'
      }
    ],
    "vue/component-tags-order": [
      "error",
      {
        order: ["script", "template", "style"]
      }
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "none",
        ignoreRestSiblings: true
      }
    ],
    "@typescript-eslint/no-empty-function": ["off"],
    "@typescript-eslint/explicit-module-boundary-types": ["off"]
  }
};
