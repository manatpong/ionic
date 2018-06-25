import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopularQuestionPage } from './popular-question';

@NgModule({
  declarations: [
    PopularQuestionPage,
  ],
  imports: [
    IonicPageModule.forChild(PopularQuestionPage),
  ],
})
export class PopularQuestionPageModule {}
