import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,AlertController, PopoverController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {LoginSelectionPage} from '../login-selection/login-selection';
import {PopoverPage} from '../popover/popover';

@Component({
  selector: 'page-assorter-home',
  templateUrl: 'assorter-home.html'
})
export class AssorterHomePage {
   assorter_bookStatus:any;
   date:any;
   difftime:any;
   counter:any;

   merchantProfile:Array<{booking_status:string,booking_time:string,category:string,code:string,merchant_email:string,merchant_name:string,selected_hrs:string,work_address:string}>;
   merchant_details:any;
   bookmerchantProfile:any;
   code:any;
   timer:any;
   jobcode:any;
  constructor(public popoverCtrl: PopoverController,public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams,public http:Http,public storage:Storage,public loadingCtrl:LoadingController) {
    this.assorter_bookStatus="";
    this.bookmerchantProfile={};
    this.merchant_details={};
 
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
                 // console.log('Cancel clicked');
                }
              },
              {
                text: 'Confirm',
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


    setTimeout(() => {
    //  console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }


  AcceptBooking(cat)
  {
   
    let alert = this.alertCtrl.create({
    title: 'Confirm Accept',
    message: 'Do you want to accept this request?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
         // console.log('Cancel clicked');
        }
      },
      {
        text: 'Accept',
        handler: () => {
                    this.storage.get("name").then((nm)=>{
                    this.storage.get("email").then((value)=>{
                    let email=value;
                    let name=nm;
                    let category=cat;
                    let data=JSON.stringify({email,name,category});
                    console.log("send ",data);
                    let link="http://klickkaro.com/android_app/confirm_booking.php";
                    this.http.post(link,data).map(res=>res.json()).subscribe((data)=>{
                      this.assorter_bookStatus=data.server_response[0].booking_status; 
                      this.merchant_details=data.server_response[0];
                      console.log("acc",this.merchant_details);
                      this.code="job_started";
                       this.storage.set("jobcode",this.code);
                    },(error)=>{
                      console.log(error);
                    });          
                });
            });
        }
      }
    ]
  });
  alert.present();
  
            
  }

  CancleBooking(cat)
  {
   // console.log(cat);
    let alert = this.alertCtrl.create({
    title: 'Confirm Cancel',
    message: 'Do you want to cancel this request?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          //console.log('Cancel clicked');
        }
      },
      {
        text: 'Confirm',
        handler: () => {
         this.storage.get('name').then((nm)=>{
                 this.storage.get("email").then((value)=>{
                    let email=value;
                    let name=nm;
                    let category=cat;  
                  let data=JSON.stringify({email,name,category});
                    let link="http://klickkaro.com/android_app/cancel_booking.php";
                    this.http.post(link,data).map(res=>res.json()).subscribe((data)=>{
                      this.assorter_bookStatus=data.server_response[0].booking_status; 
                    },(error)=>{
                     // console.log(error);
                    });          
              });
           });
        }
      }
    ]
  });
  alert.present();
           
         
  }


   JobStart(details)
   {
        let alert = this.alertCtrl.create({
        title: 'Start the Job',
        message: 'Are you sure to start this Job',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Start',
            handler: () => {
              
                  let loading = this.loadingCtrl.create
                  ({
                            content: 'Please wait...'
                  });
                  loading.present();
                  setTimeout(() => 
                  {
                       this.storage.get("mobile").then((mob)=>{
                          this.storage.get("email").then((value)=>{
                            let email=value;
                            let mobile=mob;
                            let category=details.category;
                            let selected_hrs=details.selected_hrs;
                            let booking_time=details.booking_time
                          let data=JSON.stringify({email,mobile,category,selected_hrs,booking_time});
                          
                            let link="http://klickkaro.com/android_app/job_start.php";
                            this.http.post(link,data).map(res=>res.json()).subscribe((data)=>{
                              this.assorter_bookStatus=data.server_response[0].booking_status;
                              this.code=data.server_response[0].code; 
                              console.log(this.code);
                              this.storage.set("jobcode",this.code);
                               loading.dismiss();
                            },(error)=>{
                              console.log(error);
                            });          
                        });
                    });        


                  });
            }
          }
        ]
      });
      alert.present();
 
     
   } 



   JobDone()
   {
        let alert = this.alertCtrl.create({
        title: 'Finish the Job',
        message: 'Are you sure to done this Job',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Yes',
            handler: () => {
                 this.storage.get("mobile").then((mob)=>{
                  this.storage.get("email").then((value)=>{
                    let email=value;
                    let mobile=mob;
                  let data=JSON.stringify({email,mobile});
                    let link="http://klickkaro.com/android_app/job_done.php";
                    this.http.post(link,data).map(res=>res.json()).subscribe((data)=>{
                      this.assorter_bookStatus=data.server_response[0].booking_status; 
                      this.ionViewDidLoad();
                      console.log('Job Done', data.server_response[0] )
                    },(error)=>{
                      console.log(error);
                    });          
                });
            });
            }
          }
        ]
      });
      alert.present();
 
     
   } 

   

  ionViewDidLoad() 
  {
  var timer= setInterval(()=>{

            this.storage.get("email").then((value)=>{
             // console.log('email', value)
            let email=value;
           let data=JSON.stringify({email});
            let link="http://klickkaro.com/android_app/assorter_list.php";
            this.http.post(link,data).map(res=>res.json()).subscribe((data)=>{
                 
               this.storage.get("jobcode").then((jobval)=>{
                 this.jobcode=jobval;
               });
                 if(data.booking_status=="booked")
                 {
                     this.assorter_bookStatus="booked";
                     this.bookmerchantProfile=data.server_response[0];
                    //console.log(this.bookmerchantProfile);
                      clearInterval(timer);
                 }else if(data.booking_status=="waiting")
                 {
                      
                    if(data.code=='true')
                    {
                         this.assorter_bookStatus="waiting";
                         this.merchantProfile=data.server_response;
                         this.difftime=data.server_response;
                        // console.log(this.merchantProfile);
                    }  
                    else if(data.code=='false')
                    {
                         this.assorter_bookStatus="waiting";
                         this.merchantProfile=data.server_response;
                         this.difftime=data.server_response[0].time;
                         clearInterval(timer);
                         this.ionViewDidLoad();
                         
                    }

                                                 
                 }else if(data.booking_status=="unpaid")
                 {
                     this.assorter_bookStatus="unpaid";
                     console.log(data.server_response);
                     this.merchantProfile=data.server_response;
                      clearInterval(timer);
                 }else if(data.booking_status=="no_booking")
                 {
                     this.assorter_bookStatus="no_booking";
                      clearInterval(timer);
                 }
                     

            },(error)=>{
              console.log(error);
            });          
        });
           },2000);
  }




}
