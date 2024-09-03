export function generateRandomMultiplier(): number {
  const min = 0.01;
  const max = 10.0;
  const randomMultiplier = Math.random() * (max - min) + min;
  return parseFloat(randomMultiplier.toFixed(2));
}