import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppSessionService } from './session/app-session.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [

    ],
    exports: [

    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                AppSessionService,

            ]
        }
    }
}

