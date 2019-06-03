export class Link {
    id: number;
    title_id: number;
    url: string;
    season: number;
    episode: number;
    label: string;
    quality:string;
    user_name:string;

    constructor(params: Object = {}) {
        for (const name in params) {
            this[name] = params[name];
        }
    }
}