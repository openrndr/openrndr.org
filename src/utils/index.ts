export const calcColumnLeftPosition = (
  colIndex: number = 0,
  numberOfItems: number = 5
) => {
  const unit = calcColumnUnit();
  return numberOfItems >= 5
    ? `calc(20px + ${unit} + calc(${colIndex} * 2 * ${unit}) )`
    : `calc(calc(${(colIndex + 1) *
        (1 / numberOfItems)} * calc(100vw - 40px)) + 20px)`;
};

export const calcColumnUnit = (numberOfItems: number = 5) => {
  return numberOfItems >= 5
    ? `calc(calc(100vw - 40px) * 0.1)`
    : `calc(calc(100vw - 40px) * 0.166665)`;
};

export const closest = (item: number, items: number[]) =>
  items.reduce((prev, curr) => {
    return Math.abs(curr - item) < Math.abs(prev - item) ? curr : prev;
  });
