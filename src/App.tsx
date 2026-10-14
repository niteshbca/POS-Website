import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Home } from '@/pages/Home';

const Features = lazy(() => import('@/pages/Features').then((m) => ({ default: m.Features })));
const Solutions = lazy(() => import('@/pages/Solutions').then((m) => ({ default: m.Solutions })));
const Pricing = lazy(() => import('@/pages/Pricing').then((m) => ({ default: m.Pricing })));
const Integrations = lazy(() =>
  import('@/pages/Integrations').then((m) => ({ default: m.Integrations })),
);
const About = lazy(() => import('@/pages/About').then((m) => ({ default: m.About })));
const Contact = lazy(() => import('@/pages/Contact').then((m) => ({ default: m.Contact })));
const BookDemo = lazy(() => import('@/pages/BookDemo').then((m) => ({ default: m.BookDemo })));
const Login = lazy(() => import('@/pages/Login').then((m) => ({ default: m.Login })));
const GetStarted = lazy(() => import('@/pages/GetStarted').then((m) => ({ default: m.GetStarted })));
const Privacy = lazy(() => import('@/pages/Legal').then((m) => ({ default: m.Privacy })));
const Terms = lazy(() => import('@/pages/Legal').then((m) => ({ default: m.Terms })));
const Security = lazy(() => import('@/pages/Legal').then((m) => ({ default: m.Security })));
const NotFound = lazy(() => import('@/pages/NotFound').then((m) => ({ default: m.NotFound })));

function RouteFallback() {
  return (
    <div className="grid min-h-[60vh] place-items-center" role="status" aria-live="polite">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-navy-200 border-t-electric-600" />
      <span className="sr-only">Loading page…</span>
    </div>
  );
}

export function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="/*"
            element={
              <Suspense fallback={<RouteFallback />}>
                <Routes>
                  <Route path="features" element={<Features />} />
                  <Route path="solutions" element={<Solutions />} />
                  <Route path="pricing" element={<Pricing />} />
                  <Route path="integrations" element={<Integrations />} />
                  <Route path="about" element={<About />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="book-demo" element={<BookDemo />} />
                  <Route path="login" element={<Login />} />
                  <Route path="get-started" element={<GetStarted />} />
                  <Route path="privacy" element={<Privacy />} />
                  <Route path="terms" element={<Terms />} />
                  <Route path="security" element={<Security />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}
