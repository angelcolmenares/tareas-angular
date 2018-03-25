import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fuente-captura-seleccion',
  templateUrl: './fuente-captura-seleccion.component.html',
  styleUrls: ['./fuente-captura-seleccion.component.css']
})
export class FuenteCapturaSeleccionComponent implements OnInit {

  capturar : boolean =false;
  url:string="";
  @Output() iniciarCaptura = new EventEmitter<any>();

  
  constructor() { }

  ngOnInit() {
  }

  iniciarVisualizacion():void{
    this.capturar=!this.capturar;
    this.iniciarCaptura.emit({capturar:this.capturar, url:this.url  });
  }

}
