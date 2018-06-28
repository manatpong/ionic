import { PlanPage } from './../plan/plan';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the FinalResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-final-result',
  templateUrl: 'final-result.html',
})
export class FinalResultPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage');
    // console.log(this.score);
    console.log(this.result);
    // console.log(this.head_text);


  }

  // navigateCalender() {
  //   this.navCtrl.push(PlanPage);
  // }

  exitApp() {
    this.platform.exitApp();
  }

  // score = this.navParams.get('test_score');
  result = this.navParams.data; // ใช้แบบไหนก็ได้
  // text = this.navParams.get('Ntext');

  backTo() {
    this.navCtrl.push(PlanPage);
  }
}

