import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameListComponent } from './game-list/game-list.component';
import { LevelListComponent } from './level-list/level-list.component';
import { UpdateLevelComponent } from './update-level/update-level.component';

const routes: Routes = [
  { path: '', component: GameListComponent },
  { path: 'level-list/:gameId', component: LevelListComponent },
  { path: 'level-update/:levelId', component: UpdateLevelComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
