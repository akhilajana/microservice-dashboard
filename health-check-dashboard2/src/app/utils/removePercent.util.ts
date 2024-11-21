export function removePercent(value: string): string {
    if (!value) return value;
    return value.replace('%', '');
  }