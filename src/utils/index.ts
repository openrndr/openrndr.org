export const calcColumnLeftPosition = (colIndex: number = 0) =>
  `calc(calc(${colIndex * 0.2} * calc(100vw - 40px)) + 20px)`;
