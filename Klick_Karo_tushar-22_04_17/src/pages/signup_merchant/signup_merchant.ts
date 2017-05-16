  import { Component } from '@angular/core';

import { NavController, NavParams ,LoadingController,ToastController} from 'ionic-angular';
    import { LoginSelectionPage } from '../login-selection/login-selection';

  import {Http} from '@angular/http'

  @Component({
    selector: 'page-signup_merchant',
    templateUrl: 'signup_merchant.html'
  })
  export class signup_merchantPage {
    data:any;
    constructor(public navCtrl: NavController,public toastCtrl:ToastController,public http:Http,public loadingCtrl:LoadingController) {
    this.data={};
    this.data.name="";
    this.data.email="";
    this.data.password="";
    this.data.conform_password="";
    this.data.address="";
    this.data.mobile_no="";
    this.data.experience="";
    this.data.reference="";
    this.data.gender="";
  
    }
    reset(){
    this.data.name="";
    this.data.email="";
    this.data.password="";
    this.data.conform_password="";
    this.data.address="";
    this.data.mobile_no="";
    this.data.experience="";
    this.data.reference="";
    this.data.gender="";
  
    }
  next(signupdata)
  {
    let mobile=signupdata.mobile_no;
    var substring = ".com";
    var substring1 = "@";
    if(!signupdata.email.includes(substring1) && !signupdata.email.includes(substring))
    {
     let toast = this.toastCtrl.create({
          message: 'Invalid email',
          duration: 2000,
        });
        toast.present(toast);
    }
    else if(signupdata.mobile_no.toString().length!=10)
    {
      let toast = this.toastCtrl.create({
          message: 'Invalid mobile no',
          duration: 2000,
        });
        toast.present(toast);
    }
    else if(!signupdata.name||!signupdata.email||!signupdata.password||!signupdata.conform_password||!signupdata.address|| !signupdata.mobile_no || !signupdata.gender){
        let toast = this.toastCtrl.create({
          message: 'Please Fill All The Fields',
          duration: 2000
        });
        toast.present(toast);
      }
      else if(signupdata.password!=signupdata.conform_password)
      {
        
          let toast = this.toastCtrl.create({message: 'Password Mismatch',duration: 2000,position: 'bottom'});
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

            let name=signupdata.name;
            let email=signupdata.email;
            let password=signupdata.password;
            let conform_password=signupdata.conform_password;
            let address=signupdata.address;
            let gender=signupdata.gender;
            let mobile_no=signupdata.mobile_no;
            let experience=signupdata.experience;
            let reference= signupdata.reference;
            let type="merchant";
          
          let data=JSON.stringify({name,email,password,conform_password,address,mobile_no,gender,type});
          console.log(data);
          let link="http://klickkaro.com/android_app/signup.php";
          console.log(data);
            this.http.post(link,data).map(res=>res.json()).subscribe(data=>{

                if(data.server_response[0].code=="exist")
                     {
                         let toast = this.toastCtrl.create({message: 'User Already Exist!',duration: 2000,position: 'bottom'});
                           toast.present(toast);
                     }else{
                              let toast = this.toastCtrl.create({
                              message: name+' Registered Successfully',
                              duration: 2000,
                              
                            });
                            toast.present(toast);
                     }
            });
            loading.dismiss();
            this.navCtrl.push(LoginSelectionPage);

          });

        
      }
  }
  }
