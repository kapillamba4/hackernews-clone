import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryFeedItemDetailComponent } from './story-feed-item-detail.component';

describe('StoryFeedItemDetailComponent', () => {
  let component: StoryFeedItemDetailComponent;
  let fixture: ComponentFixture<StoryFeedItemDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryFeedItemDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryFeedItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
