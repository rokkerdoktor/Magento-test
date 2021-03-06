import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TitlePageContainerComponent} from './titles/title-page-container/title-page-container.component';
import {TitleResolverService} from './titles/title-resolver.service';
import {CrupdateListComponent} from './lists/crupdate-list/crupdate-list.component';
import {SeasonPageComponent} from './titles/components/season-page/season-page.component';
import {CheckPermissionsGuard} from '../../common/guards/check-permissions-guard.service';
import {MEDIA_TYPE} from './media-type';
import {EpisodePageComponent} from './titles/components/episode-page/episode-page.component';
import {PersonPageComponent} from './people/person-page/person-page.component';
import {PersonResolverService} from './people/person-resolver.service';
import {SearchPageComponent} from './search/search-page/search-page.component';
import {SearchResultsResolverService} from './search/search-page/search-results-resolver.service';
import {AuthGuard} from '../../common/guards/auth-guard.service';
import {ListPageComponent} from './lists/list-page/list-page.component';
import {UserListsComponent} from './lists/user-lists/user-lists.component';
import {BrowseTitlesComponent} from './titles/components/browse-titles/browse-titles.component';
import {FullCreditsPageComponent} from './titles/components/full-credits-page/full-credits-page.component';
import {NewsArticleComponent} from './news/news-article/news-article.component';
import {NewsIndexComponent} from './news/news-index/news-index.component';
import {PeopleIndexComponent} from './people/people-index/people-index.component';
import {ContactComponent} from '../../common/contact/contact.component';
import {LinkplayerComponent} from './linkplayer/linkplayer.component';
const routes: Routes = [
    {
        path: '',
        canActivate: [CheckPermissionsGuard],
        canActivateChild: [CheckPermissionsGuard],
        children: [
            // browse
            {
                path: 'movies',
                redirectTo: 'browse'
            },
            {
                path: 'series',
                redirectTo: 'browse'
            },
            {
                path: 'browse',
                component: BrowseTitlesComponent,
                data: {permissions: ['titles.view'], name: 'browse', willSetSeo: true},
            },

            // titles
            {
                path: 'movies/:titleId',
                redirectTo: 'titles/:titleId'
            },
            {
                path: 'series/:titleId',
                redirectTo: 'titles/:titleId'
            },
            {
                path: 'titles/:titleId',
                component: TitlePageContainerComponent,
                resolve: {api: TitleResolverService},
                data: {permissions: ['titles.view'], name: MEDIA_TYPE.MOVIE}
            },
            {
                path: 'titles/:titleId/full-credits',
                component: FullCreditsPageComponent,
                resolve: {api: TitleResolverService},
                data: {permissions: ['titles.view'], name: MEDIA_TYPE.MOVIE, fullCredits: true}
            },
            {
                path: 'series/:titleId/seasons/:seasonNumber',
                redirectTo: 'titles/:titleId/season/:seasonNumber'
            },
            {
                path: 'titles/:titleId/season/:seasonNumber',
                component: SeasonPageComponent,
                resolve: {api: TitleResolverService},
                data: {permissions: ['titles.view'], name: MEDIA_TYPE.SEASON}
            },
            {
                path: 'series/:titleId/seasons/:seasonNumber/episodes/:episodeNumber',
                redirectTo: 'titles/:titleId/season/:seasonNumber/episode/:episodeNumber'
            },
            {
                path: 'titles/:titleId/season/:seasonNumber/episode/:episodeNumber',
                component: EpisodePageComponent,
                resolve: {api: TitleResolverService},
                data: {permissions: ['titles.view'], name: MEDIA_TYPE.EPISODE}
            },
            {
                path: 'titles/:titleId/season/:seasonNumber/episode/:episodeNumber/full-credits',
                component: FullCreditsPageComponent,
                resolve: {api: TitleResolverService},
                data: {permissions: ['titles.view'], name: MEDIA_TYPE.MOVIE}
            },

            // people
            {
                path: 'people',
                component: PeopleIndexComponent,
                data: {permissions: ['people.view'], name: 'people', willSetSeo: true}
            },
            {
                path: 'people/:id',
                component: PersonPageComponent,
                resolve: {api: PersonResolverService},
                data: {permissions: ['people.view'], name: MEDIA_TYPE.PERSON, willSetSeo: true}
            },

            // lists
            {
                path: 'lists/new',
                pathMatch: 'full',
                component: CrupdateListComponent,
                data: {permissions: ['lists.create']},
            },
            {
                path: 'lists/:id',
                component: ListPageComponent,
                data: {name: 'list', willSetSeo: true},
            },
            {
                path: 'lists/:id/edit',
                component: CrupdateListComponent,
            },

            // search
            {
                path: 'search',
                component: SearchPageComponent,
                resolve: {api: SearchResultsResolverService},
                data: {name: 'search', willSetSeo: true},
            },

            // user
            {
                path: 'watchlist',
                component: ListPageComponent,
                canActivate: [AuthGuard],
                data: {watchlist: true, name: 'watchlist', willSetSeo: true},
            },
            {
                path: 'lists',
                component: UserListsComponent,
                canActivate: [AuthGuard],
                data: {name: 'userLists'}
            },
            // news
            {
                path: 'news',
                component: NewsIndexComponent,
                data: {permissions: ['news.view'], name: 'news', willSetSeo: true}
            },
            {
                path: 'news/:id',
                component: NewsArticleComponent,
                data: {permissions: ['news.view'], willSetSeo: true}
            },

            // contact
            {
                path: 'contact',
                component: ContactComponent,
            },
            // contact
            {
                path: 'links/:id',
                component: LinkplayerComponent,
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
