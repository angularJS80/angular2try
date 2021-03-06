import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component'
import { HeroesComponent }      from './heroes/heroes.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ListComponent} from "./list/list.component";
import {TodoComponent} from "./todo/todo.component";
import {RunstateComponent} from "./runstate/runstate.component";
import {ChatComponent} from "./chat/chat.component";
import {AttachComponent} from "./attach/attach.component";
import {FilemngComponent} from "./filemng/filemng.component";
import {SmartPlaylistComponent} from "./smart-playlist/smart-playlist.component";
import {UtbattachComponent} from "./utbattach/utbattach.component";

const routes: Routes = [
  //{ path: '', redirectTo: '/filelist', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'runstate', component: RunstateComponent },
  { path: 'detail/:heroStr', component: HeroDetailComponent },
  { path: 'addnew/:heroStr', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'observerlist', component: ListComponent},
  { path: 'todolist', component: TodoComponent},
  { path: 'chats', component: ChatComponent},
  { path: 'attachfile', component: AttachComponent},
  { path: 'attachUtbUrl', component: UtbattachComponent},
  { path: 'filelist', component: FilemngComponent},
  { path: 'smartplay', component: SmartPlaylistComponent},

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]

})
export class AppRoutingModule {}
