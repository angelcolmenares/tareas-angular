import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-panel-video',
  templateUrl: './panel-video.component.html',
  styleUrls: ['./panel-video.component.css']
})
export class PanelVideoComponent implements OnInit, OnDestroy {

  private fuenteSeleccionada:any= {};
  private capturarNuevoCuadro =  new BehaviorSubject<string>(""); 

  private url :string ="";
  private ultimaCaptura:number;

  private intervalo :number =2000;

  @Input() set fuente(value:any)
  {
    console.log(value);
    this.fuenteSeleccionada=value;
    if ( value.capturar  )
    {      
      this.capturarNuevoCuadro.next( this.getRandomString());
    }
    
  }

  get fuente():any{
    return this.fuenteSeleccionada;
  }

  constructor() 
  { 
  }

  ngOnInit() 
  {
    this.capturarNuevoCuadro.subscribe((next:string)=>
    {
      console.log("next", next);
      if( next=='') return;
      this.ultimaCaptura=  Date.now();
      this.url= this.fuenteSeleccionada.url+ '?'+ next;
    });
  }

  ngOnDestroy():void
  {
    this.capturarNuevoCuadro.complete();
  }

  onImageLoad():void
  {
    console.log("cargada");
    if(! this.fuenteSeleccionada.capturar) return;

    let now = Date.now();
    let elapsed = Date.now() - this.ultimaCaptura;
    let wait = this.intervalo - elapsed;
    console.log("vamos a esperar",wait);
    if( wait > 0)
    {
      setTimeout( ()=>{
        this.capturarNuevoCuadro.next(this.getRandomString());
      }, wait )
      
    }
    else
    {
      this.capturarNuevoCuadro.next(this.getRandomString());
    }

  }

  getRandomString():string
  {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    .toString();
  }

  onImageError():void
  {
    console.log("onImageError");
  }

}
