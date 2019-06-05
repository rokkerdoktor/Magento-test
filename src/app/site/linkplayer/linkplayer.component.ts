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
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'linkplayer',
  templateUrl: './linkplayer.component.html',
  styleUrls: ['./linkplayer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LinkplayerComponent implements OnInit {

  public loading$: Subject<boolean> = new Subject();
  public links$: Subject<Link> = new Subject();
  url: string;
  urlSafe: SafeResourceUrl;

  constructor(    
    public sanitizer: DomSanitizer,
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

  public jo(valtozo){
    var server = valtozo.split("/");
    var kiszolgalo = server[2];
    switch(kiszolgalo) { 
      case 'vidoza.net': { 
        var embed="https://vidoza.net/embed-"+server[3];
         break; 
      } 
      case 'openload.co': { 
        var embed="https://openload.co/embed/"+server[4];
         break; 
      } 
      case 'vidlox.me': { 
        var embed="https://vidlox.me/embed-"+server[3];
         break; 
      } 
      case 'vidup.io': { 
        var embed="https://vidup.io/embed/"+server[3];
         break; 
      } 
      case 'thevid.net': { 
        var embed="http://thevid.net/e/"+server[4];
         break; 
      } 
      case 'vev.io': { 
        var embed="https://vev.io/embed/"+server[3];
         break; 
      } 
      case 'upvid.co': { 
        var embed="https://upvid.co/"+server[3];
         break; 
      } 
      case 'vidcloud.co': { 
        var embed="https://vcstream.to/embed/"+server[4];
         break; 
      } 
      case 'xdrive.cc': { 
        var embed="https://xdrive.cc/embed/"+server[4];
         break; 
      } 
      case 'flashx.tv': { 
        var embed="http://www.flashx.tv/embed-"+server[3]+".html";
         break; 
      } 
      case 'www.flashx.tv': { 
        var embed="http://www.flashx.tv/embed-"+server[3]+".html";
         break; 
      } 
      case 'vidzi.tv': { 
        var embed="https://vidzi.tv/embed-"+server[3]+".html";
         break; 
      } 
      case 'watchvideo.us': { 
        var embed="https://watchvideo.us/embed-"+server[3];
         break; 
      } 
      default: { 
         var embed="atiranyitas";
         break; 
      } 
   } 
   
   return embed;
  
  
  }

public server(valtozo){
  var server = valtozo.split("/");
  var kiszolgalo = server[2];
  switch(kiszolgalo) { 
    case 'vidoza.net': { 
      var embed="https://vidoza.net/embed-"+server[3];
       break; 
    } 
    case 'openload.co': { 
      var embed="https://openload.co/embed/"+server[4];
       break; 
    } 
    case 'vidlox.me': { 
      var embed="https://vidlox.me/embed-"+server[3];
       break; 
    } 
    case 'vidup.io': { 
      var embed="https://vidup.io/embed/"+server[3];
       break; 
    } 
    case 'thevid.net': { 
      var embed="http://thevid.net/e/"+server[4];
       break; 
    } 
    case 'vev.io': { 
      var embed="https://vev.io/embed/"+server[3];
       break; 
    } 
    case 'upvid.co': { 
      var embed="https://upvid.co/"+server[3];
       break; 
    } 
    case 'vidcloud.co': { 
      var embed="https://vcstream.to/embed/"+server[4];
       break; 
    } 
    case 'xdrive.cc': { 
      var embed="https://xdrive.cc/embed/"+server[4];
       break; 
    } 
    case 'flashx.tv': { 
      var embed="http://www.flashx.tv/embed-"+server[3]+".html";
       break; 
    } 
    case 'www.flashx.tv': { 
      var embed="http://www.flashx.tv/embed-"+server[3]+".html";
       break; 
    } 
    case 'vidzi.tv': { 
      var embed="https://vidzi.tv/embed-"+server[3]+".html";
       break; 
    } 
    case 'watchvideo.us': { 
      var embed="https://watchvideo.us/embed-"+server[3];
       break; 
    } 
    default: { 
       var embed="atiranyitas";
       break; 
    } 
 } 
 
 return this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(embed);
}

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
