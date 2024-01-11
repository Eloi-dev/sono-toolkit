import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {modulesPages} from "../modules/modules.routes";
import {Gandalf} from "./services/gandalf.service";

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'authentication',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [Gandalf],
    children: [
      {path: '', redirectTo: 'limiter-threshold', pathMatch: 'full'},
      ...modulesPages
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class CoreRoutingModule {}
