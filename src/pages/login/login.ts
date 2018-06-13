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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public facebook: Facebook,
  ) {
    super(toastCtrl,loadingCtrl)

  }

  userData = null;

  loginFB() {
    this.facebook.login(['email']).then(res => {
       const fc = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken)
       firebase.auth().signInWithCredential(fc).then(fs=>{
         alert("firebase sec")
       }).catch(ferr => {
         alert("firebase error")
       })
    }).catch(err => {
      alert(JSON.stringify(err))
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
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