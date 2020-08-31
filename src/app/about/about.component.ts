import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut, expand } from '../animations/app.animation';
import { baseUrl } from '../shared/baseurl';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  host: {
    '[@flyInOut]': 'true',
    style: 'display: block;',
  },
  animations: [flyInOut(), expand()],
})
export class AboutComponent implements OnInit {
  leaders: Leader[];
  errMessage: string;
  constructor(
    private leaderService: LeaderService,
    @Inject('BaseUrl') private BaseURL
  ) {}

  ngOnInit(): void {
    this.leaderService
      .getLeaders()
      .subscribe((leaders) => (this.leaders = leaders),
      errMess => this.errMessage = errMess);
  }
}
