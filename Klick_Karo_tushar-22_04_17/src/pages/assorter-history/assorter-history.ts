import { Component } from '@angular/core';
import { NavController, NavParams ,LoadingController,ToastController,AlertController,PopoverController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {LoginSelectionPage} from '../login-selection/login-selection';
import {PopoverPage} from '../popover/popover';
@Component({
  selector: 'page-assorter-history',
  templateUrl: 'assorter-history.html'
})
export class AssorterHistoryPage {

  history_assorter:any;
  profilpic:any;
  constructor(public popoverCtrl: PopoverController,public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams,public http:Http,public storage:Storage,public loadingCtrl:LoadingController,
public toastCtrl:ToastController) {
    this.profilpic="img/profilpic.png";
    this.history_assorter=""; 

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

    var iontimer = setInterval(()=>{
      this.ionViewDidLoad();
    },3000);

  }
  

   Signout()
    {
        let alert = this.alertCtrl.create({
    title: 'Confirm Logout',
    message: 'Do you want to Exit?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Logout',
        handler: () => {
           this.storage.clear();
        this.navCtrl.push(LoginSelectionPage).then(() => {
        const index = this.navCtrl.getActive().index;
        this.navCtrl.remove(0, index);
      });
        }
      }
    ]
  });
  alert.present();
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

 presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
 }

  ionViewDidLoad() {
    
       this.storage.get("email").then((value)=>{
                    let as_email=value;
                    
                    let data=JSON.stringify({as_email,name});
                    let link="http://klickkaro.com/android_app/history.php";
                    this.http.post(link,data).map(res=>res.json()).subscribe((data)=>{
                      
                      this.history_assorter=data.server_response; 
                      if(this.history_assorter.profile_pic="")
                      {
                        this.profilpic="img/not_profile.png";
                      }
                      else
                      {
                        this.profilpic=this.history_assorter.profile_pic;
                      }
                      console.log(this.history_assorter);
                    },(error)=>{
                      console.log(error);
                    });          
                });
  }

}
