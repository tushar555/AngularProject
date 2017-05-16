import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {LoginPage} from '../login/login';
import { SignupPage } from '../signup/signup';
import { signup_merchantPage } from '../signup_merchant/signup_merchant';
import { UploadimagePage } from '../uploadimage/uploadimage';
/*
  Generated class for the LoginSelection page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login-selection',
  templateUrl: 'login-selection.html'
})
export class LoginSelectionPage {
tabBarElement: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public alertCtrl:AlertController) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  Shortcut()
  {
    this.navCtrl.push(UploadimagePage);
  }
  ionViewWillEnter() 
  {
   
    this.tabBarElement.style.display = 'none';
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad LoginSelectionPage');
  }

  loginasMerchant()
  {
    
    this.navCtrl.push(LoginPage,{
      user_type:"merchant"
    });
  }

  loginasAssorter()
  {
   
    this.navCtrl.push(LoginPage,{
      user_type:"assorter"
    }); 
  }

  SignupPage()
  {
    this.navCtrl.push(SignupPage);
  }


  SignupSelection() {
    let confirm = this.alertCtrl.create({
      title: 'SIGN UP',
      message: 'Sign up as ',
      buttons: [
        {
          text: 'Merchant',
          handler: () => {
            this.navCtrl.push(signup_merchantPage);
          }
        },
        {
          text: 'Assorter',
          handler: () => {
            this.navCtrl.push(SignupPage);
          }
        }
      ]
    });
    confirm.present();
  }
}
