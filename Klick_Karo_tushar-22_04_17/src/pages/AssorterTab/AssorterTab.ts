import { Component } from '@angular/core';
import { AssorterHomePage } from '../assorter-home/assorter-home';
import { HomePage } from '../home/home';
import { AssorterOngoingPage } from '../assorter-ongoing/assorter-ongoing';
import { AssorterHistoryPage } from '../assorter-history/assorter-history';
import { AssorterProfilePage } from '../assorter-profile/assorter-profile';
import { NavController, NavParams ,LoadingController,ToastController} from 'ionic-angular';


@Component({
  templateUrl: 'AssorterTab.html'
})
export class AssorterTabPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = AssorterHomePage;
  tab2Root: any = AssorterOngoingPage;
  tab3Root: any = AssorterHistoryPage;
  tab4Root: any = AssorterProfilePage;

  constructor(public navCtrl:NavController) {
    
  }

  
}
