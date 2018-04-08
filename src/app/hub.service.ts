import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import 'rxjs/add/observable/bindNodeCallback';
import 'rxjs/add/observable/bindCallback';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';


import { Subscription } from 'rxjs/Subscription';
import { Subscriber } from 'rxjs/Subscriber';
import { mergeMap } from 'rxjs/operator/mergeMap';

export const PLACAS_HUB_URL = new InjectionToken<string>('PLACAS_HUB_URL');


export interface IResultadoReconocimientoDto {
    tiempoRAP:number,
    tiempoEnEspera:number,
    fechaHoraCaptura:string
}

export interface SeguirFuenteCapturaInput {
    id:number,
    permitirOtrasFuentes:boolean
}

export interface AbandonarFuenteCapturaInput {
    id:number
}


export interface ConnectionState{
    connected:boolean,
    stopped?:boolean,
    error?:Error
}

@Injectable()
export class HubService
{
    private _connectionState:ConnectionState={connected:false}
    connectionState= new Subject<ConnectionState>();
    private intentoReconexion = new BehaviorSubject<number>(-1);
    private numeroIntentoReconexion:number=0;

    private hub: HubConnection;
    private url: string;
       
    public get connected():boolean{
        return this._connectionState.connected;
    }

    public get stopped():boolean{
        return this._connectionState.stopped;
    }

    constructor( @Optional() @Inject(PLACAS_HUB_URL) url?: string) 
    {
        this.url = url ? url : "";
        this.setup();
    }

    off(method:string):Observable<any>
    {
        return Observable.create ((observer:Subscriber<any>)=>
        {
            this.hub.off(method, (result:any)=>{
                observer.next(result);
            })
        })
    }

    start():void
    {
        this._connectionState.stopped=false;
        if( this.connected) {
            this.emitConnectionState(true)
            return;
        }

        this.hub.start()
        .then(
            ()=>{
              this.emitConnectionState(true);
            }, 
            (error)=> {
              this.emitConnectionState(false,error);
            } 
        );
    }

    stop():void
    {
        this._connectionState.stopped=true
        if( !this.connected) {
            this.emitConnectionState(false);
            return;
        }
        

        this.hub.stop();
        /*.then(
            ()=>{
              this.emitConnectionState(false);
            }, 
            (error)=> {
              this.emitConnectionState(false,error);
            } 
        );
        */
    }
    
    private on(method:string):Observable<any>
    {
        return Observable.create ((observer:Subscriber<any>)=>
        {
            this.hub.on(method, (result:any)=>{
                observer.next(result);
            })
        })
    }

    recibirResultadoReconocimiento():Observable<IResultadoReconocimientoDto>
    {       
         return this.on('recibirResultadoReconocimiento');
    }

    seguirFuenteCaptura(seguirFuenteCaptura:SeguirFuenteCapturaInput):Observable<void>{
        return Observable.fromPromise( this.hub.send("seguirFuenteCaptura", seguirFuenteCaptura));
    }

    abandonarFuenteCaptura(abandonarFuenteCaptura:AbandonarFuenteCapturaInput):Observable<void>{
        return Observable.fromPromise( this.hub.send("abandonarFuenteCaptura", abandonarFuenteCaptura));
    }

    abandonar():Observable<void>{
        return Observable.fromPromise( this.hub.send("abandonar"));
    }
    

    private setup():void
    {
        this.hub = new HubConnection(this.url);
        
        this.hub.onclose( (error: Error)=>{
          this.emitConnectionState(false, error || {message:'Conexion Cerrada', name:''});
        })

        this.intentoReconexion.subscribe((next: number) =>
        {
          console.log("next intento reconexion", next);
          if (next == -1) return;
          this.start();
        });
    }

    private emitConnectionState(connected:boolean, error?:Error):void {
    
      this._connectionState.connected=connected;
      this._connectionState.error= error;
      this.connectionState.next( this._connectionState);
      
      if(!this.stopped){ 
        setTimeout(() => {
            this.intentoReconexion.next(this.numeroIntentoReconexion++);
        }, 5000);
      }
    
    }

}
