import { defineArrayMember, defineField } from "sanity";

/**
 * A short, lightly-formatted block field: paragraphs, bold/italic, links.
 * No headings, images, or lists — for prose like mission statements.
 */
export function restrictedText(name: string, title: string) {
  return defineField({
    name,
    title,
    type: "array",
    of: [
      defineArrayMember({
        type: "block",
        styles: [{ title: "Normal", value: "normal" }],
        lists: [],
        marks: {
          decorators: [
            { title: "Bold", value: "strong" },
            { title: "Italic", value: "em" },
          ],
          annotations: [
            {
              name: "link",
              type: "object",
              title: "Link",
              fields: [
                defineField({
                  name: "href",
                  type: "url",
                  title: "URL",
                  validation: (Rule) => Rule.required(),
                }),
              ],
            },
          ],
        },
      }),
    ],
  });
}

/**
 * A fuller block field: paragraphs, bold/italic, links, bullet lists,
 * and inline images — for longer writeups like an event description.
 */
export function richText(name: string, title: string) {
  return defineField({
    name,
    title,
    type: "array",
    of: [
      defineArrayMember({
        type: "block",
        styles: [{ title: "Normal", value: "normal" }],
        lists: [{ title: "Bullet", value: "bullet" }],
        marks: {
          decorators: [
            { title: "Bold", value: "strong" },
            { title: "Italic", value: "em" },
          ],
          annotations: [
            {
              name: "link",
              type: "object",
              title: "Link",
              fields: [
                defineField({
                  name: "href",
                  type: "url",
                  title: "URL",
                  validation: (Rule) => Rule.required(),
                }),
              ],
            },
          ],
        },
      }),
      defineArrayMember({
        type: "image",
        options: { hotspot: true },
        fields: [
          defineField({ name: "alt", type: "string", title: "Alt text" }),
        ],
      }),
    ],
  });
}
