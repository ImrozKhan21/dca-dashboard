import {Component, Input, OnInit} from '@angular/core';
import {ICount, ISection} from "../../models/common.model";
import {WindowRefService} from "../../services/window-ref.service";

@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss']
})
export class ParagraphComponent implements OnInit {
  @Input() section: ISection;
  paragraph: ICount;

  constructor(private windowRef: WindowRefService) {
  }

  ngOnInit(): void {
    this.paragraph = this.section.details[0];
  }

  open() {
    const url = this.section.open;
    this.windowRef.openUrl(url);
  }

}
