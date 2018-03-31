import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-story-feed-item',
  templateUrl: './story-feed-item.component.html',
  styleUrls: ['./story-feed-item.component.scss']
})
export class StoryFeedItemComponent implements OnInit {
  @Input() index: number;
  @Input() id: number;
  @Input() title: string;
  @Input() url: string;
  @Input() score: number;
  @Input() by: string;
  @Input() time: number;
  @Input() commentsCount: number;
  public domain: string;
  public ws: string;
  extractHostname(url) {
    if (!url) return undefined;
    let hostname;
    if (url.indexOf('://') > -1) {
      hostname = url.split('/')[2];
    } else {
      hostname = url.split('/')[0];
    }

    return hostname.split(':')[0].split('?')[0];
  }

  constructor() {}

  ngOnInit() {
    this.domain = this.extractHostname(this.url);
    this.ws = '\xa0\xa0'.repeat(this.index.toString().length + 1);
  }

  openUrl() {
    this.url ? window.open(this.url) : window.open(`/item/${this.id}`);
  }
}
