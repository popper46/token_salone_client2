import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { HttpClient} from "@angular/common/http";


declare var java: any;
declare var android: any;

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    baseUrl: string = 'http://87.27.62.247/getalliscritti';
    token: any;

    constructor(private http: HttpClient) {
    }



    prendiiscritti():Observable<any[]> {

        return this.http.get <any[]> (this.baseUrl);
    }


}

