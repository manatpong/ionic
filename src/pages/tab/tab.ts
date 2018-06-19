import { PlanPage } from './../plan/plan';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-tab',
  templateUrl: 'tab.html',
})
export class TabPage {

  homePage = HomePage;
  profilePage = ProfilePage;
  planPage = PlanPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabPage');
  }

  
}
