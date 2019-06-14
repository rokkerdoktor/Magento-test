import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {TITLE_SORT_OPTIONS} from '../select-options/title-sort-options';
import { Model } from '../../../../../models/Model';

@Component({
  selector: 'view-titles-switch-widget',
  templateUrl: './view-titles-switch-widget.component.html'

})
export class ViewTitlesSwitchWidgetComponent  {
  public model: Model;

  constructor() {
    this.model = new Model();
        this.model.param1 = "view-titles-switch-widget.component.scss";
  }

  public LoadDefaultStyle(){
    this.model.param1 = "view-titles-switch-widget.component.scss";
  }

  public LoadNewStyle(){
    this.model.param1 = "view-titles-switch-widget.component.scss";
  }

}
