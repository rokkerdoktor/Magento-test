import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {TitleState} from '../../state/title-state';
import {Observable} from 'rxjs';
import {Title} from '../../../../models/title';
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
  @Select(TitleState.title) title$: Observable<Title>;
  
  constructor(
    public urls: TitleUrlsService,
    private settings: Settings,
    private store: Store,
    private i18n: Translations,
    private toast: Toast,
) {}


}
