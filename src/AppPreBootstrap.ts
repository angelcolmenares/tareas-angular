import * as moment from 'moment';
import { AppConsts } from './shared/AppConsts';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Type, CompilerOptions, NgModuleRef } from '@angular/core';
import { promise } from 'protractor';

export class AppPreBootstrap {

    static run(callback: () => void): void {
        AppPreBootstrap.getApplicationConfig(() => {
            AppPreBootstrap.getUserConfiguration(callback);
        });
    }

    static bootstrap<TM>(moduleType: Type<TM>, compilerOptions?: CompilerOptions | CompilerOptions[]): Promise<NgModuleRef<TM>> {
        return platformBrowserDynamic().bootstrapModule(moduleType, compilerOptions);
    }

    private static getApplicationConfig(callback: () => void):Promise<any> {

        return this.getJson({
            url: '/assets/appconfig.json',
            method: 'GET'
        }).then(result => {
            AppConsts.appBaseUrl = result.appBaseUrl;
            AppConsts.remoteServiceBaseUrl = result.remoteServiceBaseUrl;
            AppConsts.hubServiceUrl =  result.hubServiceUrl;
            AppConsts.chatUrl = result.chatUrl;
            callback();
        });
     
    }

    private static getUserConfiguration(callback: () => void):Promise<any> 
    {
        return this.resolveDummyPromise({}).then( result=> callback());
    }


    private static getJson(params :any):Promise<any>
    {
        var promise = new Promise( (resolve, reject)=>{
            var xhr = new XMLHttpRequest();
            xhr.open(params.method || 'GET', params.url);
            xhr.setRequestHeader('Content-type', 'application/json')
            xhr.onload = function ()
            {
                if( xhr.status ==200){
                    var result = JSON.parse(xhr.response);
                    resolve(result);
                }
                else{
                    reject({status:xhr.status, reason:xhr.responseText});
                }
            }
            xhr.send();
           });
    
           return promise;
    }

    private static resolveDummyPromise(params :any):Promise<any>
    {
        return  Promise.resolve({});
    }
}
