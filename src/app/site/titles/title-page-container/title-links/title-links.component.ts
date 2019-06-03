import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {TitleState} from '../../state/title-state';
import {Observable} from 'rxjs';
import {Title} from '../../../../models/title';
import {Link} from '../../../../models/link';
import {Episode} from '../../../../models/episode';
import {MEDIA_TYPE} from '../../../media-type';
import {TitleUrlsService} from '../../title-urls.service';
import {ShareableNetworks, shareLinkSocially} from '../../../../../common/core/utils/share-link-socially';
import {Settings} from '../../../../../common/core/config/settings.service';
import {shareViaEmail} from '../../../../../common/core/utils/share-via-email';
import {copyToClipboard} from '../../../../../common/core/utils/copy-link-to-clipboard';
import {MESSAGES} from '../../../../toast-messages';
import {Translations} from '../../../../../common/core/translations/translations.service';
import {Toast} from '../../../../../common/core/ui/toast.service';

@Component({
  selector: 'title-links',
  templateUrl: './title-links.component.html',
  styleUrls: ['./title-links.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleLinksComponent {
  @Select(TitleState.links) links$: Observable<Link>;
  
  constructor(
    public urls: TitleUrlsService,
    private settings: Settings,
    private store: Store,
    private i18n: Translations,
    private toast: Toast,
) {
}

public server(valtozo){
  var myarr = valtozo.split("/");
  var server = myarr[2].split(".")
   return server[0];
}

public nyelv(valtozo){
  var myarr = valtozo.split("-");
  var currentlang= myarr[0];
  var nyelv;
  switch(currentlang) { 
                  
    case 'Magyar': {
       nyelv ="https://filmgo.cc/images/flag/hu-hu.png"; 
       break; 
    } 
    case 'Magyar Felirat': {
      nyelv ="https://filmgo.cc/images/flag/en-hu.png"; 
      break; 
   } 
   case 'Angol, magyarfelirat': {
    nyelv ="https://filmgo.cc/images/flag/en-hu.png"; 
    break; 
 }
 case 'Magyar szinkron': {
  nyelv ="https://filmgo.cc/images/flag/hu-hu.png"; 
  break; 
}
case 'Angol': {
  nyelv ="https://filmgo.cc/images/flag/en-en.png"; 
  break; 
}
case 'Egyéb': {
  nyelv ="https://filmgo.cc/images/flag/ot-ot.png"; 
  break; 
}
case 'Egyéb, magyarfelirat': {
  nyelv ="https://filmgo.cc/images/flag/ot-hu.png"; 
  break; 
}
default: { 
  nyelv ="https://filmgo.cc/images/flag/en-hu.png"; 
       break; 
    } 
 } 
 return nyelv;

}


}
