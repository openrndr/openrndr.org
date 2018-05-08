export const calcColumnLeftPosition = (
  colIndex: number = 0,
  numberOfItems: number = 5
) => {
  const unit = `calc(calc(100vw - 40px) * 0.1)`;
  return `calc(20px + ${unit} + calc(${colIndex} * 2 * ${unit}) )`;
  // return `calc(calc(${z} * calc(80vw - 40px)) + 20px)`;
};

export const closest = (item: number, items: number[]) =>
  items.reduce((prev, curr) => {
    return Math.abs(curr - item) < Math.abs(prev - item) ? curr : prev;
  });
