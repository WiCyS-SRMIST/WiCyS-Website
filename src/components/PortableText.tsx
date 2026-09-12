import Image from "next/image";
import {
  PortableText as PortableTextBase,
  type PortableTextComponents,
  type PortableTextBlock,
} from "@portabletext/react";
import { urlForImage } from "@/sanity/image";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="leading-relaxed text-text-muted">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="ml-5 list-disc space-y-1 leading-relaxed text-text-muted">
        {children}
      </ul>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-text">{children}</strong>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-green underline-offset-2 hover:underline"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <Image
        src={urlForImage(value).width(1200).height(800).url()}
        alt={value.alt ?? ""}
        width={1200}
        height={800}
        className="my-2 rounded-2xl border border-border"
      />
    ),
  },
};

export default function PortableText({
  value,
}: {
  value: PortableTextBlock[] | undefined;
}) {
  if (!value?.length) return null;
  return (
    <div className="flex flex-col gap-3">
      <PortableTextBase value={value} components={components} />
    </div>
  );
}
