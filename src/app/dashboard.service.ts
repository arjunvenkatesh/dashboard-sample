import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

const httpOptions = {
	headers: new HttpHeaders({ 'Authorization': 'Basic dGVzdDE6Q01xdVNEOWc0a3I3Sm1hWg==' })
};

@Injectable()
export class DashboardService {

	private baseURL = 'https://rest.venus.compass-stack.com';

	constructor(private http: HttpClient) { }

	getCompany(): Observable<any> {
		return this.http.get(`${this.baseURL}/company`, httpOptions)
			.map((resp:Response) => resp)
	}	

	getQueues(companyId: number): Observable<any> {
		return this.http.get(`${this.baseURL}/company/${companyId}/queues`, httpOptions)
			.map((resp:Response) => resp)
	}

}
