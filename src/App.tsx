import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DelayedFallback } from './components/AppLoader/DelayedFallback';
import { ChakraProvider } from '@chakra-ui/react';

const DashboardPage = React.lazy(() => {
  return Promise.all([
    import('dashboard/DashboardPage'),
    new Promise((resolve) => setTimeout(resolve, 1500)),
  ]).then(([moduleExports]) => moduleExports);
});
// const App1Page = React.lazy(() => import('app1/App1Page'));
const App2Page = React.lazy(() => import('app2/App2Page'));
const NotFound = React.lazy(() => import('ui/NotFound'));

const App = () => {
  return (
    <ChakraProvider>
      <Suspense fallback={<DelayedFallback />}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            {/*<Route path="/app1" element={<App1Page />} />*/}
            <Route path="app2" element={<App2Page />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </ChakraProvider>
  );
};

export default App;
