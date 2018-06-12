import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { RegisterPage } from './../register/register';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import BasePage from '../base';



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
    private facebook: Facebook,
  ) {
    super(toastCtrl,loadingCtrl)

  }

  userData = null;

  loginWithFB() {
    this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
      this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
        this.userData = {email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name']};
      })
    });
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
