export const calcColumnLeftPosition = (
  colIndex: number = 0,
  numberOfItems: number = 5
) => {
  const unit = `calc(calc(100vw - 40px) * 0.1)`;
  return numberOfItems >=5 ?
      `calc(20px + ${unit} + calc(${colIndex} * 2 * ${unit}) )`
          : `calc(calc(${(colIndex+1) * (1 / numberOfItems)} * calc(100vw - 40px)) + 20px)`;
};

export const closest = (item: number, items: number[]) =>
  items.reduce((prev, curr) => {
    return Math.abs(curr - item) < Math.abs(prev - item) ? curr : prev;
  });
