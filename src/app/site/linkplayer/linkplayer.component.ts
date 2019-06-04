import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Settings} from '../../../common//core/config/settings.service';
import {AppHttpClient} from '../../../common//core/http/app-http-client.service';
import {Toast} from '../../../common//core/ui/toast.service';
import {BehaviorSubject} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {Router,ActivatedRoute} from '@angular/router';
import {RecaptchaService} from '../../../common/core/services/recaptcha.service';
import {LinkplayerService} from './linkplayer.service';
import {Subject} from 'rxjs';
import {Link} from '../../models/link';
@Component({
  selector: 'linkplayer',
  templateUrl: './linkplayer.component.html',
  styleUrls: ['./linkplayer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LinkplayerComponent implements OnInit {

  public loading$: Subject<boolean> = new Subject();
  public links$: Subject<Link> = new Subject();

  constructor(    
    private links: LinkplayerService,
    private route: ActivatedRoute,
    public settings: Settings,
    private http: AppHttpClient,
    private toast: Toast,
    private router: Router,
    private recaptcha: RecaptchaService,
    ) {}

  ngOnInit() {
    this.bindToRouteParams();
  }


/*   private bindToRouteParams() {
    this.route.params.subscribe(params => {
        console.log(params.id);
    });
} */

  private bindToRouteParams() {
    this.route.params.subscribe(params => {
        this.loading$.next(true);
        this.links.get(+params.id)
        .pipe(finalize(() => this.loading$.next(false)))
        .subscribe(response => {
            this.links$.next(response.link);
        });
    });
}

}
