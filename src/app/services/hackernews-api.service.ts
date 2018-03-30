import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map, mergeMap, tap, switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { combineLatest } from "rxjs/observable/combineLatest";

@Injectable()
export class HackernewsApiService {
  private cacheFeed: string[];
  constructor(private _api: Http) { }

  getFeed(feedType): Observable<any> {
    return this._api.get(`https://hacker-news.firebaseio.com/v0/${feedType}.json`)
                      .pipe(map(data => data.json()))
                      .pipe(tap(data => this.cacheFeed = data));
  }

  getFeedItem(itemId): Observable<any> {
    return this._api.get(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`)
                      .pipe(map(data => data.json()));
  }

  getFeedItemInRange(feedType, startCount, endCount): Observable<any> {
    return this.getFeed(feedType)
                .pipe(map(data => data.filter((item, idx) => (idx+1 >= startCount && idx+1 <= endCount))))
                .pipe(switchMap(data => combineLatest(data.map(val => this.getFeedItem(val)))))
                .pipe(map(data => ({
                  itemsList: data,
                  feedCount: this.cacheFeed.length
                })));
  }

  getUser(userId): Observable<any> {
    return this._api.get(`https://hacker-news.firebaseio.com/v0/user/${userId}.json`)
                      .pipe(map(data => data.json()));
  }

  getCommentTree(commentId): Observable<any> {
    return this._api.get(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`)
                      .pipe(map(data => data.json()));
  }
}
