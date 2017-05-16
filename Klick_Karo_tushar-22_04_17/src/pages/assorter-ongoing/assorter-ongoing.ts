import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';

import {Storage} from '@ionic/storage';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {PopoverPage} from '../popover/popover';
@Component({
  selector: 'page-assorter-ongoing',
  templateUrl: 'assorter-ongoing.html'
})
export class AssorterOngoingPage {
assorter_bookStatus:any;
   merchantProfile:any;
  constructor(public popoverCtrl: PopoverController,public navCtrl: NavController, public navParams: NavParams,public http:Http,public storage:Storage) {
    this.assorter_bookStatus="";
    this.merchantProfile={};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AssorterOngoingPage');
  }

 presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
 }

   AcceptBooking()
  {
            this.storage.get("name").then((nm)=>{
                this.storage.get("email").then((value)=>{
                    let email=value;
                    let name=nm;
                    let data=JSON.stringify({email,name});
                    let link="http://klickkaro.com/android_app/confirm_booking.php";
                    this.http.post(link,data).map(res=>res.json()).subscribe((data)=>{
                      this.assorter_bookStatus=data.server_response[0].booking_status; 
                    },(error)=>{
                      console.log(error);
                    });          
                });
            });  
            
  }

  CancleBooking()
  {
           this.storage.get('name').then((nm)=>{
                 this.storage.get("email").then((value)=>{
                    let email=value;
                    let name=nm; 
                  let data=JSON.stringify({email,name});
                    let link="http://klickkaro.com/android_app/cancel_booking.php";
                    this.http.post(link,data).map(res=>res.json()).subscribe((data)=>{
                      this.assorter_bookStatus=data.server_response[0].booking_status; 
                    },(error)=>{
                      console.log(error);
                    });          
              });
           });
         
  }

   JobDone()
   {
     this.storage.get("mobile").then((mob)=>{
          this.storage.get("email").then((value)=>{
            let email=value;
            let mobile=mob;
           let data=JSON.stringify({email,mobile});
            let link="http://klickkaro.com/android_app/job_done.php";
            this.http.post(link,data).map(res=>res.json()).subscribe((data)=>{
               this.assorter_bookStatus=data.server_response[0].booking_status; 
            },(error)=>{
              console.log(error);
            });          
        });
     });
     
   } 
}
