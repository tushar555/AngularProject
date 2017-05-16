import { Component } from '@angular/core';
import { NavController,LoadingController, NavParams,AlertController,ToastController,PopoverController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {MerchantHiringUpdatesPage} from '../merchant-hiring-updates/merchant-hiring-updates';
import { MerchantHomePage } from '../merchant-home/merchant-home';
import {ongoingPage} from '../ongoing/ongoing';
import {PopoverPage} from '../popover/popover';
/*
  Generated class for the AssorterHiring page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-assorter-hiring',
  templateUrl: 'assorter-hiring.html'
})
export class AssorterHiringPage {
  category:any;
  constructor(public popoverCtrl: PopoverController,public loadingCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public http:Http,public alertCtrl:AlertController,public toastCtrl:ToastController) {
    this.category=this.navParams.get("cat");
  }


 presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
 }
  BookAssorter(selectedHRS,ofcdetails,area,landmark,citypin)
  {
    let HRS=selectedHRS;
    console.log(HRS);
    if(!HRS)
    {
        let toast = this.toastCtrl.create({message: 'Select No of Hours',duration: 2000,position: 'top'});
        toast.present(toast);
    }else if(!ofcdetails||!area||!citypin||!landmark)
    {
        let toast = this.toastCtrl.create({message: 'Please fill out all details!',duration: 2000,position: 'top'});
        toast.present(toast);
    }
    else
    {
       let loading = this.loadingCtrl.create({
              content: 'Please wait...'
    });
    loading.present();
    setTimeout(() => 
    { 
                this.storage.get("name").then((unm)=>{
     
       this.storage.get("email").then((uem)=>{
       let email=uem;
       
       let name=unm;
       let category = this.category;
       let address = ofcdetails+", "+area+", "+", "+landmark+", "+citypin;
       let data= JSON.stringify({email,HRS,category,name,address});
        
       let link="http://klickkaro.com/android_app/book_assorter.php";
       this.http.post(link,data).map(res=>res.json()).subscribe((data)=>{

          if(data.server_response[0].booking_status=='available')
          {
                const index=this.navCtrl.getActive().index;
                this.navCtrl.remove(0,index);
                let toast = this.toastCtrl.create({message: 'Your Request sent Successfully',duration: 2000,position: 'bottom'});
                toast.present(toast);
                this.navCtrl.push(ongoingPage);

          }else if(data.server_response[0].booking_status=='all_booked')
          {
                  let confirm = this.alertCtrl.create({
                  title: 'Massage',
                  message: 'All Assorters are busy',
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
          }else if(data.server_response[0].booking_status=='unpaid')
          {
                  console.log("a");
                  let confirm = this.alertCtrl.create({
                  title: 'Alert <img height="25px" width="40px" src="img/waiting_yellow.png">',
                  message: 'Please pay your first payment',
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
          }
          loading.dismiss();
       }); 
     });

    });

    });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssorterHiringPage');
  }

}
