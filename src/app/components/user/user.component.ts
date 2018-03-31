import { Component, OnInit } from '@angular/core';
import { HackernewsApiService } from '../../services/hackernews-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public userData: any;

  constructor(
    private _api: HackernewsApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this._api.getUser(params.username).subscribe(
        data => {
          this.userData = {
            id: data.id,
            karma: data.karma,
            about: data.about,
            created: moment.unix(parseInt(data.created)).fromNow()
          };
        },
        error => console.log(error)
      );
    });
  }

  openExternalUrl(type) {
    window.open(`https://news.ycombinator.com/${type}?id=${this.userData.id}`);
  }
}
