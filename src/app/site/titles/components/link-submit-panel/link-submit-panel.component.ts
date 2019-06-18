import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'link-submit-panel',
  templateUrl: './link-submit-panel.component.html',
  styleUrls: ['./link-submit-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkSubmitPanelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
