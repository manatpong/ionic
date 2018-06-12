import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items = [];
  
  uid: string = '';
  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public firebaseFirestore: AngularFirestore,
  ) { }

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

}
