import { Component, OnInit } from '@angular/core';
import {Strophe} from 'strophe';
import { Lisa } from 'lisa-api';
import { DashboardService } from '../dashboard.service';
import { AppSettings } from '../app-settings'

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css'],
	providers: [DashboardService]
})
export class DashboardComponent implements OnInit {

	numbers: Array<number>;
	company: any;
	companyId: number;
	queues: Array<any>;
	queuesArray: Array<any> = [];
	queueStatus: string = 'loading';

	// Lisa API vars
	conn: any;
	model: any;

	// server credentials
	jid: string = AppSettings.jid;
	password: string = AppSettings.password;
	server: string = AppSettings.server;

	constructor(private dashServ: DashboardService) {
		this.numbers = Array(6).fill(0, 0, 6).map((x, i) => i);
	}

	ngOnInit() {
		console.log('init');
		this.getDashboardStats();

		this.conn = new Lisa.Connection();
    	this.conn.connect(this.server, this.jid, this.password);

    	this.conn.getModel().then(this.modelReady, function(msg) {
        alert('Could not initialize: ' + msg); });

	}

	modelReady(newModel) {
		console.log('modelReady');
    	this.model = newModel;
    	console.log(this.model);
	}

	getDashboardStats() {
		this.getCompany();
	}

	getCompany() {
		this.dashServ.getCompany()
			.subscribe(
			(data: any) => {
				console.log(data);
				this.companyId = data.entityId;

				this.getQueues();
			},
			error => { },
			() => { }
			);

	}

	getQueues() {
		this.dashServ.getQueues(this.companyId)
			.subscribe(
			(data: any) => {
				console.log(data);
				this.queues = data;

				for(let i=0; i<this.queues.length; i++) {
					this.getQueueDetails(this.queues[i].resourceId);
				}

				this.queueStatus = 'active';

			},
			error => { },
			() => { }
			);

	}

	getQueueDetails(queueId: number) {
		this.dashServ.getQueueDetails(queueId)
			.subscribe(
			(data: any) => {
				console.log(data);
				this.queuesArray.push(data);
			},
			error => { },
			() => { }
			);
	}
}
