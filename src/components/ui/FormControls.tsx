import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react';
import { AlertCircle } from 'lucide-react';
import { cx } from '@/lib/cx';

const controlBase =
  'w-full rounded-xl border bg-white px-4 text-sm text-navy-900 shadow-sm transition placeholder:text-navy-300 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:bg-navy-50';

function stateClasses(hasError: boolean): string {
  return hasError
    ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
    : 'border-navy-200 focus:border-electric-400 focus:ring-electric-100';
}

interface FieldShellProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  tone?: 'light' | 'dark';
  children: ReactNode;
  className?: string;
}

function FieldShell({ id, label, error, hint, required, tone = 'light', children, className }: FieldShellProps) {
  return (
    <div className={cx('space-y-1.5', className)}>
      <label
        htmlFor={id}
        className={cx(
          'flex items-center gap-1 text-sm font-semibold',
          tone === 'dark' ? 'text-navy-100' : 'text-navy-800',
        )}
      >
        {label}
        {required ? (
          <span aria-hidden="true" className="text-electric-500">
            *
          </span>
        ) : (
          <span className="text-xs font-normal text-navy-400">(optional)</span>
        )}
      </label>
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-center gap-1.5 text-xs font-medium text-red-600"
        >
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-navy-400">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label: string;
  error?: string;
  hint?: string;
  tone?: 'light' | 'dark';
  wrapperClassName?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  { label, error, hint, tone = 'light', wrapperClassName, className, required, ...props },
  ref,
) {
  const id = useId();
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : '';

  return (
    <FieldShell
      id={id}
      label={label}
      error={error}
      hint={hint}
      required={required}
      tone={tone}
      className={wrapperClassName}
    >
      <input
        ref={ref}
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={cx(controlBase, stateClasses(Boolean(error)), 'h-11', className)}
        {...props}
      />
    </FieldShell>
  );
});

export interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  label: string;
  error?: string;
  hint?: string;
  tone?: 'light' | 'dark';
  wrapperClassName?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { label, error, hint, tone = 'light', wrapperClassName, className, required, rows = 5, ...props },
  ref,
) {
  const id = useId();
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : '';

  return (
    <FieldShell
      id={id}
      label={label}
      error={error}
      hint={hint}
      required={required}
      tone={tone}
      className={wrapperClassName}
    >
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={cx(controlBase, stateClasses(Boolean(error)), 'py-3', className)}
        {...props}
      />
    </FieldShell>
  );
});

export interface SelectFieldProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id'> {
  label: string;
  error?: string;
  hint?: string;
  tone?: 'light' | 'dark';
  wrapperClassName?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(function SelectField(
  { label, error, hint, tone = 'light', wrapperClassName, className, required, options, placeholder, ...props },
  ref,
) {
  const id = useId();
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : '';

  return (
    <FieldShell
      id={id}
      label={label}
      error={error}
      hint={hint}
      required={required}
      tone={tone}
      className={wrapperClassName}
    >
      <select
        ref={ref}
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={cx(controlBase, stateClasses(Boolean(error)), 'h-11 appearance-none pr-10', className)}
        {...props}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
});

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode;
  error?: string;
  tone?: 'light' | 'dark';
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, error, tone = 'light', className, ...props },
  ref,
) {
  const id = useId();
  return (
    <div className="space-y-1">
      <div className="flex items-start gap-3">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          className={cx(
            'mt-0.5 h-4 w-4 shrink-0 rounded border-navy-300 text-electric-600 focus:ring-electric-500',
            className,
          )}
          {...props}
        />
        <label
          htmlFor={id}
          className={cx('text-sm leading-snug', tone === 'dark' ? 'text-navy-200' : 'text-navy-600')}
        >
          {label}
        </label>
      </div>
      {error ? (
        <p role="alert" className="pl-7 text-xs font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
});
