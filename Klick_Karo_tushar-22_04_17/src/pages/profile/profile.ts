import { Component } from '@angular/core';

import { NavController ,NavParams,LoadingController} from 'ionic-angular';

import {Storage} from '@ionic/storage';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {LoginSelectionPage} from '../login-selection/login-selection';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class profilePage 
{
  merchant_profile:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,public storage:Storage,public loadingCtrl:LoadingController) {
    this.merchant_profile="";

    let loading = this.loadingCtrl.create
    ({
              content: 'Please wait...'
    });
    loading.present();
    setTimeout(() => 
    {
      this.profileLoad();
      loading.dismiss();// Inside Http post or get  
    });
    
  }

    Signout()
    {
    this.storage.clear();
    this.navCtrl.push(LoginSelectionPage).then(() => {
    const index = this.navCtrl.getActive().index;
    this.navCtrl.remove(0, index);
    });
    }

  profileLoad()
  {
    let link="http://klickkaro.com/android_app/merchant_profile.php";
    
    this.storage.get("email").then((value)=>{
      let email=value;
      console.log("Hid",email);
      let data=JSON.stringify({email})
      this.http.post(link,data).map(res=>res.json()).subscribe(data=>{
        this.merchant_profile=data.server_response[0];
        console.log(this.merchant_profile);
      });

      });
  }

  doRefresh(refresher) 
    {
        this.profileLoad();

        setTimeout(() => 
        {
          console.log('Async operation has ended');
          refresher.complete();
        }, 2000);
    }

}
