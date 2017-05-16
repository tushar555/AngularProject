import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the MerchantHiringUpdates page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-merchant-hiring-updates',
  templateUrl: 'merchant-hiring-updates.html'
})
export class MerchantHiringUpdatesPage {
status:any;
merchant_bookStatus:any;
loop_merchant_bookStatus:any;
booked_assorter:Array<{assorter_address:string,assorter_email:string,assorter_experience:string,assorter_gender:string,assorter_mobile:string,assorter_name:string,booking_status:string,time_end:string,time_start:string}>;
waiting_assorter:Array<{assorter_address:string,assorter_email:string,assorter_experience:string,assorter_gender:string,assorter_mobile:string,assorter_name:string,booking_status:string,time_end:string,time_start:string}>;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http,public storage:Storage) {
    this.status="";
    this.merchant_bookStatus="";
    this.loop_merchant_bookStatus="";
    
  }
  ionViewDidLoad(){
                     console.log("Hiiiiiii");
                      // this.storage.get("email").then((value)=>{
                      // let email=value;
                      // let data=JSON.stringify({email});
                      // let link="http://progressiveit.in/Klick_Karo/check_work_status.php";
                      // this.http.post(link,data).map(res=>res.json()).subscribe((data)=>{  
                      //       console.log("This is data",data);
                      //         // // if(data.server_response[0].booking_status=="no_booking")
                      //         // // {
                      //         // //   this.merchant_bookStatus="all_booked";
                      //         // //   console.log("1");
                      //         // // }else{
                      //         // //           console.log("2");
                      //         // //           if(data.server_response_booked.length!=0)
                      //         // //           {
                      //         // //                this.merchant_bookStatus="booked";
                      //         // //                this.booked_assorter=data.server_response_booked;
                      //         // //           }
                      //         // //          if(data.server_response_waiting.length!=0)
                      //         // //           {
                      //         // //               this.loop_merchant_bookStatus="waiting_for_assorter";
                      //         // //               this.waiting_assorter=data.server_response_waiting; 
                      //         // //           }
                      //         // //           if(data.server_response_booked.length==0 && data.server_response_waiting.length==0)
                      //         // //           {
                      //         // //                this.merchant_bookStatus="all_booked";
                      //         // //           }

                      //         //      }
                      //                 console.log(this.booked_assorter);
                      //                 console.log(this.waiting_assorter);
                      //     },(error)=>{
                      //       console.log(error);
                      //     });          
                      // });

               }

}
