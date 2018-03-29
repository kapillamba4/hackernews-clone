import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryFeedComponent } from './story-feed.component';

describe('StoryFeedComponent', () => {
  let component: StoryFeedComponent;
  let fixture: ComponentFixture<StoryFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
