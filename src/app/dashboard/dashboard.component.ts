import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service'

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css'],
	providers: [DashboardService]
})
export class DashboardComponent implements OnInit {

	numbers: Array<number>;
	// authToken: string = 'Basic dGVzdDE6Q01xdVNEOWc0a3I3Sm1hWg==';
	company: any;
	companyId: number;
	queues: Array<any>;
	queuesArray: Array<any> = [];
	queueStatus: string = 'loading';

	constructor(private dashServ: DashboardService) {
		this.numbers = Array(6).fill(0, 0, 6).map((x, i) => i);
	}

	ngOnInit() {
		console.log('init');
		this.getDashboardStats();
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
