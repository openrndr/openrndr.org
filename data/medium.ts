import { IMediumPost } from "../src/types";
import * as htmlToText from "html-to-text";

const Parser = require("rss-parser");
const parser = new Parser();
const imgRegex = /<img.*?src="(.*?)"/;

export const fetchMediumPosts = async (): Promise<IMediumPost[]> => {
  const openRDNRfeedsUrl = `https://medium.com/feed/@openrndr`;
  const feed: { items: IMediumPost[] } = await parser
    .parseURL(openRDNRfeedsUrl)
    .catch(err => {
      return [];
    });

  return Promise.all(
    feed.items.map(async (item: IMediumPost) => {
      const content = item["content:encoded"];
      const cleanContent = content.replace(
        /<figcaption>(.*?)<\/figcaption>/g,
        ""
      );

      const text = htmlToText.fromString(cleanContent, {
        ignoreImage: true,
        wordwrap: 800
      });

      const match = imgRegex.exec(content);
      const blurb = text
        .split("\n\n")
        .slice(1, 3)
        .join("\n");

      item["content:encoded"] = "";

      return {
        ...item,
        imageUrl: match ? match[1] : null,
        blurb
      };
    })
  );
};
