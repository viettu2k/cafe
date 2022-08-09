import { RouteGuardService } from './../services/route-guard/route-guard.service';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';

export const MaterialRoutes: Routes = [
  {
    path: 'category',
    component: ManageCategoryComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin'],
    },
  },
];
