import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarPage } from './calendar';
import { AddEventPage } from './../add-event/add-event';


@NgModule({
  declarations: [
    CalendarPage,
    AddEventPage
  ],
  imports: [
    IonicPageModule.forChild(CalendarPage),
    AddEventPage

  ],
})
export class CalendarPageModule {}
