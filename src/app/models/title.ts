import {Person} from './person';
import {Video} from './video';
import {Image} from './image';
import {Link} from './link';
import {MEDIA_TYPE} from '../site/media-type';
import {Episode} from './episode';
import {Season} from './season';
import {Tag} from '../../common/core/types/models/Tag';
import {Review} from './review';

export interface GroupedCredits {
    [key: string]: TitleCredit[];
}

export interface TitleCredit extends Person {
    pivot: TitleCreditPivot;
}

export interface TitleCreditPivot {
    id: number;
    job: string;
    department: string;
    character: string;
    order: number;
}

export class Title {
    id: number;
    name: string;
    type: MEDIA_TYPE.TITLE;
    is_series: boolean;
    description: string;
    tagline: string;
    runtime: number;
    rating: number;
    budget: number;
    poster: string;
    backdrop: string;
    revenue: number;
    views: number;
    popularity: number;
    season_count: number;
    episode_count: number;
    release_date: string;
    year: number;
    genres: Tag[];
    keywords: Tag[];
    countries: Tag[];
    videos: Video[];
    all_videos?: Video[];
    images: Image[];
    credits: TitleCredit[];
    episodes: Episode[];
    season?: Season;
    seasons?: Season[];
    reviews?: Review[];
    links?: Link[];
    language: string;
    show_videos: boolean;
    links_language:string;

    constructor(params: Object = {}) {
        for (const name in params) {
            this[name] = params[name];
        }
    }
}
