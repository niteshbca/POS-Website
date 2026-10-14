import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { useSeo } from '@/lib/seo';
import { site } from '@/config/site';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/sections/PageHero';

function LegalLayout({
  title,
  eyebrow,
  path,
  updated,
  children,
}: {
  title: string;
  eyebrow: string;
  path: string;
  updated: string;
  children: ReactNode;
}) {
  useSeo({ title, description: `${title} for ${site.brand.name}.`, path });
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={`Last updated: ${updated}`} />
      <Section>
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <p>
              This is a template placeholder. Have it reviewed by a qualified legal professional and
              adapt it to your business, jurisdiction and data practices before publishing.
            </p>
          </div>
          <div className="space-y-8 text-sm leading-relaxed text-navy-600">{children}</div>
          <div className="mt-12 border-t border-navy-100 pt-6 text-sm">
            <p className="text-navy-500">
              Questions? Contact us at{' '}
              <a href={`mailto:${site.contact.email}`} className="font-semibold text-electric-600">
                {site.contact.email}
              </a>
              .
            </p>
            <Link to="/contact" className="link-underline mt-3 text-sm">
              Go to contact page
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}

function Clause({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-bold text-navy-950">{heading}</h2>
      <div className="mt-2 space-y-2 text-navy-600">{children}</div>
    </section>
  );
}

export function Privacy() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Privacy Policy"
      path="/privacy"
      updated="14 October 2026"
    >
      <Clause heading="1. Information we collect">
        <p>
          We collect information you provide directly (such as your name, business name, email, phone
          number and the contents of your enquiry) and information generated as you use the platform
          and website.
        </p>
      </Clause>
      <Clause heading="2. How we use information">
        <p>
          We use your information to respond to enquiries, provide and improve the service, process
          account requests, communicate about our products and comply with legal obligations.
        </p>
      </Clause>
      <Clause heading="3. Sharing">
        <p>
          We do not sell your personal information. We may share it with service providers who help us
          operate the platform, subject to appropriate confidentiality obligations, or where required by law.
        </p>
      </Clause>
      <Clause heading="4. Data retention">
        <p>
          We retain information for as long as needed to provide the service and meet legal requirements.
          Retention periods should be tailored to your business and jurisdiction.
        </p>
      </Clause>
      <Clause heading="5. Your rights">
        <p>
          Depending on your location, you may have rights to access, correct or delete your personal
          information. Contact us to exercise these rights.
        </p>
      </Clause>
      <Clause heading="6. Contact">
        <p>For privacy questions, email {site.contact.email}.</p>
      </Clause>
    </LegalLayout>
  );
}

export function Terms() {
  return (
    <LegalLayout eyebrow="Legal" title="Terms of Service" path="/terms" updated="14 October 2026">
      <Clause heading="1. Acceptance of terms">
        <p>
          By accessing or using {site.brand.name}, you agree to these terms. If you do not agree, do not
          use the service.
        </p>
      </Clause>
      <Clause heading="2. Use of the service">
        <p>
          You agree to use the service in accordance with applicable laws and not to misuse it, attempt
          unauthorised access, or interfere with its operation.
        </p>
      </Clause>
      <Clause heading="3. Accounts">
        <p>
          You are responsible for maintaining the confidentiality of your account credentials and for
          activity that occurs under your account.
        </p>
      </Clause>
      <Clause heading="4. Fees and billing">
        <p>
          Paid plans are billed according to the plan you select. Indicative pricing on this website is
          not a binding offer. Taxes may apply.
        </p>
      </Clause>
      <Clause heading="5. Intellectual property">
        <p>
          The service and its content are owned by {site.brand.company} and its licensors and are
          protected by applicable laws.
        </p>
      </Clause>
      <Clause heading="6. Limitation of liability">
        <p>
          To the extent permitted by law, {site.brand.company} is not liable for indirect or
          consequential damages arising from use of the service.
        </p>
      </Clause>
      <Clause heading="7. Changes">
        <p>We may update these terms from time to time. Continued use constitutes acceptance.</p>
      </Clause>
    </LegalLayout>
  );
}

export function Security() {
  return (
    <LegalLayout eyebrow="Trust" title="Security" path="/security" updated="14 October 2026">
      <Clause heading="Our approach">
        <p>
          Security is designed into {site.brand.name} with the goal of protecting your business data.
          Below is a general description of areas we focus on.
        </p>
      </Clause>
      <Clause heading="Access control">
        <p>
          Role-based permissions and authenticated access help ensure each staff member only reaches the
          data and actions they are permitted to use.
        </p>
      </Clause>
      <Clause heading="Data protection">
        <p>
          We design the platform to protect data in transit and at rest and follow industry practices in
          our development and operations.
        </p>
      </Clause>
      <Clause heading="Backups">
        <p>Regular backups and restore options are part of our commitment to business continuity.</p>
      </Clause>
      <Clause heading="Transparency">
        <p>
          We do not claim certifications or guarantees we do not hold. If you need a security review,
          questionnaire response or contractual commitments, contact our team and we will respond
          accurately.
        </p>
      </Clause>
      <Clause heading="Report a concern">
        <p>To report a security concern, email {site.contact.email}.</p>
      </Clause>
    </LegalLayout>
  );
}
