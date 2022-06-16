import {Component, Input, OnInit} from '@angular/core';
import {ICount, ISection} from "../../models/common.model";

@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss']
})
export class ParagraphComponent implements OnInit {
  @Input() section: ISection;
  paragraph: ICount;

  constructor() { }

  ngOnInit(): void {
    this.paragraph = this.section.details[0];
  }

}
