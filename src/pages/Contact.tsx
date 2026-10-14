import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useSeo } from '@/lib/seo';
import { mailtoHref, site, telHref } from '@/config/site';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/sections/PageHero';
import { ContactForm } from '@/components/forms/ContactForm';
import { WhatsAppSection } from '@/components/sections/WhatsAppSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { useWhatsAppModal } from '@/components/whatsapp/WhatsAppWidget';

export function Contact() {
  useSeo({
    title: 'Contact NiteshPro POS Software - +91 88107 51872',
    description:
      'Contact NiteshPro POS Software for Free Demo, Pricing, Support. Call/WhatsApp: +91 88107 51872 | Email: nitesh@niteshpro.in',
    path: '/contact',
  });

  const { openModal } = useWhatsAppModal();

  const channels = [
    {
      icon: Phone,
      title: 'Call us',
      value: site.contact.phoneDisplay,
      href: telHref() as string | undefined,
      description: 'Talk to sales or support during business hours.',
      external: false,
      modal: false,
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      value: 'Chat now',
      href: undefined as string | undefined,
      description: 'Fastest way to reach us — answer a few details and send.',
      external: true,
      modal: true,
    },
    {
      icon: Mail,
      title: 'Email',
      value: site.contact.email,
      href: mailtoHref() as string | undefined,
      description: 'Best for detailed requirements and documentation.',
      external: false,
      modal: false,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your business"
        description="Questions about features, pricing or migration? Reach us on your preferred channel or send us a message below."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <div className="space-y-4">
              {channels.map((channel) => {
                const cardClass =
                  'group flex w-full items-start gap-4 rounded-2xl border border-navy-100 bg-white p-5 text-left shadow-soft transition hover:-translate-y-0.5 hover:border-electric-200 hover:shadow-card';
                const inner = (
                  <>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-electric-600 to-violet-600 text-white">
                      <channel.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-navy-950">{channel.title}</p>
                      <p className="text-sm font-semibold text-electric-600">{channel.value}</p>
                      <p className="mt-1 text-xs text-navy-400">{channel.description}</p>
                    </div>
                  </>
                );

                return channel.modal ? (
                  <button key={channel.title} type="button" onClick={openModal} className={cardClass}>
                    {inner}
                  </button>
                ) : (
                  <a
                    key={channel.title}
                    href={channel.href}
                    {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className={cardClass}
                  >
                    {inner}
                  </a>
                );
              })}
            </div>

            <div className="mt-6 rounded-2xl border border-navy-100 bg-navy-50/60 p-5">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy-950 text-white">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-bold text-navy-950">Office</p>
                  <p className="mt-1 text-sm text-navy-500">{site.contact.address}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-navy-500">
                <Clock className="h-4 w-4 text-electric-600" aria-hidden="true" />
                {site.contact.hours}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-xl font-bold text-navy-950">Send us a message</h2>
            <p className="mt-1.5 text-sm text-navy-500">
              Fill in the form and our team will respond as soon as possible.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-navy-50/40">
        <WhatsAppSection />
      </Section>

      <Section>
        <FaqSection />
      </Section>
    </>
  );
}
