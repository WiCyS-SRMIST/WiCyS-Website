import { defineField, defineType } from "sanity";
import { InfoOutlineIcon } from "@sanity/icons/InfoOutline";
import { restrictedText } from "./blocks";

export default defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  icon: InfoOutlineIcon,
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 3 }),
    defineField({ name: "missionTitle", title: "Mission title", type: "string" }),
    restrictedText("missionBody", "Mission body"),
    defineField({ name: "whyTitle", title: '"Why it exists" title', type: "string" }),
    restrictedText("whyBody", '"Why it exists" body'),
    defineField({
      name: "valuesHeading",
      title: "Values section heading",
      type: "string",
    }),
    defineField({
      name: "values",
      title: "Values",
      type: "array",
      of: [
        {
          type: "object",
          name: "value",
          fields: [
            defineField({ name: "term", type: "string", title: "Term" }),
            defineField({ name: "def", type: "text", title: "Definition", rows: 2 }),
          ],
          preview: { select: { title: "term", subtitle: "def" } },
        },
      ],
    }),
    defineField({
      name: "teamCtaText",
      title: "Bottom CTA text",
      type: "string",
    }),
  ],
  preview: {
    prepare() {
      return { title: "About page" };
    },
  },
});
