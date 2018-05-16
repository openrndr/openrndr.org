export const calcColumnLeftPosition = (
  colIndex: number = 0,
  numberOfItems: number = 5
) => {
  const unit = calcColumnUnit(numberOfItems);

  return numberOfItems >= 5
    ? `calc(20px + ${unit} + calc(${colIndex} * 2 * ${unit}) )`
    : `calc( ${calcColumnSequence(colIndex)} * ${unit} + 20px)`;
};

export const calcColumnUnit = (numberOfItems: number = 5) => {
  return numberOfItems >= 5
    ? `calc(calc(100vw - 40px) * 0.1)`
    : `calc(calc(100vw - 40px) * 0.2)`;
};

export const closest = (item: number, items: number[]) =>
  items.reduce((prev, curr) => {
    return Math.abs(curr - item) < Math.abs(prev - item) ? curr : prev;
  });

// column sequence for tablet 0,1,3,5,7,...
const calcColumnSequence = (n: number): number => (n <= 1 ? n : n + n - 1);
