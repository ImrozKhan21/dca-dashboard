import {Component, Input, OnInit} from '@angular/core';
import {IProfile, ISection} from "../../models/common.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() section: ISection;
  profileDetails: IProfile;

  constructor() {
  }

  ngOnInit(): void {
    this.profileDetails = this.section.details[0];
  }

}
