import { defineField, defineType } from "sanity";
import { BellIcon } from "@sanity/icons/Bell";
import { restrictedText } from "./blocks";

export default defineType({
  name: "announcement",
  title: "Announcement",
  type: "document",
  icon: BellIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    restrictedText("body", "Body"),
    defineField({ name: "link", title: "Link", type: "ctaLink" }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "expiresAt",
      title: "Expires at",
      type: "datetime",
    }),
  ],
  orderings: [
    {
      title: "Date, latest first",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "date" },
  },
});
