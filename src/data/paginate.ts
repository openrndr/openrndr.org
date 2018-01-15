import { chunk } from "lodash";
import { Entity } from "src/types";

export interface Paged<T extends Entity> {
  data: T[];
  prev: string | null;
  next: string | null;
}

export function paginate<T extends Entity>(
  source: T[],
  buildUrl: (index: number) => string,
  pageSize: number = 8
): Paged<T>[] {
  const chunkedData = chunk(source, pageSize);
  return chunkedData.map((chunk, i) => {
    const prevIndex = i >= 1 ? i - 1 : null;
    const nextIndex = i + 1 < chunkedData.length - 1 ? i + 1 : null;
    return {
      data: chunk,
      next: nextIndex ? buildUrl(i) : null,
      prev: prevIndex ? buildUrl(i) : null
    };
  });
}
