import { useCallback, useRef, useState } from 'react';
import { validate, type Validator } from './validation';

export type FormValues = Record<string, string>;
export type FormRules<F extends FormValues> = Partial<Record<keyof F, Validator<string>[]>>;
export type FormErrors<F extends FormValues> = Partial<Record<keyof F, string>>;

/**
 * Small, dependency-free controlled form helper with per-field validation.
 * Errors appear after a field is blurred or after a failed submit attempt.
 */
export function useValidatedForm<F extends FormValues>(initialValues: F, rules: FormRules<F>) {
  const initialRef = useRef(initialValues);
  const [values, setValues] = useState<F>(initialValues);
  const [errors, setErrors] = useState<FormErrors<F>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof F, boolean>>>({});

  const runField = useCallback(
    (field: keyof F, value: string): string | undefined => {
      const fieldRules = rules[field];
      return fieldRules ? validate(value, fieldRules) : undefined;
    },
    [rules],
  );

  const setField = useCallback(
    (field: keyof F, value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => (prev[field] ? { ...prev, [field]: runField(field, value) } : prev));
    },
    [runField],
  );

  const handleBlur = useCallback(
    (field: keyof F) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      setErrors((prev) => ({ ...prev, [field]: runField(field, values[field]) }));
    },
    [runField, values],
  );

  const validateAll = useCallback((): boolean => {
    const nextErrors: FormErrors<F> = {};
    const nextTouched: Partial<Record<keyof F, boolean>> = {};
    (Object.keys(values) as (keyof F)[]).forEach((field) => {
      nextTouched[field] = true;
      const error = runField(field, values[field]);
      if (error) nextErrors[field] = error;
    });
    setErrors(nextErrors);
    setTouched(nextTouched);
    return Object.keys(nextErrors).length === 0;
  }, [runField, values]);

  const reset = useCallback(() => {
    setValues(initialRef.current);
    setErrors({});
    setTouched({});
  }, []);

  return { values, errors, touched, setField, handleBlur, validateAll, reset, setErrors } as const;
}
