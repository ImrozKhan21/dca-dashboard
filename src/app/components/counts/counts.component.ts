import {Component, Input, OnInit} from '@angular/core';
import {ICount, ISection} from "../../models/common.model";

@Component({
  selector: 'app-counts',
  templateUrl: './counts.component.html',
  styleUrls: ['./counts.component.scss']
})
export class CountsComponent implements OnInit {
  @Input() section: ISection;
  count: ICount;

  constructor() { }

  ngOnInit(): void {
    this.count = this.section.details[0];
  }

}
