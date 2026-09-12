import type { SchemaTypeDefinition } from "sanity";

import socialLink from "./objects/socialLink";
import ctaLink from "./objects/ctaLink";
import statItem from "./objects/statItem";

import siteSettings from "./siteSettings";
import homePage from "./homePage";
import aboutPage from "./aboutPage";
import contactInfo from "./contactInfo";
import teamMember from "./teamMember";
import event from "./event";
import announcement from "./announcement";

export const schemaTypes: SchemaTypeDefinition[] = [
  // objects
  socialLink,
  ctaLink,
  statItem,
  // singletons
  siteSettings,
  homePage,
  aboutPage,
  contactInfo,
  // collections
  teamMember,
  event,
  announcement,
];
