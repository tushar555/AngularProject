import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the Policy page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-policy',
  templateUrl: 'policy.html'
})
export class PolicyPage {

  policy:any;
  constructor(public http:Http,public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {

    let link="http://klickkaro.com/android_app/policy.php";

    this.http.get(link).map(res=>res.json()).subscribe((data)=>{

      this.policy=data.response[0].policy;
    console.log(this.policy);
    });
  }

}
