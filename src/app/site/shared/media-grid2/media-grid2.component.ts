import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {Title} from '../../../models/title';
import {Person} from '../../../models/person';
import {TitleUrlsService} from '../../titles/title-urls.service';
import {MEDIA_TYPE} from '../../media-type';

@Component({
  selector: 'media-grid2',
  templateUrl: './media-grid2.component.html',
  styleUrls: ['./media-grid2.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MediaGrid2Component {
  @Input() actionIcon = 'play-arrow';
  @Input() items: (Title|Person)[] = [];
  @Output() actionClick = new EventEmitter();

  constructor(
      public urls: TitleUrlsService,
  ) {}

  public isPerson(item: Title|Person) {
      return item.type !== MEDIA_TYPE.PERSON;
  }
}
