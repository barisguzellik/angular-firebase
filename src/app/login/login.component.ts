import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Location } from '@angular/common';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user={} as User;
  title = 'app';
  disableButton=true;
  process=false;
  processMessage="";

  constructor(
    private afAuth:AngularFireAuth,
    private location:Location,
    private storage:AsyncLocalStorage,
    private router:Router
  ){}

  async login(user:User){
    this.disableButton=false;
    try{
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password);
      if(result){
        console.log(result.refreshToken);
        this.disableButton=true;
        this.process=false;
        this.storage.setItem('userToken',result.refreshToken).subscribe(()=>{
          //this.location.go('books');
          console.log('storage success : ' + result.refreshToken);
          //window.location.href='/books';
          this.router.navigate(['/books']);
        });
      }
    }
    catch(e){
      //console.error(e);
      this.disableButton=true;
      this.process=true;
      this.processMessage=e.message;
    }
  }

}
export interface User {
  email: string;
  password: string;
}