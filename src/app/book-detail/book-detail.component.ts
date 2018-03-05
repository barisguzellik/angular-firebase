import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Observable';
import { FirebaseApp } from 'angularfire2';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book:any;
  bookName:string;
  coverImage:string;
  writer:string;

  constructor(private afAuth:AngularFireAuth,
    private storage:AsyncLocalStorage,
    private db:AngularFireDatabase,
    private route:ActivatedRoute,
    private router:Router
  ){
    afAuth.auth.onAuthStateChanged(function (user){
      if(user){
        //console.log(user);
      }
      else{
        router.navigate(['/login']);
      }
      

    });
  };

  ngOnInit() {
    let id:string;
    //route.params.take(1).subscribe(param => id = param["id"]);
    this.route.params.subscribe(params=>{
      id=params['id'];
    });
    this.db.list('/books/'+id, {})
      .subscribe(res => {
        this.book = res;
        //console.log(this.book);
        this.bookName=this.book[0].$value;
        this.coverImage=this.book[1].$value;
        this.writer=this.book[2].$value;
    });
  }

  removeThisBook(){
    let id:string;
    this.route.params.subscribe(params=>{
      id=params['id'];
    });

    const itemsRef = this.db.list('books');
    itemsRef.remove(id);
    this.router.navigate(['/books']);
  }

}
