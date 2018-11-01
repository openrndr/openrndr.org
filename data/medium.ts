import { IMediumPost } from "../src/types/index";
import * as htmlToText from "html-to-text";

const Parser = require("rss-parser");
const parser = new Parser();
const imgRegex = /<img.*?src="(.*?)"/;

export const fetchMediumPosts = async (): Promise<IMediumPost | any[]> => {
  const openRDNRfeedsUrl = `https://medium.com/feed/@openrndr`;
  const feed: { items: object[] }[] = await parser.parseURL(openRDNRfeedsUrl);

  return Promise.all(
    //@ts-ignore
    feed.items.map(async item => {
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

      delete item["content:encoded"];

      return {
        ...item,
        imageUrl: match ? match[1] : null,
        blurb
      };
    })
  );
};
