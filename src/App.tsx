import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';
import HomePage from './routes/HomePage/HomePage';
import PortfolioPage from './routes/PortfolioPage/PortfolioPage';
import NotFoundPage from './routes/NotFoundPage/NotFoundPage';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { LocaleProvider } from './i18n/LocaleContext';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'portfolio', element: <PortfolioPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default function App() {
  return (
    <LocaleProvider>
      <RouterProvider router={router} />
      {/* Vercel Web Analytics + Core Web Vitals — both need enabling once in
          the Vercel project dashboard; they're inert in local dev. */}
      <Analytics />
      <SpeedInsights />
    </LocaleProvider>
  );
}
