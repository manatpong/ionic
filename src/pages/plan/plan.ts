import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
    public firebaseFirestore: AngularFirestore
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
  }

}
