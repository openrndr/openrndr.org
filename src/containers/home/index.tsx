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
import { menuItems, theme } from "../../configs";
import { Footer } from "../../components/footer/index";
import { MobileHeader } from "../../components/mobile-header/index";

interface IState {
  scrollY: number;
  sectionOffsets: number[];
  firstSectionHeight: number;
  stickyMenu: boolean;
  activeSectionIndex: number;
  isMobileMenuOpen: boolean;
  openMobileSectionIndex: number;
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

const SectionWrapper: React.SFC<{
  id: string;
  color: string;
  title?: string;
  onTitleClick?: () => void;
  className?: string;
}> = props => {
  const {
    children,
    id,
    color,
    title,
    onTitleClick = () => {},
    className = ""
  } = props;
  return (
    <section
      className={`section-wrapper ${className}`}
      id={id}
      style={{
        borderBottom: id === "calendar" ? `1px solid ${color}` : "none"
      }}
    >
      {title && (
        <div
          className={"section-title"}
          style={{
            borderBottom: `1px solid ${color}`,
            borderTop: `1px solid ${color}`
          }}
        >
          <div className={"gap"} />
          <h1 onClick={onTitleClick}>{title}</h1>
        </div>
      )}
      <div className={"section-body"}>
        <div className={"gap"} />
        {children}
      </div>
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
      activeSectionIndex: -1,
      isMobileMenuOpen: false,
      openMobileSectionIndex: -1
    };
  }

  componentDidMount() {
    this.updateOffsetTops();
    document.addEventListener("scroll", this.onScroll);
    window.addEventListener("resize", this.onResize);
  }

  componentWillUnmount() {
    if (typeof document !== "undefined") {
      document.removeEventListener("scroll", this.onScroll);
      window.removeEventListener("resize", this.onResize);
    }
  }

  onResize = () => {
    this.updateOffsetTops();
  };

  onScrollStop = (closetsIndex: number) => {
    if (typeof document !== "undefined") {
      if (window.innerWidth >= 1200) {
        window.location.hash =
          closetsIndex === -1 ? "" : `#${menuItems[closetsIndex].key}`;
      }
    }
  };

  onScroll = () => {
    if (typeof document !== "undefined") {
      const { stickyMenu, firstSectionHeight, sectionOffsets } = this.state;
      const { scrollY } = window;

      const closetsIndex = sectionOffsets.findIndex(
        (offset, i) =>
          scrollY >= offset && scrollY <= (sectionOffsets[i + 1] | 0)
      );

      setTimeout(() => {
        if (window.scrollY === scrollY) {
          this.onScrollStop(closetsIndex);
        }
      }, 200);

      this.setState({
        activeSectionIndex: closetsIndex
      });

      if (scrollY >= firstSectionHeight) {
        if (closetsIndex === -1) {
          this.setState({
            stickyMenu: true
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

  updateOffsetTops = () => {
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
              section.offsetTop + section.offsetHeight * 0.8
          ),
          firstSectionHeight: firstSection ? firstSection.offsetHeight : 0
        });
      }
    }
  };

  toggleMobileMenu = () => {
    this.setState({
      isMobileMenuOpen: !this.state.isMobileMenuOpen
    });
  };

  toggleSection = (index: number) => {
    if (typeof document !== "undefined") {
      if (window.innerWidth > 760) {
        return;
      }

      if (index === this.state.openMobileSectionIndex) {
        this.setState({
          openMobileSectionIndex: -1
        });
      } else if (index !== -1) {
        this.setState({
          openMobileSectionIndex: index
        });
      }
    }
  };

  render() {
    const { data } = this.props;
    const {
      activeSectionIndex,
      stickyMenu,
      openMobileSectionIndex,
      isMobileMenuOpen
    } = this.state;

    return (
      <div className={"home-page"}>
        <MobileHeader
          isMenuOpen={this.state.isMobileMenuOpen}
          onClick={this.toggleMobileMenu}
        />

        <Banner data={data.landing.banner} />

        <Menu
          activeIndex={activeSectionIndex}
          className={stickyMenu ? "sticky" : ""}
        />

        <SectionWrapper
          className={`${isMobileMenuOpen ? "close" : ""}`}
          id="landing"
          color={theme.colors.pink}
        >
          <SectionLanding data={data.landing} />
        </SectionWrapper>

        <div
          className={`sections ${isMobileMenuOpen ? "show" : ""}`}
          ref={ref => (this.wrapper = ref)}
        >
          <SectionWrapper
            id="gettingStarted"
            color={theme.colors.pink}
            title={menuItems[0].title}
            onTitleClick={() => this.toggleSection(0)}
            className={openMobileSectionIndex === 0 ? "open" : ""}
          >
            <SectionGettingStarted data={data.gettingStarted} />
          </SectionWrapper>

          <SectionWrapper
            id="showcase"
            color={theme.colors.green}
            title={menuItems[1].title}
            onTitleClick={() => this.toggleSection(1)}
            className={openMobileSectionIndex === 1 ? "open" : ""}
          >
            <SectionShowcase data={data.showcase} />
          </SectionWrapper>

          <SectionWrapper
            id="community"
            color={theme.colors.cyan}
            title={menuItems[2].title}
            onTitleClick={() => this.toggleSection(2)}
            className={openMobileSectionIndex === 2 ? "open" : ""}
          >
            <SectionCommunity data={data.community} />
          </SectionWrapper>

          <SectionWrapper
            id="about"
            color={theme.colors.purple}
            title={menuItems[3].title}
            onTitleClick={() => this.toggleSection(3)}
            className={openMobileSectionIndex === 3 ? "open" : ""}
          >
            <SectionAbout data={data.about} />
          </SectionWrapper>

          <SectionWrapper
            id="calendar"
            color={theme.colors.pink}
            title={menuItems[4].title}
            onTitleClick={() => this.toggleSection(4)}
            className={openMobileSectionIndex === 4 ? "open" : ""}
          >
            <SectionCalendar data={data.calendar} />
          </SectionWrapper>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(withRouteData(HomePage));
