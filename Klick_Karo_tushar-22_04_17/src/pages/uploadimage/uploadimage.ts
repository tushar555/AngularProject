import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,ToastController,AlertController, PopoverController} from 'ionic-angular';
import {FileChooser,Transfer,File,FilePath} from 'ionic-native';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';
import {LoginSelectionPage} from '../login-selection/login-selection';
import {PopoverPage} from '../popover/popover';
/*
  Generated class for the Uploadimage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-uploadimage',
  templateUrl: 'uploadimage.html'
})
export class UploadimagePage {
  email:any;
  image:any;
  profile_image:any;
  police_image:any;
  id_image:any;
  // profilepic:any;
  // idpic:any;
  // policepic:any;
  constructor(public popoverCtrl: PopoverController,public alertCtrl:AlertController, public toastCtrl:ToastController, public storage:Storage,public navCtrl: NavController, public navParams: NavParams,public loadingCtrl:LoadingController,public http:Http) {

    this.email=this.navParams.get("email");
    // this.profilepic="";
    // this.idpic="";
    // this.policepic="";
  }
 presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
 }

    uploadResume1(image_nm){
      FileChooser.open()
  .then((uri) =>{
        FilePath.resolveNativePath(uri)
        .then(filePath => {

          // this.profilepic=filePath;
        this.profile_image=filePath;
        
    //  this.storage.get('email').then((value) => { 
    let loading = this.loadingCtrl.create({
    content: 'Uploading...'
  });

  loading.present();

  setTimeout(() => {

       var link ="http://klickkaro.com/android_app/upload.php";
       var currentName = filePath.replace(/^.*[\\\/]/, '');
       var temp=this.email.replace(/^.*[\\\/]/, '');
       var newEmail=temp.replace(/[.com]/,''); 
        var d = new Date();
        var n = d.getTime();
        if(image_nm=="profile")
        {
            var newFileName =  newEmail+"_profile"+ ".jpg";
        }
        else if(image_nm=="pv"){
            var newFileName =  newEmail+"_policeverify"+ ".jpg";
        }
        else if(image_nm=="idp"){
            var newFileName =  newEmail+"_IDproof"+ ".jpg";
        } 
        

       
      const fileTransfer = new Transfer();
        var options: any;

        options = {
           fileKey: 'file',
           fileName: newFileName,
           mimeType: 'image/jpeg',
            chunkedMode: false,
           headers: {'Content-Type' : undefined},
             params : {'fileName': newFileName}
           
        }
        
        fileTransfer.upload(filePath, link,options)
         .then((data) => {
             let email=this.email;
             let data1=JSON.stringify({newFileName,email});

             let link1 = "http://klickkaro.com/android_app/upload_image_link.php";
              this.http.post(link1,data1)
              .map(res=>res.json())
              .subscribe(data=>{
                 
                
              loading.dismiss();
              },error=>{console.log(error)}); 

           loading.dismiss();
         }, (err) => {
           alert(err);
         })   
  });  
    // });
        })
    .catch(e => console.log(e));
  } )
  .catch(e => console.log(e));

  }
      uploadResume2(image_nm){
      FileChooser.open()
  .then((uri) =>{
        FilePath.resolveNativePath(uri)
        .then(filePath => {

          // this.profilepic=filePath;
       
        this.police_image=filePath;
      
    //  this.storage.get('email').then((value) => { 
    let loading = this.loadingCtrl.create({
    content: 'Uploading...'
  });

  loading.present();

  setTimeout(() => {

       var link ="http://klickkaro.com/android_app/upload.php";
       var currentName = filePath.replace(/^.*[\\\/]/, '');
       var temp=this.email.replace(/^.*[\\\/]/, '');
       var newEmail=temp.replace(/[.com]/,''); 
        var d = new Date();
        var n = d.getTime();
        if(image_nm=="profile")
        {
            var newFileName =  newEmail+"_profile"+ ".jpg";
        }
        else if(image_nm=="pv"){
            var newFileName =  newEmail+"_policeverify"+ ".jpg";
        }
        else if(image_nm=="idp"){
            var newFileName =  newEmail+"_IDproof"+ ".jpg";
        } 
        

       
      const fileTransfer = new Transfer();
        var options: any;

        options = {
           fileKey: 'file',
           fileName: newFileName,
           mimeType: 'image/jpeg',
            chunkedMode: false,
           headers: {'Content-Type' : undefined},
             params : {'fileName': newFileName}
           
        }
        
        fileTransfer.upload(filePath, link,options)
         .then((data) => {
             let email=this.email;
             let data1=JSON.stringify({newFileName,email});

             let link1 = "http://klickkaro.com/android_app/upload_image_link.php";
              this.http.post(link1,data1)
              .map(res=>res.json())
              .subscribe(data=>{
                 
                
              loading.dismiss();
              },error=>{console.log(error)}); 

           loading.dismiss();
         }, (err) => {
           alert(err);
         })   
  });  
    // });
        })
    .catch(e => console.log(e));
  } )
  .catch(e => console.log(e));

  }
      uploadResume3(image_nm){
      FileChooser.open()
  .then((uri) =>{
        FilePath.resolveNativePath(uri)
        .then(filePath => {

          // this.profilepic=filePath;
     
        this.id_image=filePath;
    //  this.storage.get('email').then((value) => { 
    let loading = this.loadingCtrl.create({
    content: 'Uploading...'
  });

  loading.present();

  setTimeout(() => {

       var link ="http://klickkaro.com/android_app/upload.php";
       var currentName = filePath.replace(/^.*[\\\/]/, '');
       var temp=this.email.replace(/^.*[\\\/]/, '');
       var newEmail=temp.replace(/[.com]/,''); 
        var d = new Date();
        var n = d.getTime();
        if(image_nm=="profile")
        {
            var newFileName =  newEmail+"_profile"+ ".jpg";
        }
        else if(image_nm=="pv"){
            var newFileName =  newEmail+"_policeverify"+ ".jpg";
        }
        else if(image_nm=="idp"){
            var newFileName =  newEmail+"_IDproof"+ ".jpg";
        } 
        

       
      const fileTransfer = new Transfer();
        var options: any;

        options = {
           fileKey: 'file',
           fileName: newFileName,
           mimeType: 'image/jpeg',
            chunkedMode: false,
           headers: {'Content-Type' : undefined},
             params : {'fileName': newFileName}
           
        }
        
        fileTransfer.upload(filePath, link,options)
         .then((data) => {
             let email=this.email;
             let data1=JSON.stringify({newFileName,email});

             let link1 = "http://klickkaro.com/android_app/upload_image_link.php";
              this.http.post(link1,data1)
              .map(res=>res.json())
              .subscribe(data=>{
                 
                
              loading.dismiss();
              },error=>{console.log(error)}); 

           loading.dismiss();
         }, (err) => {
           alert(err);
         })   
  });  
    // });
        })
    .catch(e => console.log(e));
  } )
  .catch(e => console.log(e));

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadimagePage');
  }

  LoginSelectionPage()
  {

            let alert = this.alertCtrl.create({
    title: 'Registered Successfull',
    message: 'Please wait for Admin to verfify your Account',
    buttons: [
      {
        text: 'OK Greate!',
        handler: () => {
         this.navCtrl.setRoot(LoginSelectionPage);
        }
      }
    ]
  });
  alert.present();
    
  }
}
