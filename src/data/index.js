import { SiteClient, Loader } from "datocms-client";
const client = new SiteClient("5647f190cafe05e80863fa32aae0c1");
const loader = new Loader(client);

(async function load(){
  await loader.load();
  const {showcase} = loader.itemsRepo;
  console.log(JSON.stringify(showcase.toMap(), null, 4));
})();
process.on("unhandledRejection", e => {
  throw e;
});
