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
          data : action.payload.doc.data()
        })
        console.log(this.items);
      });

    })

  }

  presentPopover() {
    const popover = this.popoverCtrl.create(SendSuccessPage);
    popover.present();
  }

}
