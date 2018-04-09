import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { SharedModule } from '../shared/shared.module';
// import { ServiceProxyModule } from  '../shared/service-proxies/service-proxy.module'
import { AppConsts } from '../shared/AppConsts';
import { AppSessionService } from '../shared/session/app-session.service';
//import { API_BASE_URL } from '../shared/service-proxies/service-proxies';
//import { PLACAS_HUB_URL } from '../shared/service-proxies/placas-hub';
import { PLACAS_HUB_URL } from './hub.service';

import { AppPreBootstrap } from '../AppPreBootstrap';


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

export function appInitializerFactory(injector: Injector) {
  return () => {

    console.log("ocupado.....",AppPreBootstrap);
    return new Promise<boolean>((resolve, reject) => {
      AppPreBootstrap.run(() => {
        var appSessionService: AppSessionService = injector.get(AppSessionService);
        appSessionService.init().then(
          (result) => {
            console.log("libre.....");
            resolve(result);
          },
          (err) => {
            console.log("libre.....");
            reject(err);
          }
        );
      });
    });
  }
}

export function getRemoteServiceBaseUrl(): string {
  return AppConsts.remoteServiceBaseUrl;
}

export function getChatServiceUrl(): string {
  return `${AppConsts.hubServiceUrl}/${AppConsts.chatUrl}`;
}



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
    AngularFontAwesomeModule,
    SharedModule.forRoot(),
  ],
  providers: [

    { provide: PLACAS_HUB_URL, useFactory: getChatServiceUrl},
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [Injector],
      multi: true
    },
    HeroService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
