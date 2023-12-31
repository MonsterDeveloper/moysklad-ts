import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "moysklad-ts",

      social: {
        github: "https://github.com/MonsterDeveloper/moysklad-ts",
      },
      editLink: {
        baseUrl:
          "https://github.com/MonsterDeveloper/moysklad-ts/edit/main/apps/docs/",
      },
      defaultLocale: "root",
      locales: {
        root: {
          label: "English",
          lang: "en",
        },
        ru: {
          label: "Русский",
        },
      },
      customCss: ["./src/custom.css"],
      sidebar: [
        {
          label: "Guides",
          autogenerate: { directory: "guides" },
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
    }),
  ],
});
