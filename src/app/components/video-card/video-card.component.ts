import {Component, Input, OnInit} from '@angular/core';
import {ISection} from "../../models/common.model";

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent implements OnInit {
  @Input() section: ISection;

  constructor() { }

  ngOnInit(): void {
  }

}
