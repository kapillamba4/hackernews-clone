import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Route } from '@angular/router/src/config';
import { StoryFeedComponent } from '../components/story-feed/story-feed.component';
import { UserComponent } from '../components/user/user.component';
import { StoryFeedItemDetailComponent } from '../components/story-feed-item-detail/story-feed-item-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'topstories', pathMatch: 'full' },
  { path: 'topstories', data: { feed: 'topstories' }, component: StoryFeedComponent },
  { path: 'newstories', data: { feed: 'newstories'  }, component: StoryFeedComponent },
  { path: 'beststories', data: { feed: 'beststories'  }, component: StoryFeedComponent },
  { path: 'askstories', data: { feed: 'askstories'  }, component: StoryFeedComponent },
  { path: 'showstories', data: { feed: 'showstories' }, component: StoryFeedComponent },
  { path: 'jobstories', data: { feed: 'jobstories' }, component: StoryFeedComponent },
  { path: 'user/:username', component: UserComponent },
  { path: 'item/:itemId', component: StoryFeedItemDetailComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
