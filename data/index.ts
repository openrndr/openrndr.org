import { loader, Loader } from "./load";
import * as fs from "fs";
import * as path from "path";
import { paginate } from "./paginate";
import { IHomeProps } from "../src/containers/home";

interface Config {
  load: Loader;
  makeFilePath: (filePath: string) => { public: string; absolute: string };
}

type DataFile = { data: any; path: string };
type PrepareDataFiles = (config: Config) => Promise<DataFile[]>;

const prepareDataFiles: PrepareDataFiles = async (config: Config) => {
  const { load, makeFilePath } = config;
  const { pages, site } = await load();

  const paginatedData = {
    ...pages,
    calendar: {
      ...pages.calendar,
      events: paginate(pages.calendar.events, {
        buildUrl: hash => makeFilePath(`event-${hash}.json`).public,
        pageSize: 4
      })
    },
    showcase: {
      ...pages.showcase,
      gallery: paginate(pages.showcase.gallery, {
        buildUrl: hash => makeFilePath(`project-${hash}.json`).public,
        pageSize: 8,
        initialPageSize: 6
      }),
      experiments: paginate(pages.showcase.experiments, {
        buildUrl: hash => makeFilePath(`insta-post-${hash}.json`).public,
        pageSize: 8,
        initialPageSize: 4
      }),
      caseStudies: paginate(pages.showcase.caseStudies, {
        buildUrl: hash => makeFilePath(`case-study-${hash}.json`).public,
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

  const homeDataPropsFile: DataFile = {
    data: homeProps,
    path: makeFilePath("home-data-props.json").absolute
  };

  const siteDataFile: DataFile = {
    path: makeFilePath("site-data.json").absolute,
    data: site
  };

  const { calendar, showcase } = paginatedData;
  const pageFiles: DataFile[] = [
    calendar.events,
    showcase.gallery,
    showcase.experiments,
    showcase.caseStudies
  ]
    .map(paginatedData => {
      return (paginatedData as { current: string }[]).map(page => {
        const pageFile: DataFile = {
          data: page,
          path: makeFilePath(page.current).absolute
        };
        return pageFile;
      });
    })
    .reduce((acc, next) => acc.concat(next), []);
  return [homeDataPropsFile, siteDataFile, ...pageFiles];
};

(async function() {
  const files = await prepareDataFiles({
    load: loader,
    makeFilePath: filePath => {
      const { join, resolve } = path;
      const prefix = "/data";
      const publicP = join(
        prefix,
        // replacing prefix for the paginated ones,
        // because they're made from page.current, which will already contain the data prefix
        filePath.replace(prefix, "")
      );
      const absolute = resolve(join("public", publicP));
      return {
        absolute,
        public: publicP
      };
    }
  });
  files.forEach(file => {
    fs.writeFileSync(file.path, JSON.stringify(file.data));
  });
})();

process.on("unhandledRejection", e => {
  throw e;
});
