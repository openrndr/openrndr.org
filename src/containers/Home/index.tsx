import * as React from "react";
import { withRouteData } from "react-static";

import "./style.css";
import { IHomeDataProps, IMenuItem } from "../../types/props";
import { SectionGettingStarted } from "../../components/SectionGetStarted/index";
import { SectionCommunity } from "../../components/SectionCommunity/index";
import { SectionAbout } from "../../components/SectionAbout/index";
import { SectionShowcase } from "../../components/SectionShowcase/index";
import { Banner } from "../../components/Banner/index";
import { Menu } from "../../components/Menu/index";
import { string } from "prop-types";
import { withRouter } from "react-router";
import { SectionLanding } from "../../components/SectionLanding/index";
import { SectionCalendar } from "../../components/SectionCalendar/index";
import { SectionShowcase } from "../../components/SectionShowcase/index";

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

          {/*<div className={"section-wrapper"}>*/}
          {/*<Menu activeKey={"showCase"} />*/}
          {/*<SectionShowcase data={data.showcase} />*/}
          {/*</div>*/}

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
