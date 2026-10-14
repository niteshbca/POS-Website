import { useState, type FormEvent } from 'react';
import { CheckCircle2, ExternalLink, MessageCircle } from 'lucide-react';
import { businessTypes, softwareNeeds } from '@/data/options';
import { site } from '@/config/site';
import { buildWhatsappMessage, openWhatsapp, whatsappUrlForMessage } from '@/lib/whatsapp';
import { useValidatedForm } from '@/lib/useValidatedForm';
import { maxLength, oneOf, personName, phone, required } from '@/lib/validation';
import { buttonClasses } from '@/components/ui/button';
import { SelectField, TextArea, TextInput } from '@/components/ui/FormControls';

const REQUIREMENT_VALUES = softwareNeeds.map((option) => option.value);
const BUSINESS_TYPE_VALUES = businessTypes.map((option) => option.value);

type ChatFields = {
  name: string;
  mobile: string;
  businessType: string;
  requirement: string;
  city: string;
  message: string;
};

const initialValues: ChatFields = {
  name: '',
  mobile: '',
  businessType: '',
  requirement: '',
  city: '',
  message: '',
};

export interface WhatsAppFormProps {
  /** Called after WhatsApp has been opened successfully. */
  onSent?: () => void;
  /** Prefill the "Looking for" field. */
  defaultRequirement?: string;
  /** Tighter spacing for the modal. */
  compact?: boolean;
}

export function WhatsAppForm({ onSent, defaultRequirement, compact }: WhatsAppFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'opened' | 'error'>('idle');
  const [manualUrl, setManualUrl] = useState<string>('');

  const form = useValidatedForm(
    { ...initialValues, requirement: defaultRequirement ?? '' },
    {
      name: [required('Name'), personName('Name'), maxLength(80)],
      mobile: [required('Mobile number'), phone(false)],
      businessType: [oneOf(['', ...BUSINESS_TYPE_VALUES], 'Business type')],
      requirement: [required('What you need'), oneOf(REQUIREMENT_VALUES, 'What you need')],
      city: [maxLength(80)],
      message: [maxLength(600, 'Message')],
    },
  );

  const buildFields = (): Record<string, string> => {
    const label = (values: readonly { value: string; label: string }[], value: string) =>
      values.find((option) => option.value === value)?.label ?? value;
    return {
      name: form.values.name,
      mobile: form.values.mobile,
      businessType: label(businessTypes, form.values.businessType),
      requirement: label(softwareNeeds, form.values.requirement),
      city: form.values.city,
      message: form.values.message,
    };
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.validateAll()) {
      window.setTimeout(() => document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(), 0);
      return;
    }

    setStatus('submitting');
    const composed = buildWhatsappMessage(site.contact.whatsappTemplate, buildFields());
    setManualUrl(whatsappUrlForMessage(composed));

    // Small delay so the loading state is perceptible, then hand off to WhatsApp.
    await new Promise((resolve) => window.setTimeout(resolve, 250));
    const opened = openWhatsapp(composed);
    setStatus(opened ? 'opened' : 'error');
    if (opened) onSent?.();
  };

  const submitting = status === 'submitting';

  if (status === 'opened') {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" aria-hidden="true" />
        <p className="mt-3 font-semibold text-emerald-900">WhatsApp is opening…</p>
        <p className="mt-1 text-sm text-emerald-800">
          Your details are ready to send. If nothing happened, use the button below.
        </p>
        <a
          href={manualUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses({ variant: 'whatsapp', size: 'md', className: 'mt-5' })}
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Open WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={compact ? 'space-y-4' : 'space-y-5'}>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextInput
          label="Your name"
          name="name"
          autoComplete="name"
          required
          value={form.values.name}
          onChange={(e) => form.setField('name', e.target.value)}
          onBlur={() => form.handleBlur('name')}
          error={form.touched.name ? form.errors.name : undefined}
          placeholder="e.g. Priya Sharma"
        />
        <TextInput
          label="Mobile number"
          name="mobile"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          value={form.values.mobile}
          onChange={(e) => form.setField('mobile', e.target.value)}
          onBlur={() => form.handleBlur('mobile')}
          error={form.touched.mobile ? form.errors.mobile : undefined}
          placeholder="+91 90000 00000"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField
          label="Business type"
          name="businessType"
          placeholder="Select business type"
          options={[...businessTypes]}
          value={form.values.businessType}
          onChange={(e) => form.setField('businessType', e.target.value)}
          onBlur={() => form.handleBlur('businessType')}
          error={form.touched.businessType ? form.errors.businessType : undefined}
        />
        <SelectField
          label="What do you need?"
          name="requirement"
          required
          placeholder="Select what you need"
          options={[...softwareNeeds]}
          value={form.values.requirement}
          onChange={(e) => form.setField('requirement', e.target.value)}
          onBlur={() => form.handleBlur('requirement')}
          error={form.touched.requirement ? form.errors.requirement : undefined}
        />
      </div>

      <TextInput
        label="City"
        name="city"
        autoComplete="address-level2"
        value={form.values.city}
        onChange={(e) => form.setField('city', e.target.value)}
        onBlur={() => form.handleBlur('city')}
        error={form.touched.city ? form.errors.city : undefined}
        placeholder="e.g. Jaipur"
      />

      <TextArea
        label="Message"
        name="message"
        rows={3}
        value={form.values.message}
        onChange={(e) => form.setField('message', e.target.value)}
        onBlur={() => form.handleBlur('message')}
        error={form.touched.message ? form.errors.message : undefined}
        placeholder="Tell us about your shop and what you'd like to achieve…"
      />

      {status === 'error' ? (
        <p role="alert" className="text-sm font-medium text-red-600">
          We could not open WhatsApp automatically. Use the button below.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className={buttonClasses({ variant: 'whatsapp', size: 'lg', fullWidth: true })}
      >
        {submitting ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
            Preparing your message…
          </>
        ) : (
          <>
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Send on WhatsApp
          </>
        )}
      </button>

      <p className="flex items-center justify-center gap-1.5 text-center text-xs text-navy-400">
        Opens WhatsApp with your details filled in — you can review before sending.
        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      </p>
    </form>
  );
}
