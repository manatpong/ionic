import { PlanPage } from './../plan/plan';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PlanDescriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-plan-description',
  templateUrl: 'plan-description.html',
})
export class PlanDescriptionPage {

  nextDay: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlanDescriptionPage');
    console.log(this.selectDay);
  }

  selectDay = this.navParams.data;
  thisDay = this.navParams.get('day');

  backTo() {
    this.navCtrl.push(PlanPage);
  }

  nextPage() {
    this.nextDay = this.thisDay + 1;
    console.log(this.nextDay);
    this.navCtrl.push(PlanDescriptionPage,{'day': this.nextDay});
  }

}
