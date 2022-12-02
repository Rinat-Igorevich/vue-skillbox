export default function Declension(value) {
  const words = ['товар', 'товара', 'товаров'];
  // eslint-disable-next-line no-param-reassign
  value = Math.abs(value) % 100;
  const num = value % 10;
  if (value > 10 && value < 20) return `${value} ${words[2]}`;
  if (num > 1 && num < 5) return `${value} ${words[1]}`;
  if (num === 1) return `${value} ${words[0]}`;
  return `${value} ${words[2]}`;
}
