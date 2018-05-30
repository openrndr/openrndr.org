declare module "datocms-client";
declare module "react-static-routes";
declare module "react-imgix";
declare module "react-scroll";
declare module "prop-types";
declare module "nuka-carousel";
declare module "react-imgix";
declare module "react-visibility-sensor";
declare module "react-truncate-html";
declare module "react-reveal";
declare module "compare-versions";

declare module "detect-browser" {
  export type BrowserName =
    | "android"
    | "bb10"
    | "chrome"
    | "crios"
    | "edge"
    | "firefox"
    | "fxios"
    | "ie"
    | "ios"
    | "kakaotalk"
    | "opera"
    | "phantomjs"
    | "safari"
    | "vivaldi"
    | "yandexbrowser"
    | "node";

  export interface BrowserInfo {
    name: BrowserName;
    version: string;
    os: string;
  }

  export function detect(): null | BrowserInfo;
}
