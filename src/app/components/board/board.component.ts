import { Component, OnInit, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { SquareMouse } from 'src/app/utils/types/square-mouse';
import { ChosenValueDto } from 'src/app/utils/dto/chosenValueDto';
import { ResponseApp } from 'src/app/utils/response-app';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { StorageKeys } from 'src/app/utils/enums/storage_keys';
import { ChosenSquares } from 'src/app/utils/types/chosen-squares';
import { PlayerFormDto } from 'src/app/utils/dto/userFormDto';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() chosenSquares: ChosenValueDto[] = [];//chosenSquares
  @Output() isGameActive: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() dashboardData: EventEmitter<PlayerFormDto> = new EventEmitter<PlayerFormDto>();
  private boardWidth = 5;
  private boardHeight = 5;
  private stepsAmount = 3;
  private stepCounter = this.stepsAmount;
  private stepsLeft: number;
  private chosenPosition: SquareMouse = {};
  isBoardLocked = false;
  squareStorage: Array<{row: Array<string>}> = this.createSquareNames();
  
  constructor(public playerService: PlayerService,
    public localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.stepsLeft = this.boardWidth * this.boardHeight;
    this.createSquareNames();
  }

  setChosenPosition(square: SquareMouse) {
    const key = Object.keys(square)[0];
    this.chosenPosition[key] = square[key];
    if (this.isTimeToSendRequest()) {
      this.isBoardLocked = true;
      const payload = {
        player_id: this.localStorage.getItem(StorageKeys.ActiveUserId),
        chosenValues: Object.keys(this.chosenPosition)
      };
      this.playerService.setChosenSquares(payload).subscribe((res: ResponseApp<PlayerFormDto>) => {
        this.chosenSquares = res.data.chosenSquares;

        if (!res.status) {
          setTimeout(() => (this.isGameActive.emit(res.status)), 2000)
          return;
        }

        this.dashboardData.emit(res.data);
        
        setTimeout(() => (this.isBoardLocked = false), 500);
        this.stepCounter = this.stepsAmount;
        this.chosenPosition = {};
      });
    }
  }

  private isTimeToSendRequest(): boolean {
    --this.stepsLeft;
    --this.stepCounter;
    return !this.stepCounter || !this.stepsLeft;
  }

  private createSquareNames(): Array<{row: Array<string>}> {
    const store = [];
    for(let y = 0; y < this.boardHeight; ++y) {
      let line = {row: []};
      
      for(let x = 0; x < this.boardWidth; ++x) {
        let key = `y-${y}-x-${x}`;
        line.row.push(key);
      }
      store.push(line);
    }
    return store;
  }
}
