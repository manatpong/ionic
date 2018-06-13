import { ProfilePage } from './../profile/profile';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { SendSuccessPage } from './../send-success/send-success';
import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import BasePage from '../base';
import { ResultPage } from '../result/result';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends BasePage{

  items: any = [];
  
  uid: string = '';
  choice: string = '';
  aaa: string = '';
  //answer = [ this.question1, this.question2, this.question3];
  score1: string = '';
  score2: string = '';
  score3: string = '';
  score4: string = '';
  score5: string = '';
  score6: string = '';
  score = [this.score1,this.score2,this.score3,this.score4,this.score5,this.score6];
  

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
          model : null,
          myscore : null,
        })
        console.log(this.items);
      });

    })

  }

  onClick(){
    console.log('hello');
    console.log(this.items[0]);
  }

  presentPopover() {
    const popover = this.popoverCtrl.create(ResultPage);
    popover.present();
  }

  posting_data(){

    const answer = {'answerOne': this.items[0].model,'answerTwo':this.items[1].model,'answerThree':this.items[2].model};

    

      if(this.items[0].model === null || this.items[1].model === null || this.items[2].model === null 
        || this.items[3].model === null || this.items[4].model === null || this.items[5].model === null){
        console.log('no answer');
        this.showToastMiddle('กรุณาตอบคำถามให้ครบทุกข้อ');
      }
      else
      {
        this.showLoading("Posting...")
       this.firebaseFirestore
        .collection('users')
        .doc(this.firebaseAuth.auth.currentUser.uid)
        .collection('answer')
        .add({
          choice: answer,
          question: [1,2,3],
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

}
