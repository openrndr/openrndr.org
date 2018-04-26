import * as React from "react";
import { withRouteData, withRouter } from "react-static";

import "./style.css";
import { Banner } from "../../components/banner/index";
import { Menu } from "../../components/menu/index";
import { SectionLanding } from "../../components/section-landing/index";
import { SectionGettingStarted } from "../../components/section-getstarted/index";
import { SectionCommunity } from "../../components/section-community/index";
import { SectionAbout } from "../../components/section-about/index";
import { SectionCalendar } from "../../components/section-calendar/index";
import { SectionShowcase } from "../../components/section-showcase/index";
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
import { theme } from "../../configs";

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

const SectionWrapper: React.SFC<{ id: string; color: string }> = props => {
  const { children, id, color } = props;
  return (
    <section
      style={{
        borderBottom: `1px solid ${color}`,
        borderTop: `1px solid ${color}`
      }}
      className="section-wrapper"
      id={id}
    >
      <Menu activeKey={id} />
      {children}
    </section>
  );
};

class HomePage extends React.Component<IHomeProps, IHomeProps> {
  render() {
    const { data } = this.props;

    return (
      <div className={"home-page"}>
        <Banner />
        <div className={"content"}>
          <SectionWrapper id="landing" color={theme.colors.pink}>
            <SectionLanding data={data.landing} />
          </SectionWrapper>

          <SectionWrapper id="gettingStarted" color={theme.colors.pink}>
            <SectionGettingStarted data={data.gettingStarted} />
          </SectionWrapper>

          <SectionWrapper id="showcase" color={theme.colors.green}>
            <SectionShowcase data={data.showcase} />
          </SectionWrapper>

          <SectionWrapper id="community" color={theme.colors.cyan}>
            <SectionCommunity data={data.community} />
          </SectionWrapper>

          <SectionWrapper id="about" color={theme.colors.purple}>
            <SectionAbout data={data.about} />
          </SectionWrapper>

          <SectionWrapper id="calendar" color={theme.colors.pink}>
            <SectionCalendar data={data.calendar} />
          </SectionWrapper>
        </div>
      </div>
    );
  }
}

export default withRouter(withRouteData(HomePage));
