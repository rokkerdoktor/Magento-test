import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  ElementRef,
  OnChanges
} from '@angular/core';
import {OverlayPanel} from '../../../../../common/core/ui/overlay-panel/overlay-panel.service';
import {StarRatingOverlayComponent} from '../rating-widget/star-rating-overlay/star-rating-overlay.component';
import {RIGHT_POSITION} from '../../../../../common/core/ui/overlay-panel/positions/right-position';
import {Episode} from '../../../../models/episode';
import {Title} from '../../../../models/title';
import {Store} from '@ngxs/store';
import {UserListsState} from '../../../lists/user-lists/state/user-lists-state';
import {BehaviorSubject} from 'rxjs';
import {Review} from '../../../../models/review';

@Component({
  selector: 'browserating',
  templateUrl: './browserating.component.html',
  styleUrls: ['./browserating.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrowseratingComponent implements OnChanges {
  @Input() item: Episode|Title;
  @Input() showRateButton = true;
  public userRating$: BehaviorSubject<Review> = new BehaviorSubject(null);

  constructor(
    private overlay: OverlayPanel,
    private store: Store,
) {}

ngOnChanges() {
    if ( ! this.item) return;
    this.updateUserRating();
}
public openRatingOverlay(e: MouseEvent) {
  this.overlay.open(StarRatingOverlayComponent, {
      origin: new ElementRef(e.target),
      position: RIGHT_POSITION,
      data: {item: this.item, userRating: this.userRating$.value}
  }).afterClosed().subscribe(() => {
      this.updateUserRating();
  });
}

private updateUserRating() {
  const rating = this.store.selectSnapshot(UserListsState.ratings).find(review => {
      return review.reviewable_id === this.item.id && review.media_type === this.item.type;
  });
  this.userRating$.next(rating);
}


}