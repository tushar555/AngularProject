  import { Component } from '@angular/core';
import { NavController, NavParams ,LoadingController,ToastController,AlertController } from 'ionic-angular';
  import { LoginSelectionPage } from '../login-selection/login-selection';
  import {Http} from '@angular/http';
    import {UploadimagePage} from '../uploadimage/uploadimage';

  @Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
  })
  export class SignupPage {
    data:any;
    category:any;
    fetch_cat:any;
    constructor(public navCtrl: NavController, 
public navParams: NavParams,
public http:Http,
public loadingCtrl:LoadingController,
public toastCtrl:ToastController,
public alertCtrl:AlertController) 
{

    this.fetch_category();

    this.data={};
    this.data.name="";
    this.data.email="";
    this.data.password="";
    this.data.conform_password="";
    this.data.address="";
    this.data.mobile_no="";
    this.data.experience="";
    this.data.reference="";
    this.data.gender="";
    this.data.category="";
    }
    reset(){
    this.data.name="";
    this.data.email="";
    this.data.password="";
    this.data.conform_password="";
    this.data.address="";
    this.data.mobile_no="";
    this.data.experience="";
    this.data.reference="";
    this.data.gender="";
    this.data.category="";
    }
  next(){
    if(!this.data.name||!this.data.email||!this.data.password||!this.data.conform_password||!this.data.address|| !this.data.mobile_no)
    {
        let toast = this.toastCtrl.create({
          message: 'Please Fill All The Fields',
          duration: 2000,
         
        });
        toast.present(toast);
      }
     

      else if(this.data.password!=this.data.conform_password)
      {
        
          let toast = this.toastCtrl.create({message: 'Password Mismatch',duration: 2000,position: 'bottom'});
          toast.present(toast);

      }
      else if (!this.data.gender)
      {
          let toast = this.toastCtrl.create({message: 'Select Gender',duration: 2000,position: 'bottom'});
          toast.present(toast);
      }

      else if (!this.data.experience)
      {
          let toast = this.toastCtrl.create({message: 'Enter Experience',duration: 2000,position: 'bottom'});
          toast.present(toast);
      }

      else if (!this.data.reference)
      {
          let toast = this.toastCtrl.create({message: 'Enter reference',duration: 2000,position: 'bottom'});
          toast.present(toast);
       }//else if(!this.data.category)
      // {
      //     let toast = this.toastCtrl.create({message: 'Select Category',duration: 2000,position: 'bottom'});
      //     toast.present(toast);
      // }
      
      else
      {

        let loading = this.loadingCtrl.create
        ({
                  content: 'Please wait...'
        });
        loading.present();
        setTimeout(() => 
        {

             let name=this.data.name;
              let email=this.data.email;
              let password=this.data.password;
              let conform_password=this.data.conform_password;
              let address=this.data.address;
              let gender=this.data.gender;
              let mobile_no=this.data.mobile_no;
              let experience=this.data.experience;
              let reference= this.data.reference;
              let type="assorter";
              let category=this.fetch_cat;
              let email_verification=0;
                let data=JSON.stringify({name,email,password,conform_password,address,mobile_no,gender,experience,reference,type,category,email_verification});
                console.log(data);
                let link="http://klickkaro.com/android_app/signup.php";
                  this.http.post(link,data).map(res=>res.json()).subscribe(data=>
                  {
                     console.log(data);
                     if(data.server_response[0].code=="exist")
                     {
                         let toast = this.toastCtrl.create({message: 'User Already Exist!',duration: 2000,position: 'bottom'});
                           toast.present(toast);
                     }else
                      {
                          this.navCtrl.push(UploadimagePage,{email});
                      }
                  
                  });

                 

          loading.dismiss();// Inside Http post or get  
        });

       
      }
  }

    fetch_category()
    {

          let link="http://klickkaro.com/android_app/select_category.php";
          let data=JSON.stringify({});
        this.http.post(link,data).map(res=>res.json()).subscribe((data)=>{
                  this.category=data.response;
        });
    }

   show(d)
   {
     this.fetch_cat=d;
   }
   showCheckbox() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Select Category');

            for(let i=0;i<this.category.length;i++)
             {
                    console.log(this.category[i].category);
                    alert.addInput({
                    type: 'checkbox',
                    label: this.category[i].category,
                    value: this.category[i].category
                  });
             }  
            alert.addButton({
              text: 'Okay',
              handler: data => {
                  this.show(data);
              }
            });
            alert.present();
  }



  }
