import { IMediumPost } from "../src/types/index";
import * as htmlToText from "html-to-text";

let Parser = require("rss-parser");
const parser = new Parser();
const imgRegex = /<img.*?src="(.*?)"/;

export const fetchMediumPosts = async (): Promise<IMediumPost[]> => {
  const openRDNRfeedsUrl = `https://medium.com/feed/@openrndr`;
  const feed = await parser.parseURL(openRDNRfeedsUrl);

  return Promise.all(
    feed.items.map(async item => {
      const content = item["content:encoded"];
      const text = htmlToText.fromString(content, {
        ignoreImage: true,
        wordwrap: 800
      });

      const match = imgRegex.exec(content);
      const blurb = text
        .split("\n\n")
        .slice(0, 1)
        .join("\n");

      delete item["content:encoded"];

      return {
        ...item,
        imageUrl: match ? match[1] : null,
        blurb
      };
    })
  );
};
