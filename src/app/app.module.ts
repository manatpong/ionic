import { SendSuccessPage } from './../pages/send-success/send-success';
import { RegisterPage } from './../pages/register/register';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { ListPage } from '../pages/list/list';
import { TabPage } from '../pages/tab/tab';
import { LoginPage } from '../pages/login/login';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AddMoviePage } from '../pages/add-movie/add-movie';
import { Facebook } from '@ionic-native/facebook';


var config = {
  apiKey: "AIzaSyANCkuG6yGUomIkq7Z-s4GkV44kNyKqPZ8",
  authDomain: "ionic-course-65318.firebaseapp.com",
  databaseURL: "https://ionic-course-65318.firebaseio.com",
  projectId: "ionic-course-65318",
  storageBucket: "ionic-course-65318.appspot.com",
  messagingSenderId: "558992279547"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProfilePage,
    ListPage,
    TabPage,
    LoginPage,
    RegisterPage,
    AddMoviePage,
    SendSuccessPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),//แกนกลาง angular
    AngularFireAuthModule, //เปน auth ที่เอามาใช้
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProfilePage,
    ListPage,
    TabPage,
    LoginPage,
    RegisterPage,
    AddMoviePage,
    SendSuccessPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook
  ],
})
export class AppModule {}
