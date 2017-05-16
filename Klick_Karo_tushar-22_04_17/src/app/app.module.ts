import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import {AssorterHiringPage} from '../pages/assorter-hiring/assorter-hiring';
import {AssorterHomePage} from '../pages/assorter-home/assorter-home';
import {LoginPage} from '../pages/login/login';
import {LoginSelectionPage} from '../pages/login-selection/login-selection';
import {MerchantHiringUpdatesPage} from '../pages/merchant-hiring-updates/merchant-hiring-updates';
import {MerchantHomePage} from '../pages/merchant-home/merchant-home';
// import {MerchantHomePage} from '../pages';
import {Storage} from '@ionic/storage';
import { historyPage } from '../pages/history/history';
import { profilePage } from '../pages/profile/profile';
import { ongoingPage } from '../pages/ongoing/ongoing';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { AssorterTabPage } from '../pages/AssorterTab/AssorterTab';
import { AssorterOngoingPage } from '../pages/assorter-ongoing/assorter-ongoing';
import { AssorterHistoryPage } from '../pages/assorter-history/assorter-history';
import { AssorterProfilePage } from '../pages/assorter-profile/assorter-profile';
import { SignupPage } from '../pages/signup/signup';
import { signup_merchantPage } from '../pages/signup_merchant/signup_merchant';
import { UploadimagePage } from '../pages/uploadimage/uploadimage';
import {PaymentPage} from '../pages/payment/payment';
import {ForgotpasswordPage} from '../pages/forgotpassword/forgotpassword';
import {FeedbackPage} from '../pages/feedback/feedback';
import {PolicyPage} from '../pages/policy/policy';
import {PopoverPage} from '../pages/popover/popover';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    AssorterHiringPage,
    AssorterHomePage,
    LoginPage,
    LoginSelectionPage,
    MerchantHiringUpdatesPage,
    MerchantHomePage,
    TabsPage,historyPage,profilePage,ongoingPage,HomePage,AssorterTabPage
    ,AssorterOngoingPage,AssorterHistoryPage,AssorterProfilePage,SignupPage,signup_merchantPage,
    UploadimagePage,PaymentPage,ForgotpasswordPage,FeedbackPage,PolicyPage,PopoverPage
    
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    AssorterHiringPage,
    AssorterHomePage,
    LoginPage,
    LoginSelectionPage,
    MerchantHiringUpdatesPage,
    MerchantHomePage,
    TabsPage,historyPage,profilePage,ongoingPage,HomePage,AssorterTabPage
    ,AssorterOngoingPage,AssorterHistoryPage,AssorterProfilePage,SignupPage,signup_merchantPage
    ,UploadimagePage,PaymentPage,ForgotpasswordPage,FeedbackPage,PolicyPage,PopoverPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Storage]
})
export class AppModule {}
