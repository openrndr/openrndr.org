import React from "react";
import path from "path";
import fs from "fs";

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const dataDir = path.resolve("public", "");

export default {
  entry: path.resolve("src", "index.tsx"),
  // siteRoot: "https://openrndr.org",
  getSiteData: async () => {
    const data = await JSON.parse(
      fs.readFileSync(path.join(dataDir, "site-data.json"))
    );
    return {
      data
    };
  },

  getRoutes: async () => {
    const initialDataFile = fs
      .readdirSync(dataDir)
      .find(filename => filename.includes("initial-data"));
    if (!initialDataFile) {
      throw new Error(
        `could not find file containing initial data in ${dataDir}`
      );
    }
    const dataProps = JSON.parse(
      fs.readFileSync(path.join(dataDir, initialDataFile))
    );
    return [
      {
        path: ``,
        component: "src/containers/home",
        getData: async () => dataProps
      },
      {
        path: `/sandbox`,
        component: "src/containers/sandbox",
        getData: async () => {}
      },
      {
        is404: true,
        component: "src/containers/404"
      }
    ];
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
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: "css-loader"
            })
          },

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
          defaultLoaders.fileLoader
        ]
      }
    ];

    config.plugins.push(new ExtractTextPlugin("styles.css"));

    return config;
  }
};
