import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastController, LoadingController, NavController, AlertController } from '@ionic/angular';
import { User } from 'src/app/model/user.model';
import { FireserviceService } from 'src/app/fireservice.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ApiService } from 'src/app/api.service';
import { Location } from "@angular/common";
import { AnimationOptions } from '@capacitor/status-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  value: string
  data: any;
  name: any;
  surname: any;
  username: any;
  email: any;
  contact: any;
  password: any;



user={}as User;

data1: string[];
userDis: string;
userPass: string;

  type: boolean = true;
  me: string;

  customers: any[];
  customer: any;


  constructor( private route: ActivatedRoute, private router: Router,
    private activate: ActivatedRoute,public _apiservice: ApiService,
    private toast: ToastController,private location: Location,public fireService: FireserviceService,
    private load: LoadingController,private fireAuth: AngularFireAuth,
    private navCtrl: NavController,public auth: AngularFireAuth,) {

      this.route.queryParams.subscribe(params =>{
        if(this.router.getCurrentNavigation().extras.state){
          this.data = this.router.getCurrentNavigation().extras.state.user;
        }
           this.getProfile();
   });
}

  ngOnInit() {
  }

  orders() {
    this.router.navigate(['order']);
  }
  settings() {
    this.router.navigate(['home/settings']);
  }


 openDetailsWithState(){
  this.data = [];
  this.data[0] = this.customer.name;

  const navigationExtras: NavigationExtras = {
    state: {
      user: this.data[0]
    }
  };
  this.router.navigate(['home'], navigationExtras);
}
getProfile(){
  this._apiservice.getCustomers().subscribe((res:any) => {
    console.log("SUCCESS ===",res);
    this.customers = res;
    this.me = res['name'];
  },(error: any) => {
    alert('ERROR');
  })
}


}
