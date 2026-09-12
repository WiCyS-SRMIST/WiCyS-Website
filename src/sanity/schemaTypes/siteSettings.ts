import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons/Cog";

export default defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "wordmarkSuffix",
      title: "Wordmark suffix",
      type: "string",
      description: 'Shown next to the logo, e.g. "SRMIST".',
      initialValue: "SRMIST",
    }),
    defineField({
      name: "headerCta",
      title: "Header button",
      type: "ctaLink",
    }),
    defineField({
      name: "footerTagline",
      title: "Footer tagline",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "footerAffiliationLine",
      title: "Footer affiliation line",
      type: "string",
    }),
    defineField({
      name: "socials",
      title: "Social links",
      type: "array",
      of: [{ type: "socialLink" }],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site settings" };
    },
  },
});
