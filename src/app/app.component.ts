import { Component, OnDestroy, OnInit } from '@angular/core';
import 'rxjs/add/observable/interval';
import { Observable } from 'rxjs/observable';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  secondes: number = 0;
  counterSubscription: Subscription;

  constructor(){

  }

  ngOnInit(){
    const counter = Observable.interval(1000);
    // counter.subscribe(
    //   value => this.secondes = value,
    //   error => console.error('Une erreur a été recontrée !'),
    //   () => console.log('Observable complétée !')


    // );
    this.counterSubscription = counter.subscribe(
      value => this.secondes = value
    );
  }

  ngOnDestroy(){
    this.counterSubscription.unsubscribe();
  }
}
