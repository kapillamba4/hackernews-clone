import { Component, OnInit, Input } from '@angular/core';
import { HackernewsApiService } from '../../services/hackernews-api.service';
import { ActivatedRoute, Router } from '@angular/router';

import * as moment from 'moment';

@Component({
  selector: 'app-story-feed-item-detail',
  templateUrl: './story-feed-item-detail.component.html',
  styleUrls: ['./story-feed-item-detail.component.scss']
})
export class StoryFeedItemDetailComponent implements OnInit {
  public by: string;
  public id: number;
  public score: number;
  public text: string;
  public title: string;
  public time: string;
  public type: string;
  public kids: string[];
  public url: string;
  public feedItemFetched: boolean;

  constructor(
    private _api: HackernewsApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.feedItemFetched = false;
      this._api.getFeedItem(params.itemId).subscribe(
        data => {
          Object.assign(this, data);
          this.time = moment.unix(+this.time).fromNow();
          this.feedItemFetched = true;
        },
        error => console.log(error)
      );
    });
  }

  onDeleted(comment_id: any) {
    this.kids.splice(this.kids.indexOf(comment_id), 1);
  }
}
