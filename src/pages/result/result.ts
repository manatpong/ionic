import { PlanPage } from './../plan/plan';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {

  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage');
    // console.log(this.score);
    console.log(this.result);
    // console.log(this.head_text);
   
    
  }

  navigateCalender() {
    this.navCtrl.setRoot(PlanPage);
  }

  
  // score = this.navParams.get('test_score');
  result = this.navParams.data; // ใช้แบบไหนก็ได้
  // text = this.navParams.get('Ntext');
  
  
}
