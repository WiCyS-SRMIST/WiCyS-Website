import { defineField, defineType } from "sanity";
import { EnvelopeIcon } from "@sanity/icons/Envelope";

export default defineType({
  name: "contactInfo",
  title: "Contact page",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 3 }),
    defineField({
      name: "channelsHeading",
      title: "Channels section heading",
      type: "string",
    }),
    defineField({
      name: "channels",
      title: "Channels",
      type: "array",
      of: [
        {
          type: "object",
          name: "channel",
          fields: [
            defineField({ name: "label", type: "string", title: "Label" }),
            defineField({
              name: "value",
              type: "string",
              title: "Display value",
              description: 'What people read, e.g. "@wicys_srmist".',
            }),
            defineField({ name: "href", type: "url", title: "Link" }),
            defineField({
              name: "kind",
              type: "string",
              title: "Kind",
              options: {
                list: ["email", "instagram", "linkedin", "discord", "other"],
              },
            }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        },
      ],
    }),
    defineField({
      name: "formHeading",
      title: "Form section heading",
      type: "string",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Contact page" };
    },
  },
});
