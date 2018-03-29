import { Component, OnInit } from '@angular/core';
import { HackernewsApiService } from '../../services/hackernews-api.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-story-feed',
  templateUrl: './story-feed.component.html',
  styleUrls: ['./story-feed.component.scss']
})
export class StoryFeedComponent implements OnInit {
  private subscription: any;
  private grabbingFeed: boolean
  private page: number;
  private feedType: string;
  private feed: Array<string>;
  private totalPages: number;
  constructor(private _api: HackernewsApiService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.grabbingFeed = true;
    this.feedType = this.route.snapshot.data.feed;
    this.page = +this.route.snapshot.queryParamMap.params.p || 1;
    this.subscription = this._api.getFeedItemInRange(this.feedType, this.page*50-49, this.page*50)
                            .subscribe(
                              data => {
                                this.feed = data.itemsList;
                                this.totalPages = parseInt(data.feedCount)%50;
                                this.grabbingFeed = false;
                              },
                              error => console.log(error)
                            );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  nextPage() {
    return Math.min(this.totalPages, this.page+1);
  }

  prevPage() {
    return Math.max(1, this.page-1);
  }
}
