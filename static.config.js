import React from "react";
import path from "path";
import fs from "fs";

const typescriptWebpackPaths = require("./webpack.config.js");

export default {
  entry: path.resolve("src", "index.tsx"),
  // siteRoot: "https://openrndr.org",
  getSiteProps: () => ({
    title: "React Static"
  }),

  getRoutes: async () => {
    const dataProps = {
      data: JSON.parse(
        fs.readFileSync(path.resolve("data", "home-dataprops.json"))
      )
    };
    return [
      {
        path: ``,
        component: "src/containers/Home",
        getData: async () => dataProps
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

  webpack: (config, { defaultLoaders }) => {
    // Add .ts and .tsx extension to resolver
    config.resolve.extensions.push(".ts", ".tsx");

    // Add TypeScript Path Mappings (from tsconfig via webpack.config.js)
    // to react-statics alias resolution
    config.resolve.alias = typescriptWebpackPaths.resolve.alias;

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
