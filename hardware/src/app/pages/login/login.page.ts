import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { User } from 'src/app/model/user.model';
import { FireserviceService } from 'src/app/fireservice.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { AuthenticationServiceService } from 'src/app/authentication-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
login = {
  email: '',
  password: '',
}


public email: any;
public password: any;
user={}as User;


data: string[];
//emailVerified: string;
userPass: string;

  type: boolean = true;
  me: string;


  constructor( private route: Router,
    public fireService: FireserviceService,
    private toast: ToastController,
    private load: LoadingController,
    public afAuth: AngularFireAuth,
    public ngFireAuth: AngularFireAuth,
    public alertController: AlertController,
    public authService: AuthenticationServiceService
    ) {}

  ngOnInit() {
  }

  recover() {
    this.route.navigate(['/forgot']);
  }

  navigateWelcome(){
    this.validate();

    }

  changeType(){
    this.type = !this.type;
  }


  register() {
    this.route.navigate(['signup']);
  }

  validate(){
    if(this.user.username == null){
      this.showToaster("Please insert Email");
      this.email = "Please insert Username!";
      return false;
    }else if(this.user.password == null){
      this.showToaster("Please insert Password");
      return false;
    }else{
      let loader = this.load.create({
        message:"Almost"
      });
      this.logging();
    }
  }


  showToaster(message: string){
    this.toast.create({
      message,
      color:'medium ',
      duration: 4000,
    }).then(toastData => toastData.present());

  }


  logging(){
    this.fireService.loginWithEmail({email:this.user.email,password:this.user.password}).then(res=>{
      if(this.authService.isEmailVerified) {
        if(res.user.uid){
          this.fireService.getDetails({uid:res.user.uid}).subscribe(res=>{
            this.openDetailsWithState();
            return true;
            
          });
        }
      } else {
        this.showToaster('Email is not verified')
        return false;
      }
    },err=>{
      this.showToaster(err.message);
    });
  }


openDetailsWithState(){
  const email = ((document.getElementById("email") as HTMLInputElement).value);
  const password = ((document.getElementById("password") as HTMLInputElement).value);
  this.data = [this.me];

  const navigationExtras: NavigationExtras = {
    state: {
      user: this.data
    }
  };
  this.route.navigate(['home'], navigationExtras);
}

}
