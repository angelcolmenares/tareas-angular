import { Injectable } from '@angular/core';

@Injectable()
export class AppSessionService {

    constructor( ) 
    {
    }

    init(): Promise<boolean> 
    {
        return new Promise<boolean>((resolve, reject) => {
            resolve(true);
        });
    }
}
