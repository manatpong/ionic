import { AddMoviePage } from './../add-movie/add-movie';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { PopoverController } from 'ionic-angular';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  
  
})
export class ListPage {

  items = [];
  
  uid: string = '';
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public firebaseFirestore: AngularFirestore,
    public popoverCtrl: PopoverController
  ) {
  }

  presentPopover() {
    const popover = this.popoverCtrl.create(AddMoviePage);
    popover.present();
  }

  ionViewDidLoad() {
    this.uid = this.firebaseAuth.auth.currentUser.uid;

    this.firebaseFirestore
    .collection('users')
    .doc(this.uid)
    .collection('Movies')
    .snapshotChanges()
    // .valueChanges()
    .subscribe((data:any) => {
      this.items = [];

      data.map(action => {
        this.items.push({
          id : action.payload.doc.id,
          data : action.payload.doc.data()
        })
        //  console.log(action.payload.doc.data());
      });

    })

  }

  navigateAddMovie(){
    this.navCtrl.push(AddMoviePage);
  }

}
