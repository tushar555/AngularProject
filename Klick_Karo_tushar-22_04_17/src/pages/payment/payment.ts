import { Component } from '@angular/core';
import { NavController, NavParams,Platform,ToastController,AlertController, PopoverController } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';
import {PopoverPage} from '../popover/popover';
/*
  Generated class for the Payment page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})
export class PaymentPage {
payment_code:any;
  payment:Array<{merchant_email:string,assorter_name:string,assorter_email:string,selected_category:string,payment_status:string,total_price:string,assorter_mobile:string}>;
  constructor(public popoverCtrl: PopoverController,public alertCtrl:AlertController,public toastCtrl:ToastController,private platform: Platform,public storage:Storage,public http:Http ,public navCtrl: NavController, public navParams: NavParams) {
this.payment_code=false;
  }

  
 presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
 }
  ionViewDidLoad() {
    console.log("oyeeeeeeeeeee");
     this.storage.get("email").then((value)=>{
            let link="http://klickkaro.com/android_app/payment.php";
            let email=value;
            let data = JSON.stringify({email});
            this.http.post(link,data).map(res=>res.json()).subscribe((data)=>{
              console.log(data);
              this.payment=data.response;
            });
     });
     
  }

  doRefresh(refresher) {
           this.storage.get("email").then((value)=>{
            let link="http://klickkaro.com/android_app/payment.php";
            let email=value;
            let data = JSON.stringify({email});
            this.http.post(link,data).map(res=>res.json()).subscribe((data)=>{
              console.log(data);
              this.payment=data.response;
            });
     });
     

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  pay(p,paymode) {
   
   if(!paymode)
   {
         let toast = this.toastCtrl.create({
          message: 'Please select Payment Mode',
          duration: 2000,
        });
        toast.present(toast);
   }else if(paymode=="CASH")
   {
        let alert = this.alertCtrl.create({
          title: 'Confirm Payment',
          message: 'You paid with Cash?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Confirm',
              handler: () => {
                  
                  let as_email=p.assorter_email;  
                  let m_email=p.merchant_email;
                  let link = "http://klickkaro.com/android_app/pay_success_cash.php";
                  let data = JSON.stringify({paymode,as_email,m_email});
                  this.http.post(link,data).map(res=>res.json()).subscribe((data)=>{
                            if(data.code=='true')
                            {
                              this.payment_code=true;
                              this.ionViewDidLoad();
                              let toast = this.toastCtrl.create({
                              message: 'Payment done Successfully!',
                              duration: 2000,
                            });
                            toast.present(toast); 
                            }
                  });


              }
            }
          ]
        });
        alert.present();
   }else
   {
                let confirm = this.alertCtrl.create({
                  title: 'Coming Soon',
                  message: 'This service will serve you soon..',
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
      //     let email=p.assorter_email;
      //     let total_price=p.total_price*100;
      //     let name=p.assorter_name;
      //     let mobile=p.assorter_mobile;
      //     let merchant_email=p.merchant_email;
      //     let payment_status=p.payment_status;
      //     var options = {
      // description: 'Payment For Assorter '+name,
      //       image: 'https://s-media-cache-ak0.pinimg.com/originals/9e/2d/59/9e2d5965b484349476dbf9d44ca75ddc.png',
      //       currency: 'INR',
      //       key: 'rzp_test_pKNyg6x604OAPc',
      //       amount: total_price,
      //       name: 'Klick Karo',
      //       prefill: {
      //         email: email,
      //         contact: mobile,
      //         name: name
      //       },
      //       theme: {
      //         color: '#42d7f4'
      //       },
      //       modal: {
      //         ondismiss: function() {
      //           alert('dismissed')
      //         }
      //       }
      //     }

      //     var successCallback = function(payment_id) {
      //       alert('payment_id: ' + payment_id);
      //             let link="http://klickkaro.com/android_app/update_payment_status.php";
      //             let data = JSON.stringify({email,merchant_email,payment_status});
      //             this.http.post(link,data).map(res=>res.json()).subscribe((data)=>{
      //               if(data.code=='true')
      //               {
      //                   alert("Payment Done!!");
      //               }
                    
      //             });
      //     };

      //     var cancelCallback = function(error) {
      //       alert(error.description + ' (Error ' + error.code + ')');
      //     };
        
      //     this.platform.ready().then(() => {
      //       RazorpayCheckout.open(options, successCallback, cancelCallback);
      //     })
   }    

}

}
