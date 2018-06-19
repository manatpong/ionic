import { AddMoviePage } from './../add-movie/add-movie';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SendSuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-send-success',
  templateUrl: 'send-success.html',
})
export class SendSuccessPage {

  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendSuccessPage');
    console.log(this.score);
  }

  navigateCalendar() {
    this.navCtrl.push(AddMoviePage);
  }

  score = this.navParams.get('test_score');

}
