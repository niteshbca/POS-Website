/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_CONTACT_PHONE?: string;
  readonly VITE_CONTACT_EMAIL?: string;
  readonly VITE_CONTACT_WHATSAPP?: string;
  readonly VITE_WHATSAPP_MESSAGE?: string;
  readonly VITE_WHATSAPP_TEMPLATE?: string;
  readonly VITE_COMPANY_ADDRESS?: string;
  readonly VITE_CONTACT_ENDPOINT?: string;
  readonly VITE_DEMO_ENDPOINT?: string;
  readonly VITE_NEWSLETTER_ENDPOINT?: string;
  readonly VITE_AUTH_LOGIN_ENDPOINT?: string;
  readonly VITE_AUTH_SIGNUP_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
