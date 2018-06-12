import { ProfilePage } from './../profile/profile';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { SendSuccessPage } from './../send-success/send-success';
import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import BasePage from '../base';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends BasePage{

  items: any = [];
  
  uid: string = '';
  choice: string = '';
  question1: string = '';
  question2: string = '';
  question3: string = '';
  aaa: string = '';
  answer = [ this.question1, this.question2, this.question3];


  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public firebaseFirestore: AngularFirestore,
    public popoverCtrl: PopoverController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) { 
    super(toastCtrl,loadingCtrl)
  }

  ionViewDidLoad() {
    this.uid = this.firebaseAuth.auth.currentUser.uid;

    this.firebaseFirestore
    .collection('question')
    .snapshotChanges()
    // .valueChanges()
    .subscribe((data:any) => {
      this.items = [];

      data.map(action => {
        this.items.push({
          id : action.payload.doc.id,
          data : action.payload.doc.data(),
          model : ['question1','question2','question3']
        })
        console.log(this.items);
      });

    })

  }

  onClick(){
    console.log(this.question1);
    console.log(this.question2);
    console.log(this.question3);
    console.log('hello');
    console.log(this.items);
  }

  presentPopover() {
    const popover = this.popoverCtrl.create(SendSuccessPage);
    popover.present();
  }

  posting_data(){

    const answer = {'answerOne': this.items[0].model,'answerTwo':this.items[1].model,'answerThree':this.items[2].model};

    this.showLoading("Posting...")
      this.firebaseFirestore
        .collection('users')
        .doc(this.firebaseAuth.auth.currentUser.uid)
        .collection('answer')
        .add({
          choice: answer,
          question: [1,2,3]
        })
        .then(data =>{
          this.hideLoading();
          //this.navCtrl.pop();
          this.presentPopover()
        })
        .catch(error => {
          this.hideLoading();
        })



  }

}
