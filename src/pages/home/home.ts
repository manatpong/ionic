import { CalendarPage } from './../calendar/calendar';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
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
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  q5: number;
  q6: number;
  total_score: number;
  test_score: number;
  head_text: string = '';
  text: string = '';

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
          score : null,
        })
        console.log(this.items);
        console.log(this.items.data);
      });

    })

  }

  onClick(){
    // console.log('hello');
    // console.log(this.items[0].model.value);
    // this.test = 1+1;
    //this.navCtrl.push(CalendarPage);
    const popover = this.popoverCtrl.create(ResultPage,{test_score: 10});
    popover.present();
    
  }

  presentPopover() {
    
    ///// question1 ////////
    if(this.items[0].model == 1) {
      this.q1 = 0;
    }
    else if(this.items[0].model == 2) {
      this.q1 = 1;
    }
    else if(this.items[0].model == 3) {
      this.q1 = 2;
    }
    else if(this.items[0].model == 4) {
      this.q1 = 3;
    }
///////////////
    if(this.items[1].model == 1) {
      this.q2 = 3;
    }
    else if(this.items[1].model == 2) {
      this.q2 = 2;
    }
    else if(this.items[1].model == 3) {
      this.q2 = 1;
    }
    else if(this.items[1].model == 4) {
      this.q2 = 0;
    }

    if(this.items[2].model == 1) {
      this.q3 = 1;
    }
    else if(this.items[2].model == 2) {
      this.q3 = 0;
    }

    if(this.items[3].model == 1) {
      this.q4 = 1;
    }
    else if(this.items[3].model == 2) {
      this.q4 = 0;
    }
    ////////// q5 //////////
    if(this.items[4].model == 1) {
      this.q5 = 1;
    }
    else if(this.items[4].model == 2) {
      this.q5 = 0;
    }

    if(this.items[5].model == 1) {
      this.q6 = 1;
    }
    else if(this.items[5].model == 2) {
      this.q6 = 0;
    }
    

    this.total_score = this.q1 + this.q2 + this.q3 + this.q4 + this.q5 + this.q6;

    if( this.total_score >= 0 ) {
      this.head_text = 'ยินดีด้วย !!';
      this.text = 'คุณไม่ติด Nicotine';
      
    }
    else if ( this.total_score >= 4) {
      this.head_text = 'พยายามเข้า !!';
      this.text = 'คุณติด Nicotine ระดับปานกลาง';
    }
    else {
      this.head_text = 'น่าเสียใจ !!';
      this.text = 'คุณติด Nicotine ระดับสูง';
    }
    //console.log(this.total_score);
    const popover = this.popoverCtrl.create(ResultPage,{ 
      test_score: this.total_score,
      Htext: this.head_text,
      Ntext: this.text
     });
    popover.present();

  }

  posting_data(){

    //const answer = {'question1': this.items[0].model,'question2':this.items[1].model,'question3':this.items[2].model,'question4':this.items[3].model,'question5':this.items[4].model,'question6':this.items[5].model};

    

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
          Answer: {'question1': this.items[0].model,'question2':this.items[1].model,'question3':this.items[2].model,'question4':this.items[3].model,'question5':this.items[4].model,'question6':this.items[5].model}
          //question: ['question1','question2','question3','question4','question5','question6'],
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
