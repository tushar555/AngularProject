import { Component } from '@angular/core';
import { NavController, NavParams ,LoadingController,ToastController,AlertController} from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AssorterHomePage} from '../assorter-home/assorter-home';
import {MerchantHomePage} from '../merchant-home/merchant-home';
import {Storage} from '@ionic/storage';

import { AssorterTabPage } from '../AssorterTab/AssorterTab';
import { TabsPage } from '../tabs/tabs';
import {ForgotpasswordPage} from '../forgotpassword/forgotpassword';
import { SMS } from '@ionic-native/sms';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  user_type:any;
  showpass:any;
 public  myForm=this.fg.group({
      uname:[''],
      upass:['']
    });
    tabbarElement:any;
  constructor(public alertCtrl:AlertController,public storage:Storage,public fg:FormBuilder ,public navCtrl: NavController, public navParams: NavParams,public http:Http,
    public loadingCtrl:LoadingController,
    public toastCtrl:ToastController,
    
  ) {
      this.user_type=this.navParams.get("user_type");    
      this.showpass="password";

  }

showPassword(showpass)
{
  console.log(showpass);
  
  if(showpass=="password"){
      this.showpass="text";
      
  } 
  else if(showpass=="text"){
      this.showpass="password"; 
      
  }
     
}

  login(event)
  {
        let uname=this.myForm.value.uname;
        let upass=this.myForm.value.upass;
        let user_type=this.user_type;
        if(uname=="")
        {
            let toast = this.toastCtrl.create({message: 'Enter Username',duration: 2000,position: 'bottom'});
            toast.present(toast);

        }
        else if(upass=="")
        {
          let toast = this.toastCtrl.create({message: 'Enter Password',duration: 2000,position: 'bottom'});
          toast.present(toast);

        }
        else
        {
          
    let loading = this.loadingCtrl.create
    ({
              content: 'Please wait...'
    });
    loading.present();
    setTimeout(() => 
    {
       
    
        

       
        let data=JSON.stringify({uname,upass,user_type});
        let link="http://klickkaro.com/android_app/login.php";
      this.http.post(link,data).map(res=>res.json()).subscribe(
        (data)=>{
          let code=data.server_response[0].code;
          console.log(code);

          if(code=="false")
          {
            let toast = this.toastCtrl.create({message: 'You Enter Wrong Username And Password',duration: 2000,position: 'bottom'});
            toast.present(toast);
          }
          else if(code=="not_verified")
          {
               let confirm = this.alertCtrl.create({
                title: 'Your Account is not verified!',
                subTitle: 'Contact admin on : <a href="tel:+919167415861">+919167415861</a>',
                buttons: [
                  
                  {
                    text: 'OK',
                    handler: () => {
                      console.log('Agree clicked');
                    }
                  }
                ]
              });
              confirm.present();
            // let toast = this.toastCtrl.create({message: 'Account is not verified Please contact admin on <a href="tel:9823258168">9823258168</a>',duration: 3000,position: 'bottom'});
            // toast.present(toast);
          }
          else
          {
              if(code=="m_true")
                {
                    this.storage.set("email",uname);
                    this.storage.set("name",data.server_response[0].name);
                    this.storage.set("mobile",data.server_response[0].mobile);
                   // this.storage.set("profile_pic",data.server_response[0].profile_pic);
                    
                    this.storage.set("code",code);

                    console.log(code);
                    this.navCtrl.setRoot(TabsPage);
                    

                    
                }
                else if(code=="true")
                {
                    this.storage.set("email",uname);
                    this.storage.set("name",data.server_response[0].name);
                    this.storage.set("mobile",data.server_response[0].mobile);
                    this.storage.set("profile_pic",data.server_response[0].profile_pic);
                    
                    this.storage.set("code",code);

                    this.navCtrl.setRoot(AssorterTabPage);

                    let toast = this.toastCtrl.create
                    ({
                              message: 'login successful',
                              duration: 2000,
                              position: 'bottom'
                    });
                    toast.present(toast);
                }
          }
          
          

          loading.dismiss();// Inside Http post or get 
        
     },(error)=>{
       console.log(error);
     }
   );
  
   
  });
  
  }
  }

  

   forgotpass()
  {
      this.navCtrl.push(ForgotpasswordPage);
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad LoginPage');
  }

}
