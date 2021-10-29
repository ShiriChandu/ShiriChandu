import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddProjectsPageRoutingModule } from './add-projects-routing.module';

import { AddProjectsPage } from './add-projects.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddProjectsPageRoutingModule
  ],
  declarations: [AddProjectsPage]
})
export class AddProjectsPageModule {}
