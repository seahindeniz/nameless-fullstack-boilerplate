export default function isColorSchemeDark(): boolean {
  return Boolean(window.matchMedia?.('(prefers-color-scheme: dark)')?.matches);
}
