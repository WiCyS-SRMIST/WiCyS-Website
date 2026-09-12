import { defineField, defineType } from "sanity";
import { CalendarIcon } from "@sanity/icons/Calendar";
import { richText } from "./blocks";

export default defineType({
  name: "event",
  title: "Event",
  type: "document",
  icon: CalendarIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date & time",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End date & time",
      type: "datetime",
    }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: ["workshop", "ctf", "speaker", "mentorship", "other"],
      },
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 2,
      description: "Shown on the events list.",
    }),
    richText("body", "Full description"),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text" }),
      ],
    }),
    defineField({
      name: "registrationUrl",
      title: "Registration link",
      type: "url",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Date, soonest first",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
    {
      title: "Date, latest first",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "location", media: "image" },
  },
});
