import { chunk } from "lodash";
import { Entity, Paged } from "../src/types/index";
import * as crypto from "crypto";
import { LoadResult } from "./fetch";

const digest = (content: any) =>
  crypto
    .createHash("md5")
    .update(JSON.stringify(content))
    .digest("hex");

const paginationParams = {
  source: any[]
};

export function paginate<T>(
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

// interface PaginationRules<T> {
//     [K in keyof T]: any;
// }

// interface PaginationRules {
//     [key in keyof LoadResult]: any;
// }

// type PaginationRules = {
//     [key in keyof LoadResult]: {
//         [k in keyof LoadResult[key]]: boolean;
//     } | boolean;
// };

interface PaginationRules {
  [key: string]: boolean | PaginationRules;
}

interface Paginatable {
  [key: string]: any[] | Paginatable;
}

export function paginateObject(data: Paginatable, rules: PaginationRules) {
  const result = Object.keys(rules).reduce((acc, key) => {
    const shouldPaginate = rules[key] === true;
    if (shouldPaginate) {
      return paginate(data[key]);
    }
  }, {});
}
