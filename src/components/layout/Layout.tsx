import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import { FloatingActions } from './FloatingActions';
import { MobileActionBar } from './MobileActionBar';
import { ScrollToTop } from './ScrollToTop';
import { WhatsAppProvider } from '@/components/whatsapp/WhatsAppWidget';

export function Layout() {
  return (
    <WhatsAppProvider>
      <div className="flex min-h-screen flex-col bg-white pb-[68px] lg:pb-0">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-navy-950 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <ScrollToTop />
        <Header />
        <main id="main-content" className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <FloatingActions />
        <MobileActionBar />
      </div>
    </WhatsAppProvider>
  );
}
