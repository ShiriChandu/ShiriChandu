import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeesProjectwisePage } from './employees-projectwise.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeesProjectwisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeesProjectwisePageRoutingModule {}
