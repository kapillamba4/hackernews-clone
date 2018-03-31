import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HackernewsApiService } from '../../services/hackernews-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-story-feed',
  templateUrl: './story-feed.component.html',
  styleUrls: ['./story-feed.component.scss']
})
export class StoryFeedComponent implements OnInit {
  private subscription: any;
  public grabbingFeed: boolean;
  public pagination: boolean;
  public page: number;
  public feedType: string;
  public feed: Array<string>;
  public totalPages: number;
  constructor(
    private cdRef: ChangeDetectorRef,
    private _api: HackernewsApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.grabbingFeed = true;
    this.feedType = this.route.snapshot.data.feed;
    this.pagination = false;
    this.subscription = this.route.queryParams
      .pipe(
        switchMap(params => {
          this.grabbingFeed = true;
          this.feed = [];
          this.page = +params.p || 1;
          return this._api.getFeedItemInRange(this.feedType, this.page * 30 - 29, this.page * 30);
        })
      )
      .pipe(
        map(data => {
          data.item.time = moment.unix(data.item.time).fromNow();
          return data;
        })
      )
      .subscribe(
        data => {
          this.feed.push(data.item);
          this.totalPages = Math.floor((data.feedCount + 29) / 30);
          this.pagination = true;
          this.grabbingFeed = false;
          this.cdRef.detectChanges();
        },
        error => console.log(error)
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  nextPage() {
    this.router.navigate([`/${this.feedType}`], {
      queryParams: {
        p: Math.min(this.totalPages, this.page + 1)
      }
    });
  }

  prevPage() {
    this.router.navigate([`/${this.feedType}`], {
      queryParams: {
        p: Math.max(1, this.page - 1)
      }
    });
  }
}
