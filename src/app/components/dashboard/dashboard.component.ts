import { Component, OnInit, Input } from '@angular/core';
import { PlayerFormDto } from 'src/app/utils/dto/userFormDto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() activePlayer: PlayerFormDto;
  
  constructor() { }

  ngOnInit(): void {
  }

}
