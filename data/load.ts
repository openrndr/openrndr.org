import { SiteClient, Loader } from "datocms-client";

import {
  Showcase,
  Entity,
  Calendar,
  About,
  Community,
  GettingStarted,
  Landing
} from "../src/types";
import { IDatoSiteData } from "../src/types/site";
import { fetchMediumPosts } from "./medium";

const { DATO_API_TOKEN } = process.env;

const dato = new Loader(new SiteClient(DATO_API_TOKEN));

export interface LoadResult {
  pages: {
    [key: string]: Entity;
    showcase: Showcase;
    calendar: Calendar;
    about: About;
    community: Community;
    gettingStarted: GettingStarted;
    landing: Landing;
  };
  site: IDatoSiteData;
}

export type Loader = () => Promise<LoadResult>;

const loader: Loader = async () => {
  await dato.load();
  const result: any = dato.itemsRepo;
  const mediumPosts = await fetchMediumPosts();

  const {
    calendar,
    about,
    community,
    gettingStarted,
    landing,
    showcase,
    site
  } = result;

  return {
    pages: {
      calendar: calendar.toMap(),
      about: about.toMap(),
      community: community.toMap(),
      gettingStarted: gettingStarted.toMap(),
      landing: landing.toMap(),
      showcase: {
        ...showcase.toMap(),
        caseStudies: mediumPosts.map(mp => ({
          ...mp,
          itemType: "medium_post"
        }))
      }
    },
    site: site.toMap()
  };
};

export { loader };
