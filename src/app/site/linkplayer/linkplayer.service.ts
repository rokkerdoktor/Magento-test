import {Injectable} from '@angular/core';
import {AppHttpClient} from '../../../common/core/http/app-http-client.service';
import {BackendResponse} from '../../../common/core/types/backend-response';
import {Link} from '../../models/link';

@Injectable({
    providedIn: 'root'
})
export class LinkplayerService {
    constructor(private http: AppHttpClient) {}


    public get(id: number): BackendResponse<{link: Link}> {
         return this.http.get('link/' + id); 
        /*return this.http.get('http://dev.mate/secure/link/'+ id); */
    }

}
