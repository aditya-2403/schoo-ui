import { Component, OnInit } from '@angular/core';
import { NavService } from '../shared/nav.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(public navService: NavService) { }

  ngOnInit(): void {
  }

}
