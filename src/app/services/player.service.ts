import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseApp } from '../utils/response-app';
import { PlayerFormDto } from '../utils/dto/userFormDto';
import { ChosenValueDto, ChosenPlayerValues } from '../utils/dto/chosenValueDto';
import { UserScoreDto } from '../utils/dto/userScoreDto';

@Injectable()
export class PlayerService {

  constructor(public httpService: HttpService) { }

  createNewPlayer(player_name: PlayerFormDto): Observable<ResponseApp<PlayerFormDto>> {
   return this.httpService.post<PlayerFormDto, PlayerFormDto>('player', player_name);
  }

  getPlayer(activePlayer: PlayerFormDto): Observable<ResponseApp<PlayerFormDto>> {
    return this.httpService.get<PlayerFormDto, PlayerFormDto>('player', activePlayer);
  }

  setChosenSquares(squares: ChosenPlayerValues): Observable<ResponseApp<PlayerFormDto>> {
    return this.httpService.post<PlayerFormDto, ChosenPlayerValues>('player/reveal', squares);
  }

  getPlayersScore(): Observable<UserScoreDto[]> {
    return this.httpService.get<UserScoreDto[], any>('player/score').pipe(
      map(el => el.data)
    );
  }
}
