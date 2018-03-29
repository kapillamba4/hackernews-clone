import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryFeedItemComponent } from './story-feed-item.component';

describe('StoryFeedItemComponent', () => {
  let component: StoryFeedItemComponent;
  let fixture: ComponentFixture<StoryFeedItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryFeedItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryFeedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
