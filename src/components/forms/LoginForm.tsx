import { useRef, useState, type FormEvent } from 'react';
import { Eye, EyeOff, Lock, LogIn } from 'lucide-react';
import { fallbackMailto, fallbackWhatsapp } from '@/lib/api';
import { useFormSubmit } from '@/lib/useFormSubmit';
import { useValidatedForm } from '@/lib/useValidatedForm';
import { email as emailRule, minLength, required } from '@/lib/validation';
import { buttonClasses } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/FormControls';
import { cx } from '@/lib/cx';
import { FormFeedback } from './FormFeedback';

const ENDPOINT = import.meta.env.VITE_AUTH_LOGIN_ENDPOINT;

type LoginFields = { email: string; password: string };
const initialValues: LoginFields = { email: '', password: '' };

function FloatingField({
  id,
  label,
  type = 'text',
  autoComplete,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  trailing,
}: {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  placeholder?: string;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-navy-800">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cx(
            'h-11 w-full rounded-xl border bg-white px-4 text-sm text-navy-900 shadow-sm transition placeholder:text-navy-300 focus:outline-none focus:ring-4',
            trailing && 'pr-11',
            error
              ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
              : 'border-navy-200 focus:border-electric-400 focus:ring-electric-100',
          )}
        />
        {trailing ? <div className="absolute inset-y-0 right-0 flex items-center pr-3">{trailing}</div> : null}
      </div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function LoginForm() {
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  const form = useValidatedForm(initialValues, {
    email: [required('Email'), emailRule()],
    password: [required('Password'), minLength(6, 'Password')],
  });

  const { status, message, fallbackLinks, submit } = useFormSubmit<Record<string, unknown>>({
    endpoint: ENDPOINT,
    formName: 'sign in',
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.validateAll()) {
      window.setTimeout(() => document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(), 0);
      return;
    }
    const data = { ...form.values, remember, submittedAt: new Date().toISOString() };
    await submit(data, (value) => ({
      mailto: fallbackMailto('Dashboard access request - NiteshPro POS', {
        email: value.email,
        note: 'I would like access to my NiteshPro POS dashboard.',
      }),
      whatsapp: fallbackWhatsapp('Dashboard access request:', { email: value.email }),
    }));
  };

  const submitting = status === 'submitting';

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <FloatingField
        id="login-email"
        label="Email address"
        type="email"
        autoComplete="email"
        placeholder="you@company.com"
        value={form.values.email}
        onChange={(value) => form.setField('email', value)}
        onBlur={() => form.handleBlur('email')}
        error={form.touched.email ? form.errors.email : undefined}
      />

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="login-password" className="text-sm font-semibold text-navy-800">
            Password
          </label>
          <a href="/contact" className="text-xs font-semibold text-electric-600 hover:text-electric-700">
            Trouble signing in?
          </a>
        </div>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-300" aria-hidden="true" />
          <input
            ref={passwordRef}
            id="login-password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Enter your password"
            value={form.values.password}
            onChange={(e) => form.setField('password', e.target.value)}
            onBlur={() => form.handleBlur('password')}
            aria-invalid={form.touched.password && form.errors.password ? true : undefined}
            aria-describedby={form.touched.password && form.errors.password ? 'login-password-error' : undefined}
            className={cx(
              'h-11 w-full rounded-xl border bg-white pl-11 pr-11 text-sm text-navy-900 shadow-sm transition placeholder:text-navy-300 focus:outline-none focus:ring-4',
              form.touched.password && form.errors.password
                ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                : 'border-navy-200 focus:border-electric-400 focus:ring-electric-100',
            )}
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
            className="absolute inset-y-0 right-0 grid w-11 place-items-center text-navy-400 transition hover:text-navy-700"
          >
            {showPassword ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
          </button>
        </div>
        {form.touched.password && form.errors.password ? (
          <p id="login-password-error" role="alert" className="text-xs font-medium text-red-600">
            {form.errors.password}
          </p>
        ) : null}
      </div>

      <div className="flex items-center justify-between">
        <Checkbox label="Keep me signed in" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
      </div>

      <FormFeedback
        status={status}
        message={message}
        fallbackLinks={fallbackLinks}
        endpointEnvKey="VITE_AUTH_LOGIN_ENDPOINT"
      />

      <button type="submit" disabled={submitting} className={buttonClasses({ variant: 'primary', size: 'lg', fullWidth: true })}>
        {submitting ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
            Signing in...
          </>
        ) : (
          <>
            <LogIn className="h-4 w-4" aria-hidden="true" />
            Sign in to dashboard
          </>
        )}
      </button>
    </form>
  );
}
