import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent 
{  

  fps:string='';
  fpsDivClass={};
  fuenteSeleccionada={};

  handleImageSuccess(elapsed):void
  {
    if(elapsed!=0)
      this.fps = (1000.00/elapsed).toFixed(2);
    else
      this.fps='';  
    this.fpsDivClass={'badge':true, 'badge-info':true, 'badge-danger':false}
  }

  handleImageError(){
    this.fpsDivClass={'badge':true, 'badge-info':false, 'badge-danger':true}
  }


}
