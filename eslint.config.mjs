import tseslint from "typescript-eslint";
export default tseslint.config(
  { ignores: ["dist/**", ".astro/**"] },
  ...tseslint.configs.recommended,
);
