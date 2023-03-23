export default function convertMins(mins) {
  const h = Math.trunc(mins / 60);
  const min = mins % 60;
  return `${h}ч${min}м`;
}
