import { Component } from '@angular/core';

import { NavController, NavParams ,LoadingController,ToastController,AlertController, PopoverController} from 'ionic-angular';

import {Storage} from '@ionic/storage';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {LoginSelectionPage} from '../login-selection/login-selection';
import {PopoverPage} from '../popover/popover';
@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class historyPage 
{
  history_merchant:any;
  constructor(public popoverCtrl: PopoverController,public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams,public http:Http,public storage:Storage,public loadingCtrl:LoadingController,
public toastCtrl:ToastController) 
  {
    this.history_merchant="";
    
    let loading = this.loadingCtrl.create
    ({
              content: 'Please wait...'
    });
    loading.present();
    setTimeout(() => 
    {
      this.ionViewDidLoad(); 
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

 presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
 }
   ionViewDidLoad()
  {
    this.storage.get("email").then((value)=>{
                    let email=value;
                    
                    let data=JSON.stringify({email,name});
                    let link="http://klickkaro.com/android_app/history.php";
                    this.http.post(link,data).map(res=>res.json()).subscribe((data)=>{
                      this.history_merchant=data.server_response; 
                       if(data.check_payment_status=="true")
                        {
                              let alert = this.alertCtrl.create({
                                title: 'Alert!',
                                subTitle: 'Your previous payment is remaining.',
                                buttons: ['OK']
                              });
                              alert.present();
                        }
                     
                    },(error)=>{
                      console.log(error);
                    });          
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

}
