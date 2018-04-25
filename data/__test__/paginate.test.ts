import { paginate } from "../paginate";

describe("paginate", () => {
  const itemCount = 100;
  const pageSize = 5;
  const items = Array.from({ length: itemCount }, (_, key) => key);
  const buildUrl = (hash: string) => `/api/${hash}`;
  const result = paginate(items, { buildUrl, pageSize });
  test("number of pages is", () => {
    const expectedPages = itemCount / pageSize;
    expect(result).toHaveLength(expectedPages);
  });

  test("length of pages is correct", () => {
    result.forEach(page => {
      expect(page.data).toHaveLength(pageSize);
    });
  });

  test("first item's prev reference is null", () => {
    expect(result[0].prev).toBeNull();
  });

  test("last item's prev reference is null", () => {
    expect(result[result.length - 1].next).toBeNull();
  });

  test("next references are correct", () => {
    result.slice(0, result.length - 1).forEach((page, i) => {
      expect(page.next).toEqual(result[i + 1].current);
    });
  });

  test("prev references are correct", () => {
    const [_, ...tail] = result;
    tail.forEach((page, i) => {
      expect(page.prev).toEqual(result[i].current);
    });
  });
});
