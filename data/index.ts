import fetchData from "./fetch";
import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
// import { DataProps as HomeDataProps } from "../src/app/containers/home";
import { paginate } from "./paginate";
import { digest } from "./digest";
import { IHomeProps } from "../src/containers/home";

(async function() {
  const dataPublicPath = path.resolve(path.join("public", "data"));
  const data = await fetchData();

  //create an empty folder for chunks
  execSync(`rm -rf ${dataPublicPath} && mkdir ${dataPublicPath}`);
  console.log(`${dataPublicPath} is created`);

  const paginatedData = {
    ...data,
    calendar: {
      ...data.calendar,
      events: paginate(data.calendar.events, {
        buildUrl: hash => `/data/event-${hash}.json`,
        pageSize: 4
      })
    },
    showcase: {
      ...data.showcase,
      gallery: paginate(data.showcase.gallery, {
        buildUrl: hash => `/data/project-${hash}.json`,
        pageSize: 4,
        initialPageSize: 6
      }),
      experiments: paginate(data.showcase.experiments, {
        buildUrl: hash => `/data/project-${hash}.json`,
        pageSize: 4
      }),
      caseStudies: paginate(data.showcase.caseStudies, {
        buildUrl: hash => `/data/case-study-${hash}.json`,
        pageSize: 2
      })
    }
  };

  const homeProps: IHomeProps = {
    data: {
      ...paginatedData,
      calendar: {
        ...paginatedData.calendar,
        events: paginatedData.calendar.events[0]
      },
      showcase: {
        ...paginatedData.showcase,
        gallery: paginatedData.showcase.gallery[0],
        experiments: paginatedData.showcase.experiments[0],
        caseStudies: paginatedData.showcase.caseStudies[0]
      }
    }
  };

  const paginatedDataDigest = digest(paginatedData);
  fs.writeFileSync(
    path.resolve(
      path.join("public", "data", `initial-data-${paginatedDataDigest}.json`)
    ),
    JSON.stringify(homeProps, null, 4)
  );

  const { calendar, showcase } = paginatedData;

  [
    calendar.events,
    showcase.gallery,
    showcase.experiments,
    showcase.caseStudies
  ].forEach(paginatedData => {
    (paginatedData as { current: string }[]).forEach(page => {
      const filepath = path.resolve(path.join("public", page.current));
      fs.writeFileSync(filepath, JSON.stringify(page, null, 4));
    });
  });
})();

process.on("unhandledRejection", e => {
  throw e;
});
