import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteGuardService } from '../shared/service/route-guard.service';
import { DetailComponent } from './detail/detail.component';

import { HomeComponent } from './home.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'main' },
      {
        path: 'main',
        component: MainComponent,
        canActivate: [RouteGuardService],
      },
      {
        path: 'detail',
        component: DetailComponent,
        canActivate: [RouteGuardService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
