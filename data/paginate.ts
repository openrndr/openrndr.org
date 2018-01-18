import { chunk } from "lodash";
import { Entity, Paged } from "../src/types/index";
import * as crypto from "crypto";

const digest = (content: any) =>
  crypto
    .createHash("md5")
    .update(JSON.stringify(content))
    .digest("hex");

export function paginate<T extends Entity>(
  source: T[],
  buildUrl: (hash: string) => string,
  pageSize: number = 8
): Paged<T>[] {
  const chunkedData = chunk(source, pageSize).map((chunk, i) => {
    const hashDigest = digest(chunk);
    return {
      data: chunk,
      hash: digest(chunk)
    };
  });

  return chunkedData.map((chunk, i) => {
    const prevChunk = chunkedData[i - 1];
    const nextChunk = chunkedData[i + 1];
    return {
      ...chunk,
      current: buildUrl(chunk.hash),
      next: nextChunk ? buildUrl(nextChunk.hash) : null,
      prev: prevChunk ? buildUrl(prevChunk.hash) : null
    };
  });
}
