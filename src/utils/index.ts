export const calcColumnLeftPosition = (colIndex: number = 0) =>
  `calc(calc(${colIndex * 0.2} * calc(100vw - 40px)) + 20px)`;

export const closest = (item: number, items: number[]) =>
  items.reduce(function(prev, curr) {
    return Math.abs(curr - item) < Math.abs(prev - item) ? curr : prev;
  });
