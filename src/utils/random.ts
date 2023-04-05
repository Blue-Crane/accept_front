export const getRandomInRange = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export const getRandomIntInRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);
