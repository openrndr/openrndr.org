import React from "react";
import path from "path";
import fs from "fs";
import { exec } from "child_process";

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

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

const sitemapRoutes = [
  {
    path: `guide`,
    component: "src/containers/externals/guide",
    redirect: "https://guide.openrndr.org"
  },
  {
    path: `rndr-studio`,
    component: "src/containers/externals/rndr",
    redirect: "https://rndr.studio"
  },
  {
    path: `api`,
    component: "src/containers/externals/api",
    redirect: "https://api.openrndr.org"
  }
];

export default {
  entry: path.resolve("src", "index.tsx"),
  siteRoot: "https://openrndr.org",
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
        component: "src/containers/slack",
        noindex: true
      },
      {
        path: `/paypal`,
        component: "src/containers/paypal",
        noindex: true
      },
      ...sitemapRoutes,
      {
        is404: true,
        component: "src/containers/404",
        noindex: true
      }
    ];
  },

  onBuild: async () => {
    console.log("Everything is done building!");
    const redirects = sitemapRoutes
      .map(s => {
        return `${s.path} \t ${s.redirect}`;
      })
      .join("\n");
    exec(`echo ${redirects} > ./dist/_redirect`);
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

            <script
              dangerouslySetInnerHTML={{
                __html: `  window.fbAsyncInit = function() {
                    FB.init({
                      appId            : '232392810676495',
                      autoLogAppEvents : true,
                      xfbml            : true,
                      version          : 'v3.0'
                    });
                  };

                  (function(d, s, id){
                     var js, fjs = d.getElementsByTagName(s)[0];
                     if (d.getElementById(id)) {return;}
                     js = d.createElement(s); js.id = id;
                     js.src = "https://connect.facebook.net/en_US/sdk.js";
                     fjs.parentNode.insertBefore(js, fjs);
                   }(document, 'script', 'facebook-jssdk'));`
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

    let loaders = [];

    if (stage !== "dev") {
      loaders = [
        {
          loader: "css-loader",
          options: {
            importLoaders: 1,
            minimize: stage === "prod",
            sourceMap: false
          }
        }
      ];

      // Don't extract css to file during node build process
      if (stage !== "node") {
        console.log("loader 2 is");
        loaders = ExtractTextPlugin.extract({
          fallback: {
            loader: "style-loader",
            options: {
              sourceMap: false,
              hmr: false
            }
          },
          use: loaders
        });
      }
    }

    if (stage === "dev") {
      console.log("dev is");
      loaders = ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
      });
    }

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
          {
            test: /\.(css?)$/,
            loader: loaders
          },
          defaultLoaders.cssLoader,
          defaultLoaders.fileLoader
        ]
      }
    ];

    // config.plugins.push(new ManifestPlugin());
    if (stage === "dev") {
      config.plugins.push(new ExtractTextPlugin("styles.css"));
    }

    return config;
  }
};
