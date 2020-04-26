import { LocalStorageService } from './services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { NewPlayerModalComponent } from './components/new-player-modal/new-player.component';
import { PlayerService } from './services/player.service';
import { StorageKeys } from './utils/enums/storage_keys';
import { ResponseApp } from './utils/response-app';
import { PlayerFormDto } from './utils/dto/userFormDto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  player_name: string;
  active_player_info: PlayerFormDto;
  isGameActive = true;

  constructor(public dialog: MatDialog, 
    public playerService: PlayerService,
    public localStorage: LocalStorageService) {  }

  ngOnInit() {
    this.init();
  }

  setGameStatus(status: boolean) {
    this.isGameActive = status;
    if (status) {
      this.startNewGame();
    }
  }

  private startNewGame() {
    this.localStorage.deleteItem(StorageKeys.ActiveUserId);
    this.active_player_info = {};
    this.openDialog();
  }

  private init() {
    const player_id = this.localStorage.getItem(StorageKeys.ActiveUserId);
    if (!player_id) {
      return this.openDialog();
    }
    const data = { player_id };
    this.playerService.getPlayer(data).subscribe((res: ResponseApp<PlayerFormDto>) => {
      if (res.status) {
        this.isGameActive = res.data.isGameContinue;
        return this.active_player_info = res.data;
      }
      this.openDialog();
    });
  }

  private openDialog(): void {
    const dialogRef = this.dialog.open(NewPlayerModalComponent, {
      disableClose: true,
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      this.player_name = result;
      const payload = {
        player_name: result
      };
      this.playerService.createNewPlayer(payload).subscribe((res: ResponseApp<PlayerFormDto>) => {
        if (res.status) {
          this.active_player_info = res.data;
          return this.localStorage.setItem(StorageKeys.ActiveUserId, res.data.player_id);
        }
        this.openDialog();
      })
    });

    dialogRef.beforeClosed()
  }
}
