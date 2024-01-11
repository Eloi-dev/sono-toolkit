import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LimiterThresholdPage } from './limiter-threshold.page';

const routes: Routes = [
  {
    path: '',
    component: LimiterThresholdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LimiterThresholdPageRoutingModule {}
