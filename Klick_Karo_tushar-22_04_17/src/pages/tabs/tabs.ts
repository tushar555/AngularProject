import { Component } from '@angular/core';
import { MerchantHomePage } from '../merchant-home/merchant-home';
import { HomePage } from '../home/home';
import { ongoingPage } from '../ongoing/ongoing';
import { historyPage } from '../history/history';
import { profilePage } from '../profile/profile';
import {PaymentPage} from '../payment/payment';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = MerchantHomePage;
  tab2Root: any = ongoingPage;
  tab3Root: any = historyPage;
  tab4Root: any = profilePage;
  tab5Root: any = PaymentPage; 
  constructor() {

  }

  onSelected()
  {
      
      
  }
}
