type ClassValue = string | number | false | null | undefined;

/** Tiny classname joiner (avoids a runtime dependency). */
export function cx(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ');
}
