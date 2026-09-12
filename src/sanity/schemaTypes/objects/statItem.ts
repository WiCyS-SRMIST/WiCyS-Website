import { defineField, defineType } from "sanity";

export default defineType({
  name: "statItem",
  title: "Stat",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "suffix",
      title: "Suffix",
      type: "string",
      description: 'e.g. "+" for 120+',
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { value: "value", suffix: "suffix", label: "label" },
    prepare({ value, suffix, label }) {
      return { title: `${value}${suffix ?? ""}`, subtitle: label };
    },
  },
});
