// Paths Aliases defined through tsconfig.json
// const typescriptWebpackPaths = require("./webpack.config.js");
const fs = require("fs");
const path = require("path");
const { ServerStyleSheet } = require("styled-components");
const React = require("react");

export default {
  getSiteProps: () => ({
    title: "React Static"
  }),
  getRoutes: async () => {
    const data = JSON.parse(
      fs.readFileSync(path.resolve("data", "home-dataprops.json"))
    );
    const appRoutes = [
      "/",
      "/gallery",
      "/getting-started",
      "/community",
      "/about",
      "/calendar"
    ].map(path => {
      return {
        path,
        component: "src/app/containers/home",
        getProps: async () => data
      };
    });
    return appRoutes.concat([
      {
        path: "/data",
        getProps: async () => {
          return data;
        }
      },
      {
        path: "/sandbox",
        component: "src/app/containers/sandbox",
        getProps: async () => {
          return data;
        }
      }
    ]);
  },
  renderToHtml: (render, Comp, meta) => {
    const sheet = new ServerStyleSheet();
    const html = render(sheet.collectStyles(<Comp />));
    meta.styleTags = sheet.getStyleElement();
    return html;
  },
  Document: class CustomHtml extends React.Component {
    render() {
      const { Html, Head, Body, children, renderMeta } = this.props;
      return (
        <Html>
          <Head>
            <meta charSet="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            {renderMeta.styleTags}
          </Head>
          <Body>{children}</Body>
        </Html>
      );
    }
  },
  webpack: (config, { stage, defaultLoaders }) => {
    console.log(stage);
    // replace context & entry
    const context = path.resolve("src");
    config.context = context;
    console.log("entry:", config.entry);
    console.log("stage:", stage);
    if (stage == "dev") {
      config.entry.pop();
      config.entry.push("index.tsx");
    } else {
      config.entry = "index.tsx";
    }

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

process.on("unhandledRejection", err => {
  throw err;
});
