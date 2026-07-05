import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';
import HomePage from './routes/HomePage/HomePage';
import PortfolioPage from './routes/PortfolioPage/PortfolioPage';
import NotFoundPage from './routes/NotFoundPage/NotFoundPage';

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
  return <RouterProvider router={router} />;
}
