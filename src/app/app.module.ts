import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { NewPlayerModalComponent } from './components/new-player-modal/new-player.component';
import { MaterialModule } from './modules/material.module';
import { PlayerService } from './services/player.service';
import { BoardComponent } from './components/board/board.component';
import { LocalStorageService } from './services/local-storage.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SquareComponent } from './components/square/square.component';
import { ScoreScreenComponent } from './components/score-screen/score-screen.component';
import { SortByPipe } from './pipes/sort-by.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NewPlayerModalComponent,
    BoardComponent,
    DashboardComponent,
    SquareComponent,
    ScoreScreenComponent,
    SortByPipe,
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    PlayerService,
    LocalStorageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
