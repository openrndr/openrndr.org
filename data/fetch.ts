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
const client = new SiteClient(process.env.DATO_API_TOKEN);
const loader = new Loader(client);

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

export default async function(): Promise<LoadResult> {
  await loader.load();
  const result: any = loader.itemsRepo;

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
}
