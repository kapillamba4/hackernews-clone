import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Route } from '@angular/router/src/config';
import { StoryFeedComponent } from '../components/story-feed/story-feed.component';

const routes: Routes = [
  { path: '', redirectTo: 'topstories', pathMatch: 'full' },
  { path: 'topstories', data: { feed: 'topstories' }, component: StoryFeedComponent },
  { path: 'newstories', data: { feed: 'newstories'  }, component: StoryFeedComponent },
  { path: 'beststories', data: { feed: 'beststories'  }, component: StoryFeedComponent },
  { path: 'askstories', data: { feed: 'askstories'  }, component: StoryFeedComponent },
  { path: 'showstories', data: { feed: 'showstories' }, component: StoryFeedComponent },
  { path: 'jobstories', data: { feed: 'jobstories' }, component: StoryFeedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
