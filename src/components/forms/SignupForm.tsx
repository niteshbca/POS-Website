import { useState, type FormEvent } from 'react';
import { UserPlus } from 'lucide-react';
import { branchRanges, businessTypes } from '@/data/options';
import { fallbackMailto, fallbackWhatsapp } from '@/lib/api';
import { useFormSubmit } from '@/lib/useFormSubmit';
import { useValidatedForm } from '@/lib/useValidatedForm';
import { email as emailRule, maxLength, minLength, oneOf, personName, phone, required } from '@/lib/validation';
import { buttonClasses } from '@/components/ui/button';
import { Checkbox, SelectField, TextInput } from '@/components/ui/FormControls';
import { FormFeedback } from './FormFeedback';

const ENDPOINT = import.meta.env.VITE_AUTH_SIGNUP_ENDPOINT;
const BUSINESS_TYPE_VALUES = businessTypes.map((option) => option.value);
const BRANCH_VALUES = branchRanges.map((option) => option.value);

type SignupFields = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  businessType: string;
  branches: string;
  password: string;
};

const initialValues: SignupFields = {
  fullName: '',
  company: '',
  email: '',
  phone: '',
  businessType: '',
  branches: '',
  password: '',
};

export function SignupForm() {
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState<string | undefined>();

  const form = useValidatedForm(initialValues, {
    fullName: [required('Full name'), personName('Full name'), maxLength(80)],
    company: [required('Business name'), maxLength(100)],
    email: [required('Email'), emailRule()],
    phone: [required('Phone'), phone(false)],
    businessType: [required('Business type'), oneOf(BUSINESS_TYPE_VALUES, 'Business type')],
    branches: [required('Number of stores'), oneOf(BRANCH_VALUES, 'Number of stores')],
    password: [required('Password'), minLength(8, 'Password')],
  });

  const { status, message, fallbackLinks, submit } = useFormSubmit<Record<string, unknown>>({
    endpoint: ENDPOINT,
    formName: 'sign up',
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const valid = form.validateAll();
    if (!consent) setConsentError('Please accept the terms to create an account.');
    else setConsentError(undefined);
    if (!valid || !consent) {
      window.setTimeout(() => document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(), 0);
      return;
    }

    const data = {
      ...form.values,
      consent: true,
      source: 'website-signup',
      submittedAt: new Date().toISOString(),
    };
    await submit(data, (value) => {
      // Never include the password in email / WhatsApp fallbacks.
      const safe = { ...value };
      delete safe.password;
      return {
        mailto: fallbackMailto('Account request - NiteshPro POS', safe),
        whatsapp: fallbackWhatsapp('New account request:', safe),
      };
    });
  };

  const submitting = status === 'submitting';

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput
          label="Full name"
          name="fullName"
          autoComplete="name"
          required
          value={form.values.fullName}
          onChange={(e) => form.setField('fullName', e.target.value)}
          onBlur={() => form.handleBlur('fullName')}
          error={form.touched.fullName ? form.errors.fullName : undefined}
          placeholder="e.g. Anjali Nair"
        />
        <TextInput
          label="Business name"
          name="company"
          autoComplete="organization"
          required
          value={form.values.company}
          onChange={(e) => form.setField('company', e.target.value)}
          onBlur={() => form.handleBlur('company')}
          error={form.touched.company ? form.errors.company : undefined}
          placeholder="e.g. Nair Traders"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput
          label="Work email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={form.values.email}
          onChange={(e) => form.setField('email', e.target.value)}
          onBlur={() => form.handleBlur('email')}
          error={form.touched.email ? form.errors.email : undefined}
          placeholder="you@company.com"
        />
        <TextInput
          label="Phone / WhatsApp"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          value={form.values.phone}
          onChange={(e) => form.setField('phone', e.target.value)}
          onBlur={() => form.handleBlur('phone')}
          error={form.touched.phone ? form.errors.phone : undefined}
          placeholder="+91 90000 00000"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          label="Business type"
          name="businessType"
          required
          placeholder="Select business type"
          options={[...businessTypes]}
          value={form.values.businessType}
          onChange={(e) => form.setField('businessType', e.target.value)}
          onBlur={() => form.handleBlur('businessType')}
          error={form.touched.businessType ? form.errors.businessType : undefined}
        />
        <SelectField
          label="Number of stores"
          name="branches"
          required
          placeholder="Select number of stores"
          options={[...branchRanges]}
          value={form.values.branches}
          onChange={(e) => form.setField('branches', e.target.value)}
          onBlur={() => form.handleBlur('branches')}
          error={form.touched.branches ? form.errors.branches : undefined}
        />
      </div>

      <TextInput
        label="Create a password"
        name="password"
        type="password"
        autoComplete="new-password"
        required
        value={form.values.password}
        onChange={(e) => form.setField('password', e.target.value)}
        onBlur={() => form.handleBlur('password')}
        error={form.touched.password ? form.errors.password : undefined}
        hint="At least 8 characters. Passwords are only sent to your configured auth endpoint."
        placeholder="Minimum 8 characters"
      />

      <Checkbox
        label="I agree to the terms of service and privacy policy, and consent to being contacted about my account."
        checked={consent}
        onChange={(e) => {
          setConsent(e.target.checked);
          if (e.target.checked) setConsentError(undefined);
        }}
        error={consentError}
      />

      <FormFeedback
        status={status}
        message={message}
        fallbackLinks={fallbackLinks}
        endpointEnvKey="VITE_AUTH_SIGNUP_ENDPOINT"
      />

      <button type="submit" disabled={submitting} className={buttonClasses({ variant: 'primary', size: 'lg', fullWidth: true })}>
        {submitting ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
            Creating account...
          </>
        ) : (
          <>
            <UserPlus className="h-4 w-4" aria-hidden="true" />
            Create my account
          </>
        )}
      </button>
    </form>
  );
}
