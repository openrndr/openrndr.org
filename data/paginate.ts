import { chunk } from "lodash";
import { Paged } from "../src/types/index";
import { digest } from "./digest";

export interface PaginationRule {
  buildUrl: (key: string) => string;
  pageSize: number;
}

export function paginate<T>(
  source: T[],
  { buildUrl, pageSize }: PaginationRule
): Paged<T>[] {
  const chunkedData = chunk(source, pageSize).map((chunk, i) => {
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
