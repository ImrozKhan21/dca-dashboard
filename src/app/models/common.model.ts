import {GridType} from "angular-gridster2/lib/gridsterConfig.interface";

export interface IEnv {
  "authority": string;
  "cinchyRootUrl": string;
  "clientId": string;
  "redirectUri": string;
  "version": string;
}

export interface ITab {
  pageId: string;
  pageSequence: number;
  pageTitle: string;
  icon: string;
  gridType: string;
}

export interface ISection {
  format: string;
  queryDomain: string;
  queryName: string;
  sectionName: string;
  sectionDesc: string;
  details?: any;
  cols: number;
  rows: number;
  y: number;
  x: number;
  open: string;
  gridType: GridType;
}

export interface IProfile {
  text: string;
  photo: string;
  paragraph: string;
}

export interface ICount  {
  Value: number;
}

export interface IOption {
  name: string;
  code: string;
}


export interface IAvatar {
  name: string;
  linkedinUrl: string;
  image: string;
}


export interface IDropdownClick {
  dropdownStr: string,
  countrySelected?: string
}

export interface ITag {
  label: string;
  group: string;
}


export interface IWebsiteDetails {
  route: string;
  routeId: string;
  metaTitle: string;
  metaDesc: string;
  metaImg: string;
  metaAuthor: string;
  heroHeader: string;
  heroDesc: string;
  heroLinkLabel: string;
  heroLinkUrl: string;
  heroVideo: string;
  insideSectionButton?: string;
}

export interface IUser {
  displayName: string;
  name: string;
  username: string;
  photo: string;
  joinedDate: string;
}

export interface IField {
  title: string;
  label: string;
  isMultiple: string;
  isCheckbox: string;
  isDisabled: string;
  width: number;
  isTextArea: string;
  isHidden?: string;
}

export interface IFormField {
  label: string;
  type?: FieldTypes;
  options?: any[];
  isMultiple: boolean;
  isCheckbox: boolean;
  isDisabled: boolean;
  id: string;
  width?: number;
  isTextArea?: boolean;
  isHidden?: boolean;
}

export interface IFooter {
  sequence: number;
  footerTitle: string;
  footerLink: string;
}


export interface ISocialMedia {
  socialSequence: number;
  socialTitle: string;
  socialIcon: string;
  socialLink: string;
}


export type FieldTypes = 'input' | 'link';
