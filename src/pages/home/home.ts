import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

 private totalDays = 28;
 private daysBooked = 3;
 private daysAvailable = this.totalDays - this.daysBooked;
 private daysTaken = 5;

public items = [
  {start: '01 Apr 2016', end: '08 Apr 2016', days: '7'},
    {start: '10 Apr 2016', end: '20 Apr 2016', days: '10'}
]

  constructor(public navCtrl: NavController) {

  }




}
