//랜덤숫자부여
export const rRandom = (range) => {
  const min = Math.ceil(0);
  const max = Math.floor(range - 1);
  return Math.floor(Math.random() * (max - min)) + min;
};
