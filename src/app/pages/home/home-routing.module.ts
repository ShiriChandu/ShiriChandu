  import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'ion-menu',
    pathMatch: 'full'
  },

  {
    path: 'ion-menu',
    loadChildren: () => import('../ion-menu/ion-menu.module').then( m => m.IonMenuPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
