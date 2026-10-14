import { useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';
import { businessTypes } from '@/data/options';
import { fallbackMailto, fallbackWhatsapp } from '@/lib/api';
import { useFormSubmit } from '@/lib/useFormSubmit';
import { useValidatedForm } from '@/lib/useValidatedForm';
import { email, maxLength, minLength, oneOf, personName, phone, required } from '@/lib/validation';
import { buttonClasses } from '@/components/ui/button';
import { Checkbox, SelectField, TextArea, TextInput } from '@/components/ui/FormControls';
import { FormFeedback } from './FormFeedback';

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT;
const ENDPOINT_KEY = 'VITE_CONTACT_ENDPOINT';
const BUSINESS_TYPE_VALUES = businessTypes.map((option) => option.value);

type ContactFields = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  businessType: string;
  message: string;
};

const initialValues: ContactFields = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  businessType: '',
  message: '',
};

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState<string | undefined>();

  const form = useValidatedForm(initialValues, {
    fullName: [required('Full name'), personName('Full name'), maxLength(80)],
    email: [required('Email'), email()],
    phone: [phone(true)],
    company: [maxLength(100)],
    businessType: [required('Business type'), oneOf(BUSINESS_TYPE_VALUES, 'Business type')],
    message: [required('Message'), minLength(10, 'Message'), maxLength(1200, 'Message')],
  });

  const { status, message, fallbackLinks, submit } = useFormSubmit<Record<string, unknown>>({
    endpoint: ENDPOINT,
    formName: 'contact',
  });

  const focusFirstInvalid = () => {
    window.setTimeout(() => {
      formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    }, 0);
  };

  const payload = (): Record<string, unknown> => ({
    ...form.values,
    consent: true,
    source: 'website-contact-form',
    page: typeof window !== 'undefined' ? window.location.pathname : '',
    submittedAt: new Date().toISOString(),
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const honeypot = (event.currentTarget.elements.namedItem('company_website') as HTMLInputElement | null)?.value;
    if (honeypot) return; // silently drop bot submissions

    const validFields = form.validateAll();
    const validConsent = consent;
    if (!validConsent) setConsentError('Please accept the privacy notice to continue.');
    else setConsentError(undefined);
    if (!validFields || !validConsent) {
      focusFirstInvalid();
      return;
    }

    const data = payload();
    await submit(data, (value) => ({
      mailto: fallbackMailto('Website enquiry - NiteshPro POS', value),
      whatsapp: fallbackWhatsapp('New website enquiry:', value),
    }));
  };

  const submitting = status === 'submitting';

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
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
          placeholder="e.g. Priya Sharma"
        />
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
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput
          label="Phone / WhatsApp"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={form.values.phone}
          onChange={(e) => form.setField('phone', e.target.value)}
          onBlur={() => form.handleBlur('phone')}
          error={form.touched.phone ? form.errors.phone : undefined}
          placeholder="+91 90000 00000"
        />
        <TextInput
          label="Business name"
          name="company"
          autoComplete="organization"
          value={form.values.company}
          onChange={(e) => form.setField('company', e.target.value)}
          onBlur={() => form.handleBlur('company')}
          error={form.touched.company ? form.errors.company : undefined}
          placeholder="e.g. Sharma Supermart"
        />
      </div>

      <SelectField
        label="Business type"
        name="businessType"
        required
        placeholder="Select your business type"
        options={[...businessTypes]}
        value={form.values.businessType}
        onChange={(e) => form.setField('businessType', e.target.value)}
        onBlur={() => form.handleBlur('businessType')}
        error={form.touched.businessType ? form.errors.businessType : undefined}
      />

      <TextArea
        label="How can we help?"
        name="message"
        required
        value={form.values.message}
        onChange={(e) => form.setField('message', e.target.value)}
        onBlur={() => form.handleBlur('message')}
        error={form.touched.message ? form.errors.message : undefined}
        hint="Tell us about your stores, current billing setup or the features you need."
        placeholder="We run two grocery stores and need GST billing with stock tracking..."
      />

      {/* Honeypot: hidden from users, catches basic spam bots */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="company_website">Leave this field empty</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Checkbox
        label={
          <>
            I agree to be contacted about NiteshPro POS and accept the{' '}
            <Link to="/privacy" className="font-semibold text-electric-600 underline">
              privacy policy
            </Link>
            .
          </>
        }
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
        endpointEnvKey={ENDPOINT_KEY}
      />

      <button
        type="submit"
        disabled={submitting}
        className={buttonClasses({ variant: 'primary', size: 'lg', fullWidth: true })}
      >
        {submitting ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            Send message
          </>
        )}
      </button>
    </form>
  );
}
