import { paginate, split } from "../paginate";

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

  describe("when initialPageSize is supplied", () => {
    const initialPageSize = 6;
    const result = paginate(items, { buildUrl, pageSize, initialPageSize });
    test("the first page has length of initialPageSize", () => {
      expect(result[0].data).toHaveLength(initialPageSize);
    });
    test("the length of the rest of the pages is 'pageSize' or less", () => {
      const restOfLenghts = result
        .slice(1, result.length)
        .map(p => p.data.length);
      const largerThanPageSize = restOfLenghts.find(l => l > pageSize);
      expect(largerThanPageSize).not.toBeDefined();
    });
  });
});

describe("split", () => {
  describe("given usual input", () => {
    const index = 1;
    const list = [1, 2, 3];
    test("it works correctly", () => {
      const result = split(list, index);
      expect(result).toEqual([[1], [2, 3]]);
    });
  });
  describe("given input where index >= list.length-1 ", () => {
    test("it returns a list where result[0] is the input list and result[1] is empty", () => {
      const result = split([1, 2, 3], 10);
      expect(result).toEqual([[1, 2, 3], []]);
    });
  });
  describe("given input where index < 0", () => {
    test("it splits the list from the right hand side", () => {
      const result = split([1, 2, 3], -1);
      expect(result).toEqual([[1, 2], [3]]);
    });
  });
  describe("given input where list is empty", () => {
    test("it returns a list of two empty lists", () => {
      const result = split([], 1);
      expect(result).toEqual([[], []]);
    });
  });
});
