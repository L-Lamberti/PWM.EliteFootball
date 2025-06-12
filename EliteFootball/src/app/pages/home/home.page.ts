import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [ CommonModule]
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
