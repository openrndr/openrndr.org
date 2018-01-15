export interface Entity {
  id: string;
  createdAt: string;
  updatedAt: string;
  itemType: string;
}

export interface Image extends Entity {
  itemType: "image";
  file: {
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

export interface GalleryItem extends Entity {
  itemType: "gallery_item";
  title: string;
  blurb: string;
  url: string;
  media: MediaItem[];
}

export interface Showcase extends Entity {
  gallery: GalleryItem[];
  experiments: GalleryItem[];
  caseStudies: GalleryItem[];
}
