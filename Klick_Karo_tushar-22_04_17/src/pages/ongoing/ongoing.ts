import { Component } from '@angular/core';

import {LoginSelectionPage} from '../login-selection/login-selection';
import { NavController, NavParams ,LoadingController,ToastController,Platform,AlertController, PopoverController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {PaymentPage} from '../payment/payment';
import {PopoverPage} from '../popover/popover';

@Component({
  selector: 'page-ongoing',
  templateUrl: 'ongoing.html'
})
export class ongoingPage {
status:any;
inter:any;;
merchant_bookStatus:any;
merchant_bookStatus1:any;
loop_merchant_bookStatus:any;
merchant_payment_status:any;
booked_assorter:Array<{assorter_address:string,assorter_email:string,assorter_experience:string,assorter_gender:string,assorter_mobile:string,assorter_name:string,booking_status:string,time_end:string,time_start:string}>;
waiting_assorter:Array<{assorter_address:string,assorter_email:string,assorter_experience:string,assorter_gender:string,assorter_mobile:string,assorter_name:string,booking_status:string,time_end:string,time_start:string}>;
  constructor(public popoverCtrl: PopoverController,public alertCtrl:AlertController,private platform: Platform,public navCtrl: NavController, public navParams: NavParams,public http:Http,public storage:Storage,public loadingCtrl:LoadingController) 
  {
    this.platform = platform;
    this.status="";
    this.merchant_bookStatus="";
    this.loop_merchant_bookStatus=""; 
    
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

    this.inter=setInterval(()=>{
      this.ionViewDidLoad();
      
    },5000)


  }

 presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
 }

  
  ionViewDidLoad(){
                   
     this.storage.get("email").then((value)=>{
                      let email=value;
                      let data=JSON.stringify({email});
                      let link="http://klickkaro.com/android_app/check_work_status.php";
                      this.http.post(link,data).map(res=>res.json()).subscribe((data)=>{  
                                     console.log(data);
                                          
                                      if(data.payment_status_code=='paynow' && data.server_response_booked.length==0 && data.server_response_waiting.length==0)
                                       {
                                          this.merchant_bookStatus="paynow"; 
                                           
                                          clearInterval(this.inter);
                                          if(this.merchant_bookStatus=="")
                                          {
                                            console.log("Bloan"); 
                                          }else
                                          {
                                              let alert = this.alertCtrl.create({
                                                title: 'Job Done!',
                                                message: 'Please visit payment section for payment',
                                                buttons: [
                                                  {
                                                    text: 'OK',
                                                    handler: () => {
                                                      this.navCtrl.push(PaymentPage);
                                                    }
                                                  }
                                                ]
                                              });
                                              alert.present();
                                          }

                                       }

                                      if(data.server_response_booked.length!=0)
                                      {
                                          if(data.server_response_booked[0].booking_status=='job_start')
                                          {
                                             this.merchant_bookStatus="job_start";
                                              this.merchant_bookStatus1="job_start";
                                              this.merchant_payment_status=data.payment_status_code;
                                            this.booked_assorter=data.server_response_booked;
                                          }
                                          else
                                          {
                                            this.merchant_bookStatus="booked"; 
                                            this.merchant_bookStatus1="booked";
                                            this.merchant_payment_status=data.payment_status_code;
                                            this.booked_assorter=data.server_response_booked;
                                          }
                                            
                                      }
                                      if(data.server_response_waiting.length!=0)
                                      {
                                          this.merchant_bookStatus="waiting_for_assorter";
                                          this.waiting_assorter=data.server_response_waiting; 
                                          this.merchant_payment_status=data.payment_status_code;
                                          console.log("hjhj",this.merchant_payment_status);
                                      }
                                      if(data.payment_status_code=='true' && data.server_response_booked.length==0 && data.server_response_waiting.length==0)
                                      {
                                            this.merchant_bookStatus="all_booked";
                                      }

                                  
                                      
                                      
                          },(error)=>{
                            console.log(error);
                          });          
                      });
                       
               }

  doRefresh(refresher) {
    this.ionViewDidLoad();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }


  Signout()
{
    this.storage.clear();
        this.navCtrl.push(LoginSelectionPage).then(() => {
        const index = this.navCtrl.getActive().index;
        this.navCtrl.remove(0, index);
      });
}


}
