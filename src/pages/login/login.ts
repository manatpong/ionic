import { ProfilePage } from './../profile/profile';
import { FirebaseAuth, FacebookAuthProvider } from '@firebase/auth-types';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { RegisterPage } from './../register/register';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import BasePage from '../base';
import firebase from 'firebase';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BasePage {
  
  email = '';
  password = '';
  isLoggedIn:boolean = false;
  users: any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    //public facebook: Facebook,
    private fb: Facebook,
  ) {
    super(toastCtrl,loadingCtrl)
    fb.getLoginStatus()
    .then(res => {
      console.log(res.status);
      if(res.status === "connect") {
        this.isLoggedIn = true;
        
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log(e));

  }

  //// FB start ////
  login() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res => {
        if(res.status === "connected") {
          this.isLoggedIn = true;
          this.navCtrl.push(ProfilePage);
          this.getUserDetail(res.authResponse.userID);
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }
  userData = null;

  logout() {
    this.fb.logout()
      .then( res => this.isLoggedIn = false)
      .catch(e => console.log('Error logout from Facebook', e));
  }
  getUserDetail(userid) {
    this.fb.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
      .then(res => {
        console.log(res);
        this.users = res;
      })
      .catch(e => {
        console.log(e);
      });
  }
  //// FB end ///

  // loginFB() {
  //   this.facebook.login(['email']).then(res => {
  //      const fc = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken)
  //      firebase.auth().signInWithCredential(fc).then(fs=>{
  //        alert("firebase sec")
  //      }).catch(ferr => {
  //        alert("firebase error")
  //      })
  //   }).catch(err => {
  //     alert(JSON.stringify(err))
  //   })
  // }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginNormal(){
    this.showLoading("Logging in...")
    this.firebaseAuth
    .auth
    .signInAndRetrieveDataWithEmailAndPassword(this.email, this.password)
    .then((user) => {
      this.hideLoading()
      //this.showToast('Login Success');

    })
    .catch((error) =>{
      this.hideLoading()
      this.showToast(error.message);
    })
  }

  navigateRegister(){
    this.navCtrl.push(RegisterPage);
  }
}