export type Validator<T> = (value: T) => string | undefined;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+]?[\d\s().-]{7,20}$/;
const NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M}'.\-\s]{1,79}$/u;

export function required(label = 'This field'): Validator<string> {
  return (value) => (value && value.trim().length > 0 ? undefined : `${label} is required.`);
}

export function minLength(min: number, label = 'This field'): Validator<string> {
  return (value) =>
    value.trim().length >= min ? undefined : `${label} must be at least ${min} characters.`;
}

export function maxLength(max: number, label = 'This field'): Validator<string> {
  return (value) =>
    value.trim().length <= max ? undefined : `${label} must be ${max} characters or fewer.`;
}

export function email(): Validator<string> {
  return (value) =>
    EMAIL_RE.test(value.trim()) ? undefined : 'Enter a valid email address, e.g. name@company.com.';
}

export function phone(optional = true): Validator<string> {
  return (value) => {
    if (!value.trim()) return optional ? undefined : 'A phone number is required.';
    return PHONE_RE.test(value.trim()) ? undefined : 'Enter a valid phone number.';
  };
}

export function personName(label = 'Name'): Validator<string> {
  return (value) =>
    NAME_RE.test(value.trim())
      ? undefined
      : `${label} should be 2-80 characters and contain only letters, spaces, apostrophes or hyphens.`;
}

export function oneOf<T extends string>(allowed: readonly T[], label = 'Value'): Validator<T | string> {
  return (value) =>
    allowed.includes(value as T) ? undefined : `${label} is not a valid option.`;
}

/** Runs a value through an ordered list of validators and returns the first error. */
export function validate<T>(value: T, validators: Validator<T>[]): string | undefined {
  for (const validator of validators) {
    const error = validator(value);
    if (error) return error;
  }
  return undefined;
}

/** Very small helper for composing a required + format validation. */
export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}
