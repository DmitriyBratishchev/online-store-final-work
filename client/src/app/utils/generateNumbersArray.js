export function generateNumbersArray(start, end, step = 1) {
  const arr = [];
  for (let i = start; i <= end; i += step) arr.push(i);
  return arr;
}
