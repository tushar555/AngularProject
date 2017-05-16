import { Component } from '@angular/core';
import { NavController, NavParams,AlertController, PopoverController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import {AssorterHiringPage} from '../assorter-hiring/assorter-hiring';
import {LoginSelectionPage} from '../login-selection/login-selection';
import {Storage} from '@ionic/storage';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {PopoverPage} from '../popover/popover';

@Component({
  selector: 'page-merchant-home',
  templateUrl: 'merchant-home.html'
})
export class MerchantHomePage {

  constructor(public popoverCtrl: PopoverController,public http:Http,public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController,public storage:Storage) {}

  ionViewDidLoad() { 

    this.storage.get("email").then((value)=>{

           let email=value; 
           let data = JSON.stringify({email});
          let link = "http://klickkaro.com/android_app/check_payment_status.php"; 
          this.http.post(link,data).map(res=>res.json()).subscribe((data)=>{
            console.log("HELLOOOO",data.server_response);
                if(data.server_response=="true")
                {
                    let alert = this.alertCtrl.create({
                            title: 'Alert!',
                            subTitle: 'Your previous payment is remaining.',
                            buttons: ['OK']
                          });
                          alert.present();
                }
                      });


    }); 
 
  }

   @ViewChild('mySlider') slider: Slides;

   homeOptions = {
        initialSlide: 0,
        loop: true,
        autoplay:3000,
        autoplayDisableOnInteraction: false
      };

  onSlideChanged() {
    let currentIndex = this.slider.getActiveIndex();
    console.log("Current index is", currentIndex);
  }

  bookAssorter(cat) {
    // let category=cat;
    // let confirm = this.alertCtrl.create({
    //   title: 'Book Assorters',
    //   message: 'Please Click confirm to book Assorters',
    //   buttons: [
    //     {
    //       text: 'Cancel',
    //       handler: () => {
    //         console.log('Cancel Clicked');
    //       }
    //     },
    //     {
    //       text: 'Confirm',
    //       handler: () => {

    //         alert('ConfirmBookingPage');
    //       }
    //     }
        
    //   ]
    // });
    // confirm.present()
    
     this.navCtrl.push(AssorterHiringPage,{
       cat:cat
      });
      
      

  }


    presentLoading() {
      
  //  this.navCtrl.push(AssortersListPage);
  }

 presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
 }
  AssortersListPage()
  {
    //this.navCtrl.push(AssortersListPage);
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

}
