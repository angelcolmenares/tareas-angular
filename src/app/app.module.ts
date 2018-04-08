import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroeDetailComponent } from './heroe-detail/heroe-detail.component';
import { HighlightDirective } from './highlight.directive';
import { UnlessDirective } from './unless.directive';


import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';


import { HeroService } from './hero.service';
import { FuenteCapturaSeleccionComponent } from './fuente-captura-seleccion/fuente-captura-seleccion.component';
import { PanelVideoComponent } from './panel-video/panel-video.component';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroeDetailComponent,
    HighlightDirective,
    UnlessDirective,
    FuenteCapturaSeleccionComponent,
    PanelVideoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    InputTextModule,
    ButtonModule,
    AngularFontAwesomeModule
  ],
  providers: [HeroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
