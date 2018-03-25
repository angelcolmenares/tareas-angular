import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-panel-video',
  templateUrl: './panel-video.component.html',
  styleUrls: ['./panel-video.component.css']
})

export class PanelVideoComponent implements OnInit, OnDestroy 
{
  @Output() onSuccess = new EventEmitter<number>();
  @Output() onError = new EventEmitter<void>();

  private fuenteSeleccionada: any = {};
  private capturarNuevoCuadro = new BehaviorSubject<string>("");

  private url: string = "";
  private ultimaSolicitudCaptura: number;

  private intervalo: number = 2000;

  @Input() set fuente(value: any) 
  {
    console.log("panel-video set fuente", value);
    this.fuenteSeleccionada = value;
    if (value && value.capturar) 
    {
      this.solicitarSiguienteCuadro();
    }
  }

  constructor() {}

  ngOnInit() 
  {
    this.capturarNuevoCuadro.subscribe((next: string) => {
      console.log("next", next);
      if (next == '') return;
      this.ultimaSolicitudCaptura = Date.now();
      this.url = this.fuenteSeleccionada.url + '?' + next;
    });
  }

  ngOnDestroy(): void 
  {
    this.capturarNuevoCuadro.complete();
  }

  onImageLoad(): void 
  {
    this.onImage(true);
  }

  solicitarSiguienteCuadro(): void 
  {
    let next = Math.random().toString(36).substring(2, 15)
      + Math.random().toString(36).substring(2, 15).toString();
    this.capturarNuevoCuadro.next(next);
  }

  onImageError(): void 
  {
    this.onImage(false);
  }

  onImage(success:boolean):void
  {
    console.log( success? "onImageLoad": "onImageError" );
    
    if (!this.fuenteSeleccionada.capturar) return;

    let elapsed = Date.now() - this.ultimaSolicitudCaptura;
    let wait = this.intervalo - elapsed;
    console.log("vamos a esperar", wait);

    if(success)
    { 
      this.onSuccess.emit(elapsed);
    }
    else
    {
      this.onError.emit();
    }

    setTimeout(() => 
    {
      this.solicitarSiguienteCuadro();
    }, wait > 0 ? wait : 0)
  }
}
