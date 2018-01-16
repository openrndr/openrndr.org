// Paths Aliases defined through tsconfig.json
// const typescriptWebpackPaths = require("./webpack.config.js");
const fs = require("fs");

export default {
  getSiteProps: () => ({
    title: "React Static"
  }),
  getRoutes: async () => {
    return [
      {
        path: "/",
        component: "src/app/containers/home",
        getProps: async () => {
          return {
            page: JSON.parse(
              fs.readFileSync("public/showcase/gallery-0.json", "utf-8")
            )
          };
        }
      },
      {
        path: "/sandbox",
        component: "src/app/containers/sandbox",
        getProps: async () => {
          return {};
        }
      },
      {
        path: "/about",
        component: "src/app/containers/about"
      },
      {
        is404: true,
        component: "src/app/containers/404"
      }
    ];
  },
  webpack: (config, { defaultLoaders }) => {
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
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: defaultLoaders.jsLoader.exclude, // as std jsLoader exclude
            use: [
              {
                loader: "babel-loader"
              },
              {
                loader: require.resolve("ts-loader"),
                options: {
                  transpileOnly: true
                }
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
