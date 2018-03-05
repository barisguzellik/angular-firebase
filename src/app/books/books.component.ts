import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Observable';
import { FirebaseApp } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books:Array<any>;
  userEmail:string;
  addBookName:string;
  addBookWriter:string;
  constructor(private afAuth:AngularFireAuth,
  private storage:AsyncLocalStorage,
  private db:AngularFireDatabase,
  private router:Router
  ) { 
      afAuth.auth.onAuthStateChanged(function (user){
        if(user){
          //console.log(user);
        }
        else{
          router.navigate(['/login']);
        }
      });
      //this.login();

      
  }

  /*login() {

    this.storage.getItem('userToken').subscribe((token)=>{
      console.log(token);
      this.afAuth.auth.signInWithCustomToken(token)
        .then(success=>{
        this.user = this.afAuth.auth.currentUser;
        console.log(this.afAuth.auth.currentUser);
        })
      .catch(function (error) {
            console.log(error.message);
            console.log('You are not logged in!');
        });
    });
}*/



  ngOnInit() {
    this.db.list('/books', {})
        .subscribe(res => {
          this.books = res;
          //console.log(this.books);
    });


  }

  addNewBook(){
    let obj=
      {
        "bookName":this.addBookName,
        "cover":"http://via.placeholder.com/150x200",
        "writer":this.addBookWriter
      };
      
    this.db.list("/books").push(obj);
  }

}
