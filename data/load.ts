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

const dato = new Loader(new SiteClient(process.env.DATO_API_TOKEN));

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
      showcase: showcase.toMap()
    },
    site: site.toMap()
  };
};

export { loader };
