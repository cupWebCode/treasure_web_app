import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { ResponseApp } from '../utils/response-app';
import { PlayerFormDto } from '../utils/dto/userFormDto';

@Injectable()
export class PlayerService {

  constructor(public httpService: HttpService) { }

  createNewPlayer(player_name: PlayerFormDto): Observable<ResponseApp<PlayerFormDto>> {
   return this.httpService.post<PlayerFormDto, PlayerFormDto>('', player_name);
  }

  getPlayer(activePlayer: PlayerFormDto): Observable<ResponseApp<PlayerFormDto>> {
    return this.httpService.get<PlayerFormDto, PlayerFormDto>('', activePlayer);
  }
}
