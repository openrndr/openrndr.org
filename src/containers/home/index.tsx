import * as React from "react";
import { withRouteData, withRouter } from "react-static";

import "./style.css";
import { Banner } from "../../components/banner/index";
import { Menu } from "../../components/menu/index";
import { SectionLanding } from "../../components/section-landing/index";
import { SectionGettingStarted } from "../../components/section-getstarted/index";
import { SectionCommunity } from "../../components/section-community/index";
import { SectionAbout } from "../../components/section-about/index";
import {
  SectionCalendar,
  ICalendarProps
} from "../../components/section-calendar/index";
import {
  SectionShowcase,
  IShowCaseProps
} from "../../components/section-showcase/index";
import {
  About,
  Community,
  GettingStarted,
  Landing,
  IDatoEvent,
  Paged,
  Project,
  Entity
} from "../../types";

interface IState {}

export interface IHomeProps {
  data: {
    calendar: {
      events: Paged<IDatoEvent>;
    } & Entity;
    about: About;
    community: Community;
    gettingStarted: GettingStarted;
    landing: Landing;
    showcase: {
      gallery: Paged<Project>;
      experiments: Paged<Project>;
      caseStudies: Paged<Project>;
    } & Entity;
    [index: string]: object;
  };
}

class HomePage extends React.Component<IHomeProps, IHomeProps> {
  render() {
    const { data } = this.props;

    return (
      <div className={"home-page"}>
        <Banner />
        <div className={"content"}>
          <div className={"section-wrapper"} id={"landing"}>
            <Menu activeKey={"landing"} />
            <SectionLanding data={data.landing} />
          </div>

          <div className={"section-wrapper"} id={"gettingStarted"}>
            <Menu activeKey={"gettingStarted"} />
            <SectionGettingStarted data={data.gettingStarted} />
          </div>

          <div className={"section-wrapper"} id={"showcase"}>
            <Menu activeKey={"showcase"} />
            <SectionShowcase data={data.showcase} />
          </div>

          <div className={"section-wrapper"} id={"community"}>
            <Menu activeKey={"community"} />
            <SectionCommunity data={data.community} />
          </div>

          <div className={"section-wrapper"} id={"about"}>
            <Menu activeKey={"about"} />
            <SectionAbout data={data.about} />
          </div>

          <div className={"section-wrapper"} id={"calendar"}>
            <Menu activeKey={"calendar"} />
            <SectionCalendar data={data.calendar} />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(withRouteData(HomePage));
