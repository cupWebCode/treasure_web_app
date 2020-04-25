import { LocalStorageService } from './services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { NewPlayerComponent } from './components/new-player/new-player.component';
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

  constructor(public dialog: MatDialog, 
    public playerService: PlayerService,
    public localStorage: LocalStorageService) {  }

  ngOnInit() {
    this.init();
  }

  private init() {
    const player_id = this.localStorage.getItem(StorageKeys.ActiveUserId);
    if (!player_id) {
      return this.openDialog();
    }
    const data = { player_id };
    this.playerService.getPlayer(data).subscribe((res: ResponseApp<PlayerFormDto>) => {
      if (res.status) {
        return this.active_player_info = res.data;
      }
      this.openDialog();
    });
  }

  private openDialog(): void {
    const dialogRef = this.dialog.open(NewPlayerComponent, {
      disableClose: true,
      width: '250px',
      data: {}//{name: this.name, animal: this.animal}
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
