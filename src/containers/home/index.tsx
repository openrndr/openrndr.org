import * as React from "react";
import { withRouteData, withRouter } from "react-static";

import "./style.css";
import { IHomeDataProps } from "../../types/props";
import { Banner } from "../../components/banner/index";
import { Menu } from "../../components/menu/index";
import { SectionLanding } from "../../components/section-landing/index";
import { SectionGettingStarted } from "../../components/section-getstarted/index";
import { SectionCommunity } from "../../components/section-community/index";
import { SectionAbout } from "../../components/section-about/index";
import { SectionCalendar } from "../../components/section-calendar/index";
import { SectionShowcase } from "../../components/section-showcase/index";

interface IState {}

export interface IProps {
  data: IHomeDataProps;
}

class HomePage extends React.Component<IProps, IState> {
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
