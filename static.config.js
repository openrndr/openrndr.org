import React from "react";
import path from "path";
import fs from "fs";

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const dataDir = path.resolve("public", "data");
const siteDataFile = path.join(dataDir, "site-data.json");
const homeDataPropsFile = path.join(dataDir, "home-data-props.json");

//check if necessary files exist
[dataDir, siteDataFile, homeDataPropsFile].forEach(path => {
  if (!fs.existsSync(path)) {
    console.log(
      `Expected ${path} to exist but it doesn't. You might need to run yarn:data:fetch.`
    );
    process.exit(1);
  }
});

export default {
  entry: path.resolve("src", "index.tsx"),
  // siteRoot: "https://openrndr.org"
  siteRoot: "",
  getSiteData: async () => {
    const data = JSON.parse(fs.readFileSync(siteDataFile));
    return {
      data
    };
  },

  getRoutes: async () => {
    const dataProps = JSON.parse(fs.readFileSync(homeDataPropsFile));
    return [
      {
        path: ``,
        component: "src/containers/home",
        getData: async () => dataProps
      },
      {
        path: `/slack`,
        component: "src/containers/slack"
      },
      {
        path: `/paypal`,
        component: "src/containers/paypal"
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

            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=UA-109731993-2"
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'UA-109731993-2');`
              }}
            />
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
