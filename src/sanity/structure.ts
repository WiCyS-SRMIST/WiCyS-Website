import type { StructureResolver } from "sanity/structure";

export const SINGLETON_TYPES = new Set([
  "siteSettings",
  "homePage",
  "aboutPage",
  "contactInfo",
]);

const singleton = (S: Parameters<StructureResolver>[0], type: string, title: string) =>
  S.listItem()
    .id(type)
    .title(title)
    .child(S.document().schemaType(type).documentId(type));

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      singleton(S, "homePage", "Home page"),
      singleton(S, "aboutPage", "About page"),
      singleton(S, "contactInfo", "Contact page"),
      singleton(S, "siteSettings", "Site settings"),
      S.divider(),
      S.documentTypeListItem("teamMember").title("Team"),
      S.documentTypeListItem("event").title("Events"),
      S.documentTypeListItem("announcement").title("Announcements"),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() && !SINGLETON_TYPES.has(item.getId()!) &&
          !["teamMember", "event", "announcement"].includes(item.getId()!),
      ),
    ]);
