import {About, Community, GettingStarted, Landing, Paged, Project as ProjectType} from "./index";


export interface IShowCaseProps {
  [index: string]: Paged<ProjectType>;
  gallery: Paged<ProjectType>;
  experiments: Paged<ProjectType>;
  caseStudies: Paged<ProjectType>;
}

export interface ICalendarProps {
  events: Paged<Event>;
}

export interface IHomeDataProps {
  calendar: ICalendarProps;
  about: About;
  community: Community;
  gettingStarted: GettingStarted;
  landing: Landing;
  showcase: IShowCaseProps;
  [index: string]: object;
}


export interface IMenuItem {
  key: string;
  title: string;
}