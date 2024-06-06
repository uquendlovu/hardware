import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class FireserviceService {

  constructor(
    public firestore: AngularFirestore,
    public auth: AngularFireAuth, public ngFireAuth: AngularFireAuth,

  ) {}

  loginWithEmail(data) {
    return this.auth.signInWithEmailAndPassword(data.email, data.password);
  }
  

  signup(data) {
    return this.auth.createUserWithEmailAndPassword(data.email, data.password);
  }

  saveDetails(data) {
    return this.firestore.collection('users').doc(data.uid).set(data);
  }

  getDetails(data) {
    return this.firestore.collection('users').doc(data.uid).valueChanges();
  }

    // Returns true when user is looged in
    get isLoggedIn(): boolean {
      const user = JSON.parse(localStorage.getItem('user'));
      return user !== null && user.emailVerified !== false ? true : false;
    }
    // Returns true when user's email is verified
    get isEmailVerified(): boolean {
      const user = JSON.parse(localStorage.getItem('user'));
      return user.emailVerified !== false ? true : false;
    }

}
