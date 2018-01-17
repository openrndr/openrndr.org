
/*
       1. BUILD TIME (server side)
*/

// prepare data
const allShowcases = dato.showcases.all();

allShowcases.forEach((showcase, i) => {
  writeFile(`public/showcase-${i}.json`);
});




/*
       1. RUN TIME (client side)
 */

// dynamically request data with an api like this:
const showcases = loader.load("showcase", {
  offset: 0,
  limit: 10
});

// where loader is implemented like
const loader = {
  load: (model, pagination) => {
    const loadedRecords = range(
      pagination.offset,
      pagination.offset + pagination.limit
    ).map(i => {
      return fetchJson(`/${model}-{i}`);
    });
    return Promise.all(loadedRecords);
  }
};
