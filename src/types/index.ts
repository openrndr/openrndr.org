export interface Entity {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  itemType: string;
}

export interface IDatoImageFile {
  format: string;
  size: number;
  url: string;
  width: number;
  height: number;
  alt: string;
  title: string;
}

export interface IDatoVideoFile {
  url: string;
  title: string;
  provider: string;
  thumbnailUrl: string;
  width: number;
  height: number;
}

export interface Image extends Entity {
  itemType: "image";
  file: IDatoImageFile;
  caption: string;
  credits?: string;
}

export interface Video extends Entity {
  itemType: "video";
  caption: string;
  file: IDatoVideoFile;
  credits?: string;
}

export interface Gif extends Entity {
  itemType: "gif";
  url?: string;
  caption: string;
  file: IDatoImageFile;
  credits?: string;
  vimeoUrl?: string;
}

export type MediaItem = Image | Video | Gif;

export interface Project extends Entity {
  title: string;
  blurb: string;
  url: string;
  media: MediaItem[];
  credits?: string;
  techSpecs?: string;
  link?: string;
}

export interface InstaPost extends Entity {
  link: string;
}

export interface Showcase extends Entity {
  gallery: Project[];
  caseStudies: Project[];
  experiments: InstaPost[];
}

export interface IDatoEvent extends Entity {
  eventType: "exhibition" | "workshop" | "event";
  title: string;
  endDate?: string;
  startDate?: string;
  location?: {
    latitude: string;
    longitude: string;
  };
  note?: string;
  link?: string;
}

export interface TextBlock extends Entity {
  bodyText: string;
  title: string;
  link?: string;
}

export interface Question extends Entity {
  answer: string;
  question: string;
}

export interface About extends Entity {
  contentBlocks: TextBlock[];
}

export interface Community extends Entity {
  contentBlocks: TextBlock[];
  faq: Question[];
}

export interface GettingStarted extends Entity {
  contentBlocks: TextBlock[];
}

export interface Landing extends Entity {
  banner: Project;
  contentBlocks: TextBlock[];
}

export interface Calendar extends Entity {
  events: IDatoEvent[];
}

export interface Paged<T> {
  data: T[];
  hash: string;
  prev: string | null;
  current: string;
  next: string | null;
}

export interface SectionMetadata {
  title: string;
  key: string;
  path: string;
  color: string;
}

export interface SectionConfig {
  metadata: SectionMetadata;
  Component: any;
}

export interface SiteConfig {
  sections: SectionConfig[];
  style: {
    textBlockPadding: number[];
    menuPadding: number[];
  };
}

export interface HomeContext {
  activeSectionName: string;
}

export interface IMediumPost extends Entity {
  creator: string;
  title: string;
  link: string;
  pubDate: string;
  content?: string;
  dc: string;
  guid: string;
  categories: string[];
  isoDate: Date;
  itemType: string;
  imageUrl: string | null;
  blurb: string;
}
