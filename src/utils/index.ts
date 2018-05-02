export const calcColumnLeftPosition = (
  colIndex: number = 0,
  numberOfItems: number = 5
) => {
  return `calc(calc(${colIndex *
    (1 / numberOfItems)} * calc(100vw - 40px)) + 20px)`;
};

export const closest = (item: number, items: number[]) =>
  items.reduce(function(prev, curr) {
    return Math.abs(curr - item) < Math.abs(prev - item) ? curr : prev;
  });
