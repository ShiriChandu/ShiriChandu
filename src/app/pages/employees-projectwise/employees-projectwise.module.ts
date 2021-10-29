import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeesProjectwisePageRoutingModule } from './employees-projectwise-routing.module';

import { EmployeesProjectwisePage } from './employees-projectwise.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeesProjectwisePageRoutingModule
  ],
  declarations: [EmployeesProjectwisePage]
})
export class EmployeesProjectwisePageModule {}
