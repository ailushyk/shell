import React, { Suspense } from 'react';
import { Space } from 'ui/elements';
import { Loading } from './components/Loading';

const DashboardPage = React.lazy(() => {
  return Promise.all([
    import('dashboard/DashboardPage'),
    new Promise((resolve) => setTimeout(resolve, 500)),
  ]).then(([moduleExports]) => moduleExports);
});

const App = () => (
  <Space>
    <Suspense fallback={<Loading />}>
      <DashboardPage />
    </Suspense>
  </Space>
);

export default App;
