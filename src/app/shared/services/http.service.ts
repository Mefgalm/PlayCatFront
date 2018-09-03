import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { UrlParametr } from '../../data/urlParamert';

@Injectable()
export class HttpService {
    private headers;
    private serverHost;

    constructor(
        private _http: Http) {
        //this.serverHost = "http://207.154.239.108/"; //dev
        this.serverHost = "http://localhost:5000/"; //local
        this.headers = new Headers();
        this.headers.set('Content-Type', 'application/json');    
    }

    updateAccessToken(accessToken: string) {
        this.headers.set('AccessToken', accessToken);        
    }

    post(url: string, jsonBody: string): Promise<Response> {
        return this._http.post(this.serverHost + url, jsonBody, { headers: this.headers }).toPromise();
    }

    get(url: string): Promise<Response> {
        return this._http.get(this.serverHost + url, { headers: this.headers }).toPromise();
    }

    delete(url: string): Promise<Response> {
        return this._http.delete(this.serverHost + url, { headers: this.headers }).toPromise();
    }

    put(url: string, jsonBody: string): Promise<Response> {
        return this._http.put(this.serverHost + url, jsonBody, { headers: this.headers }).toPromise();
    }

    buildParametersUrl(...args: UrlParametr[]): string {
        if (args === null || args.length === 0)
            return '';

        return '?' +
            args.filter(x => x.value !== null)
                .map(x => x.key + '=' + x.value)
                .join('&');
    }
}