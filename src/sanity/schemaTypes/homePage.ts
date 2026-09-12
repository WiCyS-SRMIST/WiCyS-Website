import { defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons/Home";

export default defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Hero" },
    { name: "offerings", title: "Offerings" },
    { name: "closing", title: "Closing" },
  ],
  fields: [
    defineField({
      name: "heroHeading",
      title: "Heading",
      type: "string",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroBody",
      title: "Body",
      type: "text",
      rows: 3,
      group: "hero",
    }),
    defineField({
      name: "heroPrimaryCta",
      title: "Primary button",
      type: "ctaLink",
      group: "hero",
    }),
    defineField({
      name: "heroSecondaryCta",
      title: "Secondary button",
      type: "ctaLink",
      group: "hero",
    }),
    defineField({
      name: "offeringsHeading",
      title: "Section heading",
      type: "string",
      group: "offerings",
    }),
    defineField({
      name: "offerings",
      title: "Offerings",
      type: "array",
      group: "offerings",
      of: [
        {
          type: "object",
          name: "offering",
          fields: [
            defineField({ name: "title", type: "string", title: "Title" }),
            defineField({ name: "body", type: "text", title: "Body", rows: 2 }),
          ],
          preview: { select: { title: "title", subtitle: "body" } },
        },
      ],
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      group: "offerings",
      of: [{ type: "statItem" }],
    }),
    defineField({
      name: "closingCtaHeading",
      title: "Heading",
      type: "string",
      group: "closing",
    }),
    defineField({
      name: "closingCtaBody",
      title: "Body",
      type: "text",
      rows: 2,
      group: "closing",
    }),
    defineField({
      name: "closingCta",
      title: "Button",
      type: "ctaLink",
      group: "closing",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Home page" };
    },
  },
});
