import { SiteClient, Loader } from "datocms-client";
import * as fs from "fs";
import * as path from "path";
import { Showcase, Entity } from "src/types";
import { paginate } from "./paginate";
const client = new SiteClient("5647f190cafe05e80863fa32aae0c1");
const loader = new Loader(client);

interface LoadResult {
  showcase: { toMap: () => Showcase };
}

(async function load() {
  await loader.load();
  const result: LoadResult = loader.itemsRepo;
  const showcase = result.showcase.toMap();
  const paginatedGallery = paginate(
    multiple(showcase.gallery),
    index => `/showcase/gallery-${index}.json`,
    4
  );

  paginatedGallery.forEach((page, i) => {
    const filename = path.resolve("public", "showcase", `gallery-${i}.json`);
    console.log("should save to", filename);
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
