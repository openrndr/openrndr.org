import { IDatoImageFile } from "./index";

export interface IDatoColor {
  red: number;
  blue: number;
  alpha: number;
  green: number;
}

export interface IDatoTheme {
  logo?: IDatoImageFile;
  darkColor: IDatoColor;
  lightColor: IDatoColor;
  accentColor: IDatoColor;
  primaryColor: IDatoColor;
}

export interface IDatoAttributes {
  rel: string;
  sizes: string;
  href: string;
  name: string;
  content: string;
  type: string;
}

export interface IDatoFaviconMetaTag {
  tagName: string;
  attributes: IDatoAttributes;
}

export interface FallbackSeo {
  title: string;
  description: string;
  image: IDatoImageFile;
}

export interface GlobalSeo {
  siteName: string;
  titleSuffix: string;
  facebookPageUrl: string;
  twitterAccount: string;
  fallbackSeo: FallbackSeo;
}

export interface IDatoSiteData {
  id: string;
  name: string;
  locales: string[];
  theme: IDatoTheme;
  domain?: any;
  internalDomain: string;
  noIndex: boolean;
  globalSeo: GlobalSeo;
  favicon: IDatoImageFile;
  faviconMetaTags: IDatoFaviconMetaTag[];
}
