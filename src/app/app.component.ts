import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent 
{  

  fps:number=0.00;
  handleImageSuccess(elapsed):void
  {
    if(elapsed!=0)
      this.fps = (1000.00/elapsed).toFixed(2);
    else
      this.fps=0.00;  
  }


}
