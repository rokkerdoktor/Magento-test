import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'test-panel',
  templateUrl: './test-panel.component.html',
  styleUrls: ['./test-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestPanelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
