import { SiteClient, Loader } from "datocms-client";
import * as fs from "fs";
import * as path from "path";
import { Showcase, Entity } from "src/types";
import {Paged, paginate} from "./paginate";
const client = new SiteClient(process.env.DATO_API_TOKEN);
const loader = new Loader(client);

interface LoadResult {
  showcase: { toMap: () => Showcase };
}

function dump(repo: any) {
  const filepath = path.resolve(__dirname, "dato-dump.json");
  console.log("dumping repo to", filepath);
  const res: any = {};
  [
    "calendar",
    "about",
    "community",
    "gettingStarted",
    "landing",
    // "projects",
    "showcase"
  ].forEach(key => {
    res[key] = repo[key].toMap();
  });
  fs.writeFileSync(filepath, JSON.stringify(res, null, 4));
}

(async function load() {
  await loader.load();
  const result: any = loader.itemsRepo;
  dump(result);

  const {
    calendar,
    about,
    community,
    gettingStarted,
    landing,
    projects,
    showcase
  } = result;

  const paginatedGallery = paginate(
    multiple(showcase.toMap().gallery),
    index => `/showcase/gallery-${index}.json`,
    4
  );

  paginatedGallery.forEach((page, i) => {
    const filename = path.resolve("public", "showcase", `gallery-${i}.json`);
    // console.log("should save to", filename);
    fs.writeFileSync(filename, JSON.stringify(page, null, 4));
  });
})();

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

process.on("unhandledRejection", e => {
  throw e;
});
