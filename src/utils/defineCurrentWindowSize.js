export default function defineCurrentWindowSize(windowWidth) {
  if (windowWidth > 800) {
    return 'large';
  }
  if (windowWidth <= 800 && windowWidth > 500) {
    return 'medium';
  }
  return 'small';
}
