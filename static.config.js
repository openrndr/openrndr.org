// Paths Aliases defined through tsconfig.json
// const typescriptWebpackPaths = require("./webpack.config.js");
const fs = require("fs");
const path = require("path");
export default {
  getSiteProps: () => ({
    title: "React Static"
  }),
  getRoutes: async () => {
    return [
      {
        path: "/data",
        getProps: async () => {
          const data = JSON.parse(
            fs.readFileSync(path.resolve("data", "home-dataprops.json"))
          );
          return data;
        }
      },
      {
        path: "/sandbox",
        component: "src/app/containers/sandbox",
        getProps: async () => {
          return {};
        }
      }
    ];
  },
  webpack: (config, { defaultLoaders }) => {
    // replace context & entry
    const context = path.resolve("src");
    config.context = context;
    config.entry[config.entry.length - 1] = "index.tsx";

    // Add .ts and .tsx extension to resolver
    config.resolve.extensions.push(".ts", ".tsx");

    // Add TypeScript Path Mappings (from tsconfig via webpack.config.js)
    // to react-statics alias resolution
    // config.resolve.alias = typescriptWebpackPaths.resolve.alias;

    // We replace the existing JS rule with one, that allows us to use
    // both TypeScript and JavaScript interchangeably
    config.module.rules = [
      {
        oneOf: [
          {
            test: /\.tsx?$/,
            exclude: defaultLoaders.jsLoader.exclude,
            use: [
              {
                loader: "ts-loader",
                options: {
                  configFile: "tsconfig.webpack.json"
                }
              }
            ]
          },
          {
            test: /\.(jsx?)$/,
            exclude: defaultLoaders.jsLoader.exclude,
            use: [
              {
                loader: "babel-loader"
              }
            ]
          },
          defaultLoaders.cssLoader,
          defaultLoaders.fileLoader
        ]
      }
    ];
    return config;
  }
};
