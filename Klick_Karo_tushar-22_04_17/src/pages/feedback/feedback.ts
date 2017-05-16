import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {LoadingController} from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Feedback page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html'
})
export class FeedbackPage {

  data:any;
  res:any;
  constructor(public storage:Storage, public navCtrl: NavController,public toastCtrl:ToastController,public alertCtrl: AlertController,
  	public http:Http,public loadingCtrl:LoadingController) {
  	    this.data ={};
      this.data.feedback="";
     
  }
   reset()
   {
     this.data.feedback="";
   }
   submit(feedback1)
  {
    let feedback=feedback1;
    
    
     var EMAIL_REGEXP ="^[_A-Za-z0-9-\\+]+@"+"[A-Za-z0-9-]+(\\.[A-Za-z]{2,})$";
      if(feedback=="" )
                  {
                    let toast = this.toastCtrl.create({
                    message: "Please Fill out feedback",
                    duration: 3000
                  });
                  toast.present(); 

                  }
                  else{
                                this.storage.get("email").then((value)=>{
                                  let email1 = value;
                                 let data=JSON.stringify({feedback,email1});
                                  console.log("feedback Data",data);
                                let loading = this.loadingCtrl.create({
                                // spinner: 'show',
                                  content: 'Please Wait...'
                                });

                                loading.present();

                                setTimeout(() => {
                                //*****************  
                                let link = "http://klickkaro.com/android_app/add_feedback.php";
                                  this.http.post(link,data)
                                  .map(res=>res.json())
                                  .subscribe(data=>{
                                  
                                    console.log(data.res[0]);
                                      if(data.res.code=="true"){
                                        this.reset();    
                                        let toast = this.toastCtrl.create({
                                    message: "Feedback submitted successfully!",
                                    duration: 3000

                                  });
                                  toast.present(); 
                              
                                
                                      }
                                  loading.dismiss();

                                
                                  },error=>{console.log(error)});  
                                  
                                }); 
                                });      
          }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }

}
