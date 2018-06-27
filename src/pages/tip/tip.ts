import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TipPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tip',
  templateUrl: 'tip.html',
})
export class TipPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TipPage');
    console.log(this.msg_head)
  }

  msg_head = this.navParams.get('msg_head');
  result = this.navParams.data;
  msg_body = this.navParams.get('msg_body');

}
