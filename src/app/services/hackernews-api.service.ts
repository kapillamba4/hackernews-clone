import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map, mergeMap, tap } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Injectable()
export class HackernewsApiService {
  private cacheFeed: object[];

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
                .pipe(mergeMap(data => forkJoin(data.map(val => this.getFeedItem(val)))))
                .pipe(map(data => ({
                  itemsList: data,
                  feedCount: this.cacheFeed.length
                })));
  }

  getUser(userId): Observable<any> {
    return this._api.get(`https://hacker-news.firebaseio.com/v0/user/${userId}.json`)
                      .pipe(map(data => data.json()));
  }
}
