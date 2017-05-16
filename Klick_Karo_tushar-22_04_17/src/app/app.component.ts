import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,App,AlertController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import {AssorterHiringPage} from '../pages/assorter-hiring/assorter-hiring';
import {AssorterHomePage} from '../pages/assorter-home/assorter-home';
import {LoginPage} from '../pages/login/login';
import {LoginSelectionPage} from '../pages/login-selection/login-selection';
import {MerchantHiringUpdatesPage} from '../pages/merchant-hiring-updates/merchant-hiring-updates';
import {MerchantHomePage} from '../pages/merchant-home/merchant-home';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';

import {Storage} from '@ionic/storage';


import { AssorterTabPage } from '../pages/AssorterTab/AssorterTab';
import { UploadimagePage } from '../pages/uploadimage/uploadimage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,public storage:Storage,public app: App,public alertCtrl:AlertController) {
    this.initializeApp();
      this.storage.get("code").then((code)=>{
          if(code=="true")
          {
              // this.pages = [
              //       { title: 'Work Status1', component: MerchantHiringUpdatesPage }
              //        ];
              //        this.initializeApp();
               this.rootPage=AssorterTabPage;      
          }else if(code=="m_true")
          {
              //  this.pages = [
              //       { title: 'Work Status', component: MerchantHiringUpdatesPage },
              //       { title: 'TabPage', component: TabsPage }
              //        ];
                    this.initializeApp();
                this.rootPage=TabsPage;      
          }
          else
          {
            this.rootPage=LoginSelectionPage;
          }
      });
    // used for an example of ngFor and navigation
   	platform.registerBackButtonAction(() => {
                                            let nav = this.app.getActiveNav();
                                            if (nav.canGoBack()){ //Can we go back?
                                              nav.pop();
                                            }else{
                                              this.myHandlerFunction();
                                            }
                                          });

  }

  	myHandlerFunction(){
		let alert = this.alertCtrl.create({
			title: 'Exit?',
			message: 'Do you want to exit the app?',
			buttons: [
			{
				text: 'Exit',
				handler: () => {
					this.platform.exitApp();
				}
			},
			{
				text: 'Continue',
				role: 'cancel',
				handler: () => {

				}
			}
			]
		});
		alert.present();
	}
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
Signout()
{
    this.storage.clear();
        this.nav.push(LoginSelectionPage).then(() => {
        const index = this.nav.getActive().index;
        this.nav.remove(0, index);
      });
}
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
