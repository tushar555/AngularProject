import { Component } from '@angular/core';
import { NavController ,NavParams,LoadingController, PopoverController} from 'ionic-angular';

import {Storage} from '@ionic/storage';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {LoginSelectionPage} from '../login-selection/login-selection';
import {PopoverPage} from '../popover/popover';

@Component({
  selector: 'page-assorter-profile',
  templateUrl: 'assorter-profile.html'
})
export class AssorterProfilePage 
{
  assorter_profile:any;
  constructor(public popoverCtrl: PopoverController,public navCtrl: NavController, public navParams: NavParams,public http:Http,public storage:Storage,public loadingCtrl:LoadingController) {
    this.assorter_profile="";

   
    
  }
   presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
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

   doRefresh(refresher) 
    {
        this.ionViewDidLoad();
        setTimeout(() => 
        {
          console.log('Async operation has ended');
          refresher.complete();
        }, 2000);
      }

  ionViewDidLoad() {
        let loading = this.loadingCtrl.create
    ({
              content: 'Please wait...'
    });
    loading.present();
    setTimeout(() => 
    {
      let link="http://klickkaro.com/android_app/assorter_profile.php";
    
      this.storage.get("email").then((value)=>{
        let email=value;
        
        let data=JSON.stringify({email})
        this.http.post(link,data).map(res=>res.json()).subscribe(data=>{
          this.assorter_profile=data.server_response[0];
         
        });

        });
      loading.dismiss();// Inside Http post or get  
    });
  }

}
