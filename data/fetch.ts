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
// import {Paged, paginate} from "./paginate";
const client = new SiteClient(process.env.DATO_API_TOKEN);
const loader = new Loader(client);

export interface LoadResult {
  showcase: Showcase;
  calendar: Calendar;
  about: About;
  community: Community;
  gettingStarted: GettingStarted;
  landing: Landing;
}

function multiple(entities: Entity[]): Entity[] {
  return entities
    .concat(entities)
    .concat(entities)
    .concat(entities)
    .concat(entities)
    .concat(entities)
    .map(e => {
      return {
        ...e,
        id: `${Math.floor(Math.random() * 20000)}`
      };
    });
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
    showcase
  } = result;

  return {
    calendar: calendar.toMap(),
    about: about.toMap(),
    community: community.toMap(),
    gettingStarted: gettingStarted.toMap(),
    landing: landing.toMap(),
    showcase: showcase.toMap()
  };
}
