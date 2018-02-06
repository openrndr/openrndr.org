export interface Entity {
  id: string;
  createdAt: string;
  updatedAt: string;
  itemType: string;
}

export interface Image extends Entity {
  itemType: "image";
  file: {
    format: string;
    size: number;
    url: string;
    width: number;
    height: number;
    alt: string;
    title: string;
  };
  caption: string;
}

export interface Video extends Entity {
  itemType: "video";
  caption: string;
  file: {
    url: string;
    title: string;
    provider: string;
    thumbnailUrl: string;
  };
}

export interface Gif extends Entity {
  itemType: "gif";
  url: string;
  caption: string;
}

export type MediaItem = Image | Video | Gif;

export interface Project extends Entity {
  title: string;
  blurb: string;
  url: string;
  media: MediaItem[];
}

export interface Showcase extends Entity {
  gallery: Project[];
  experiments: Project[];
  caseStudies: Project[];
}

export interface Event extends Entity {
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

export interface About extends Entity {
  contentBlocks: TextBlock[];
}

export interface Community extends Entity {
  contentBlocks: TextBlock[];
}

export interface GettingStarted extends Entity {
  contentBlocks: TextBlock[];
}

export interface Landing extends Entity {
  banner: Project;
  contentBlocks: TextBlock[];
}

export interface Calendar extends Entity {
  events: Event[];
}

export interface Paged<T> {
  data: T[];
  current: string;
  prev: string | null;
  next: string | null;
}
