import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { FireserviceService } from 'src/app/fireservice.service';
import { User } from 'src/app/model/user.model';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ApiService } from 'src/app/api.service';
import { AuthenticationServiceService } from 'src/app/authentication-service.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {


  user={}as User;
  name: any;
  surname: any;
  username: any;
  email: any;
  contact: any;
  password: any;

  customers: any[];
  customer: any;



    type: boolean = true;


    constructor(private route: Router, private activated: ActivatedRoute,
      private toast: ToastController, public afAuth: AngularFireAuth,public authService: AuthenticationServiceService,
      private firestore: AngularFirestore, public _apiservice: ApiService,
      private load: LoadingController, public fireService: FireserviceService) {
    }

    addCustomer(){
      let data = {
        name: this.user.name,
        username: this.user.username,
        surname: this.user.surname,
        email: this.user.email,
        contact: this.user.contact,
      }

      this._apiservice.addCustomer(data).subscribe((res:any) => {
        this.showToaster('Customer added to Created!');
      },(error: any) => {
        alert('ERROR');
      })
    }

    ngOnInit() {
    }

     navigateDetails() {
     this.CheckFields();

    }
   CheckFields() {
      if(this.user.username == null || this.user.surname == null || this.user.contact==null || this.user.email == null || this.user.password == null|| this.user.cPass == null){
      this.showToaster('Please fill in missing field');
      return false;
    }
    else if(this.user.password !== this.user.cPass) {
      this.showToaster('Passwords do not match');
      return false;
    }else{
      this.signup();
      this.addCustomer();
      return true;
    }

  }

    changeType(){
      this.type = !this.type;
    }

    showToaster(message: string){
      this.toast.create({
        message,
        color:'medium ',
        duration: 4000,
      }).then(toastData => toastData.present());

    }
    



   async signup(){
  this.fireService.signup({email:this.user.email,password:this.user.password}).then(async res=>{
      if(res.user.uid){
        await this.authService.SendVerificationMail()
        this.route.navigate(['']);
        let data = {
          email:this.user.email,
          password:this.user.password,
          name:this.user.username,
          uid:res.user.uid
        };
        this.fireService.saveDetails(data).then(res=>{
          this.showToaster('Account Created!');
          this.complete();
        },err=>{
        });
      }
    },err=>{
      this.showToaster(err.message);
    });
  }


  complete(){

    this.showToaster('Signup completed successfully!');
    const params: NavigationExtras = {queryParams:{ userVal: this.user.username}, };
    this.route.navigate(['login'], params);
  }

  goToSignIn() {
    this.route.navigate(['login']);
  }

  }
