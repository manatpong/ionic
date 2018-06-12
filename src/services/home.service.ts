import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, ResponseContentType } from '@angular/http';

@Injectable()
export class HomeService {

    constructor(
        private _http: Http
    ){    }

    postData(question: string, answer: string){

    }
}