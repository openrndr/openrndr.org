import { chunk } from "lodash";
import { Paged } from "../src/types/index";
import { digest } from "./digest";

export interface PaginationRule {
  buildUrl: (key: string) => string;
  initialPageSize?: number;
  pageSize: number;
}

export function split<T>(list: T[], index: number) {
  return [list.slice(0, index), list.slice(index, list.length)];
}

export function paginate<T>(
  source: T[],
  { buildUrl, initialPageSize: _initialPageSize, pageSize }: PaginationRule
): Paged<T>[] {
  const initialPageSize = _initialPageSize || pageSize;

  const [initialChunk, rest] = split(source, initialPageSize);
  const chunkedData = [
    {
      data: initialChunk,
      hash: digest(initialChunk)
    }
  ].concat(
    chunk(rest, pageSize).map((chunk, i) => {
      return {
        data: chunk,
        hash: digest(chunk)
      };
    })
  );

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
