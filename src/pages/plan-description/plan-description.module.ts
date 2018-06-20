import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlanDescriptionPage } from './plan-description';

@NgModule({
  declarations: [
    PlanDescriptionPage,
  ],
  imports: [
    IonicPageModule.forChild(PlanDescriptionPage),
  ],
})
export class PlanDescriptionPageModule {}
