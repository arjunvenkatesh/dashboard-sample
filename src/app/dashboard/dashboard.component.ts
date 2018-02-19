import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	public numbers: Array<number>;

  constructor() { 
  	this.numbers = Array(6).fill(-1);
  }

  ngOnInit() {

  }

}
