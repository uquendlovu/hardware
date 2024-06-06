import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { profile } from 'console';
import { User } from 'firebase/auth';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
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
    private toast: ToastController,
    private load: LoadingController,
    private navCtrl: NavController) {

      this.route.queryParams.subscribe(params =>{
        if(this.router.getCurrentNavigation().extras.state){
          this.data = this.router.getCurrentNavigation().extras.state.user;
        }
           this.getProfile();
   });

  }

  ngOnInit() {
  }
  navigateWelcome(){
      this.router.navigate(['products']);
  }

  about() {
    this.router.navigate(['about']);
  }

  logout(){
    this.router.navigate(['login']);
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


    showToaster(message: string){
      this.toast.create({
        message,
        duration: 3000
     }).then(toastData=>toastData.present());
    }

    getProfile(){

      this._apiservice.getCustomers().subscribe((res:any) => {
        console.log("SUCCESS ===",res);
        this.customers = res;
        this.me = res['name'];
      },(error: any) => {
        alert('ERROR');
        console.log("ERROR ===",error);
      })
    }



}
