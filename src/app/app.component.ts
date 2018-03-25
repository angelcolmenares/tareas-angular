import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  fuenteSeleccionada:any={}

  handleIniciarCaptura(value):void
  {
    console.log(value);
    this.fuenteSeleccionada=value;
  }
}
