import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WorldNewsModule } from './world-news/world-news.module';
import { HomepgComponent } from './homepg/homepg.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    WorldNewsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
