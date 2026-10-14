import { useRef, useState, type FormEvent } from 'react';
import { CalendarCheck } from 'lucide-react';
import { branchRanges, businessTypes, timeSlots } from '@/data/options';
import { fallbackMailto, fallbackWhatsapp } from '@/lib/api';
import { useFormSubmit } from '@/lib/useFormSubmit';
import { useValidatedForm } from '@/lib/useValidatedForm';
import { email, maxLength, oneOf, personName, phone, required } from '@/lib/validation';
import { buttonClasses } from '@/components/ui/button';
import { Checkbox, SelectField, TextArea, TextInput } from '@/components/ui/FormControls';
import { FormFeedback } from './FormFeedback';

const ENDPOINT = import.meta.env.VITE_DEMO_ENDPOINT;
const ENDPOINT_KEY = 'VITE_DEMO_ENDPOINT';
const BUSINESS_TYPE_VALUES = businessTypes.map((option) => option.value);
const BRANCH_VALUES = branchRanges.map((option) => option.value);
const TIME_VALUES = timeSlots.map((option) => option.value);

type DemoFields = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  businessType: string;
  city: string;
  branches: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
};

const initialValues: DemoFields = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  businessType: '',
  city: '',
  branches: '',
  preferredDate: '',
  preferredTime: '',
  message: '',
};

function todayIso(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60_000).toISOString().slice(0, 10);
}

export function DemoForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState<string | undefined>();

  const form = useValidatedForm(initialValues, {
    fullName: [required('Full name'), personName('Full name'), maxLength(80)],
    email: [required('Email'), email()],
    phone: [required('Phone'), phone(false)],
    company: [required('Business name'), maxLength(100)],
    businessType: [required('Business type'), oneOf(BUSINESS_TYPE_VALUES, 'Business type')],
    city: [required('City'), maxLength(80)],
    branches: [required('Number of stores'), oneOf(BRANCH_VALUES, 'Number of stores')],
    preferredDate: [required('Preferred date')],
    preferredTime: [required('Preferred time'), oneOf(TIME_VALUES, 'Preferred time')],
    message: [maxLength(1200, 'Notes')],
  });

  const { status, message, fallbackLinks, submit } = useFormSubmit<Record<string, unknown>>({
    endpoint: ENDPOINT,
    formName: 'demo booking',
  });

  const payload = (): Record<string, unknown> => ({
    ...form.values,
    consent: true,
    source: 'website-demo-request',
    submittedAt: new Date().toISOString(),
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const honeypot = (event.currentTarget.elements.namedItem('company_website') as HTMLInputElement | null)?.value;
    if (honeypot) return;

    const validFields = form.validateAll();
    if (!consent) setConsentError('Please accept the privacy notice to continue.');
    else setConsentError(undefined);
    if (!validFields || !consent) {
      window.setTimeout(() => {
        formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      }, 0);
      return;
    }

    const data = payload();
    await submit(data, (value) => ({
      mailto: fallbackMailto('Demo request - NiteshPro POS', value),
      whatsapp: fallbackWhatsapp('New demo request:', value),
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
          placeholder="e.g. Rahul Verma"
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
          required
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
          required
          value={form.values.company}
          onChange={(e) => form.setField('company', e.target.value)}
          onBlur={() => form.handleBlur('company')}
          error={form.touched.company ? form.errors.company : undefined}
          placeholder="e.g. Verma Mart"
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

      <div className="grid gap-5 sm:grid-cols-3">
        <TextInput
          label="City"
          name="city"
          autoComplete="address-level2"
          required
          value={form.values.city}
          onChange={(e) => form.setField('city', e.target.value)}
          onBlur={() => form.handleBlur('city')}
          error={form.touched.city ? form.errors.city : undefined}
          placeholder="e.g. Jaipur"
        />
        <TextInput
          label="Preferred date"
          name="preferredDate"
          type="date"
          min={todayIso()}
          required
          value={form.values.preferredDate}
          onChange={(e) => form.setField('preferredDate', e.target.value)}
          onBlur={() => form.handleBlur('preferredDate')}
          error={form.touched.preferredDate ? form.errors.preferredDate : undefined}
        />
        <SelectField
          label="Preferred time"
          name="preferredTime"
          required
          placeholder="Select a slot"
          options={[...timeSlots]}
          value={form.values.preferredTime}
          onChange={(e) => form.setField('preferredTime', e.target.value)}
          onBlur={() => form.handleBlur('preferredTime')}
          error={form.touched.preferredTime ? form.errors.preferredTime : undefined}
        />
      </div>

      <TextArea
        label="What would you like to see in the demo?"
        name="message"
        value={form.values.message}
        onChange={(e) => form.setField('message', e.target.value)}
        onBlur={() => form.handleBlur('message')}
        error={form.touched.message ? form.errors.message : undefined}
        hint="A short note about your requirements. We will confirm the slot within one business day."
        placeholder="Billing, GST invoices, stock alerts and multi-store reports..."
      />

      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="company_website_demo">Leave this field empty</label>
        <input id="company_website_demo" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Checkbox
        label="I agree to be contacted to schedule this demo and accept the privacy notice."
        checked={consent}
        onChange={(e) => {
          setConsent(e.target.checked);
          if (e.target.checked) setConsentError(undefined);
        }}
        error={consentError}
      />

      <FormFeedback status={status} message={message} fallbackLinks={fallbackLinks} endpointEnvKey={ENDPOINT_KEY} />

      <button
        type="submit"
        disabled={submitting}
        className={buttonClasses({ variant: 'primary', size: 'lg', fullWidth: true })}
      >
        {submitting ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
            Booking...
          </>
        ) : (
          <>
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            Request my demo
          </>
        )}
      </button>
    </form>
  );
}
