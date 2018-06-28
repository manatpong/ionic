import { LoginPage } from './../login/login';
import { PopularQuestionPage } from './../popular-question/popular-question';
import { HomePage } from './../home/home';
import { PlanDescriptionPage } from './../plan-description/plan-description';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the PlanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-plan',
  templateUrl: 'plan.html',
})
export class PlanPage {

  items: any = [];
  uid: string = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public firebaseFirestore: AngularFirestore,
    public alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    this.uid = this.firebaseAuth.auth.currentUser.uid;
    
    this.firebaseFirestore
    .collection('plan')
    .snapshotChanges()
    // .valueChanges()
    .subscribe((data:any) => {
      this.items = [];

      data.map(action => {
        this.items.push({
          id : action.payload.doc.id,
          data : action.payload.doc.data(),
          model : null,
          score : null,
        })
        // console.log(this.items);
        console.log(this.items);
        // console.log(this.items.data['no']);
      });

    })
    
  }

  showDescript(value){
    console.log(value);
    if(value == 30) {
      this.navCtrl.push(PlanDescriptionPage,{'day': value,'btn_forw': false,'btn_back': true, 'finished': true});
    }
    else {
      this.navCtrl.push(PlanDescriptionPage,{'day': value,'btn_forw': true,'btn_back': true});
    }
    
  }

  goToDesc(value) {
    this.navCtrl.push(PlanDescriptionPage,{'day': value,'btn_forw': true,'btn_back': false});
  }

  backTo(){
    this.navCtrl.push(HomePage);
  }

  popQuestion(value) {
    this.navCtrl.push(PopularQuestionPage,{ 'quest': value, 'btn_forw': true,'btn_back': false});
  }

  logout(){
    //log out all
    let alert = this.alertCtrl.create({
      title: 'ยืนยัน',
      message: 'ออกจากระบบใช่หรือไม่?',
      buttons: [
        {
          text: 'ออกจากระบบ',
          
          handler: () => {
            this.firebaseAuth.auth.signOut(); 
            this.navCtrl.push(LoginPage);
            console.log('Cancel clicked');
            console.log(this.uid);
          }
        },
        {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: () => {
            console.log('Buy clicked');
            
          }
        }
      ]
    });
    alert.present();
  }
}