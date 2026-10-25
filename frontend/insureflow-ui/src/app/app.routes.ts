import { Routes } from '@angular/router';

import { Layout } from './layout/layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Policies } from './pages/policies/policies';
import { Claims } from './pages/claims/claims';
import { Payments } from './pages/payments/payments';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        component: Dashboard,
        data: { title: 'Dashboard' },
      },
      {
        path: 'policies',
        component: Policies,
        data: { title: 'My Policies' },
      },
      {
        path: 'claims',
        component: Claims,
        data: { title: 'Claims' },
      },
      {
        path: 'payments',
        component: Payments,
        data: { title: 'Payments' },
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
