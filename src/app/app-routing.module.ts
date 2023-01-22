import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepgComponent } from './homepg/homepg.component';
import { DisplayComponent } from './world-news/display/display.component';



const routes: Routes = [
  { path: 'home', component: HomepgComponent },
  { path: 'news', component: DisplayComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
