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
import { closest } from "../../utils/index";
import { Footer } from "../../components/footer/index";

interface IState {
  scrollY: number;
  sectionOffsets: number[];
  firstSectionHeight: number;
  stickyMenu: boolean;
  activeSectionIndex: number;
}

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

interface IVisibilityShape {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}

interface IVisibility {
  onChange: (isVisible: boolean, visibilityRect?: IVisibilityShape) => void;
  active?: boolean;
  partialVisibility?: boolean;
  offset?: IVisibilityShape;
  minTopValue?: number;
  intervalCheck?: boolean;
  intervalDelay?: number;
  scrollCheck?: boolean;
  scrollDelay?: number;
  scrollThrottle?: number;
  resizeCheck?: boolean;
  resizeDelay?: number;
  resizeThrottle?: number;
  containment?: any;
  delayedCall?: boolean;
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
      <div className={"gap"} />
      {children}
    </section>
  );
};

class HomePage extends React.Component<IHomeProps, IState> {
  private wrapper: HTMLElement | null;

  constructor(props: IHomeProps) {
    super(props);
    this.state = {
      scrollY: 0,
      sectionOffsets: [],
      firstSectionHeight: 0,
      stickyMenu: false,
      activeSectionIndex: -1
    };
  }

  componentDidMount() {
    this.calcOffsetTops();
    document.addEventListener("scroll", this.onScroll);
  }

  componentWillUnmount() {
    if (typeof document !== "undefined") {
      document.addEventListener("scroll", this.onScroll);
    }
  }

  onScroll = () => {
    if (typeof document !== "undefined") {
      const { sectionOffsets, stickyMenu, firstSectionHeight } = this.state;

      const { scrollY } = window;

      console.log(window.location.hash);

      const closetsIndex = sectionOffsets.findIndex(
        (offset, i) =>
          scrollY >= offset && scrollY <= (sectionOffsets[i + 1] | 0)
      );

      this.setState({
        activeSectionIndex: closetsIndex
      });

      if (scrollY >= firstSectionHeight) {
        if (closetsIndex === -1) {
          this.setState({
            stickyMenu: true,
            activeSectionIndex: 0
          });
        } else {
          this.setState({
            stickyMenu: true
          });
        }
      } else if (stickyMenu) {
        this.setState({
          stickyMenu: false
        });
      }
    }
  };

  calcOffsetTops = () => {
    if (typeof document !== "undefined") {
      if (this.wrapper) {
        const sections = [].slice.call(
          this.wrapper.querySelectorAll(".section-wrapper")
        );
        const firstSection: HTMLElement | null = document.querySelector(
          ".banner"
        );
        this.setState({
          sectionOffsets: sections.map(
            (section: HTMLElement) =>
              section.offsetTop + section.offsetHeight * 0.5
          ),
          firstSectionHeight: firstSection ? firstSection.offsetHeight : 0
        });
      }
    }
  };

  render() {
    const { data } = this.props;
    const { activeSectionIndex, stickyMenu } = this.state;

    return (
      <div className={"home-page"}>
        <Banner data={data.landing.banner} />

        <Menu
          activeIndex={activeSectionIndex}
          className={stickyMenu ? "sticky" : ""}
        />

        <div className={"content"} ref={ref => (this.wrapper = ref)}>
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
        <Footer />
      </div>
    );
  }
}

export default withRouter(withRouteData(HomePage));
