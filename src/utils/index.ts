import { MediaItem } from "../types/index";
import compareVersions from "compare-versions";
import { BrowserInfo, BrowserName, detect } from "detect-browser";
import { string } from "prop-types";

export const calcColumnLeftPosition = (
  colIndex: number = 0,
  numberOfItems: number = 5
) => {
  const unit = calcColumnUnit(numberOfItems);

  return numberOfItems >= 5
    ? `calc(20px + ${unit} + calc(${colIndex} * 2 * ${unit}) )`
    : `calc( ${calcColumnSequence(colIndex)} * ${unit} + 20px)`;
};

export const calcColumnUnit = (numberOfItems: number = 5) => {
  return numberOfItems >= 5
    ? `calc(calc(100vw - 40px) * 0.1)`
    : `calc(calc(100vw - 40px) * 0.2)`;
};

export const closest = (item: number, items: number[]) =>
  items.reduce((prev, curr) => {
    return Math.abs(curr - item) < Math.abs(prev - item) ? curr : prev;
  });

// column sequence for tablet 0,1,3,5,7,...
const calcColumnSequence = (n: number): number => (n <= 1 ? n : n + n - 1);

export const calcBannerSize = (
  thumb: MediaItem,
  windowWidth: number
): { width: number; height: number } => {
  let ratio = 1.5;
  if (thumb && thumb.file.width) {
    ratio = thumb.file.width / thumb.file.height;
  }
  const width = windowWidth - 40;
  const height = width / ratio;
  return { width, height };
};

export interface IBrowserInfo extends BrowserInfo {
  isSupported: boolean;
  supportedVersion: string;
}

interface ISupportedVersions {
  [index: string]: string;
}

const supportedVersions: ISupportedVersions = {
  safari: "11.0.0",
  firefox: "59.0.0",
  chrome: "64.0.0",
  edge: "16.0.0"
};

export const detectBrowser = (): IBrowserInfo | null => {
  if (typeof document !== "undefined") {
    const browserInfo = detect();
    if (browserInfo) {
      const supportedVersion = supportedVersions[browserInfo.name];
      const isSupported =
        compareVersions(browserInfo.version, supportedVersion) >= 0;
      return {
        ...browserInfo,
        isSupported,
        supportedVersion
      };
    } else {
      return null;
    }
  } else {
    return null;
  }
};
