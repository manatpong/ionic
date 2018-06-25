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
  btn_state2: boolean;
  btn_state1: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log(this.selectDay);
    console.log(this.state_forw);
    this.btn_state2 = true;
    this.btn_state1 = true;
    console.log(this.state_back);
    console.log(this.state_forw);
  }

  selectDay = this.navParams.data;
  thisDay = this.navParams.get('day');
  state_forw = this.navParams.get('btn_forw');
  state_back = this.navParams.get('btn_back');

  closePage() {
    this.navCtrl.push(PlanPage);
  }

  backTo() {
    this.nextDay = this.thisDay - 1;
    console.log(this.nextDay);
    if(this.nextDay <= 1) {
      this.btn_state1 = false;
    }
    else {
      this.btn_state1 = true;
    }
    this.navCtrl.push(PlanDescriptionPage,{'day': this.nextDay, 'btn_forw': true, 'btn_back': this.btn_state1});
  }

  nextPage() {
    this.nextDay = this.thisDay + 1;
    console.log(this.nextDay);
    if(this.nextDay >= 30) {
      this.btn_state2 = false;
    }
    else {
      this.btn_state2 = true;
    }
    
    this.navCtrl.push(PlanDescriptionPage,{'day': this.nextDay,'btn_forw': this.btn_state2, 'btn_back': true});
  }

}
