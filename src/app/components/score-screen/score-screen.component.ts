import { Observable } from 'rxjs';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { UserScoreDto } from 'src/app/utils/dto/userScoreDto';

@Component({
  selector: 'app-score-screen',
  templateUrl: './score-screen.component.html',
  styleUrls: ['./score-screen.component.scss']
})
export class ScoreScreenComponent implements OnInit {
  @Output() isGameActive: EventEmitter<boolean> = new EventEmitter<boolean>();
  playersScore$: Observable <UserScoreDto[]>
  playersScore: any
  
  constructor(public playerService: PlayerService) { }

  ngOnInit(): void {
    this.playerService.getPlayersScore().subscribe((res: any) => {
      this.playersScore = res;
    })
  }

  newGame() {
    this.isGameActive.emit(true);
  }
}
