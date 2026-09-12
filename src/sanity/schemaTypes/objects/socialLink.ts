import { defineField, defineType } from "sanity";
import { LinkIcon } from "@sanity/icons/Link";

export default defineType({
  name: "socialLink",
  title: "Social link",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: {
        list: [
          { title: "Email", value: "email" },
          { title: "Instagram", value: "instagram" },
          { title: "LinkedIn", value: "linkedin" },
          { title: "Discord", value: "discord" },
          { title: "GitHub", value: "github" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "platform", subtitle: "url" },
  },
});
