import * as React from "react";
import { withRouteData, withRouter, RouteComponentProps } from "react-static";
import animateScrollTo from "animated-scroll-to";
import { Fade } from "react-reveal";

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
  Calendar,
  Community,
  GettingStarted,
  Landing,
  IDatoEvent,
  Paged,
  Project,
  Entity,
  InstaPost,
  IMediumPost
} from "../../types";
import { menuItems, theme } from "../../configs";
import { Footer } from "../../components/footer/index";
import { MobileHeader } from "../../components/mobile-header/index";
import { calcBannerSize, detectBrowser, IBrowserInfo } from "../../utils/index";
import { SectionWrapper } from "../../components/section-wrapper/index";

interface IState {
  scrollY: number;
  sectionOffsets: number[];
  stickyMenu: boolean;
  activeSectionIndex: number;
  isMobileMenuOpen: boolean;
  openMobileSectionIndex: number;
  browser: IBrowserInfo | null;
  mobileAddressBarHeight: number;
  screenInitialHeight: number;
  mounted: boolean;
}

export interface IHomeProps {
  data: {
    calendar: Calendar;
    about: About;
    community: Community;
    gettingStarted: GettingStarted;
    landing: Landing;
    showcase: {
      gallery: Paged<Project>;
      experiments: Paged<InstaPost>;
      caseStudies: Paged<IMediumPost>;
    } & Entity;
    [index: string]: object;
  };
}

const mobileScrollOptions = {
  speed: 1000,
  minDuration: 500
};

class HomePage extends React.Component<
  IHomeProps & RouteComponentProps<any>,
  IState
> {
  constructor(props: IHomeProps & RouteComponentProps<any>) {
    super(props);
    this.state = {
      scrollY: 0,
      sectionOffsets: [],
      stickyMenu: false,
      activeSectionIndex: -1,
      isMobileMenuOpen: false,
      openMobileSectionIndex: -1,
      mobileAddressBarHeight: 0,
      screenInitialHeight: 0,
      browser: null,
      mounted: false
    };
  }

  componentDidMount() {
    document.addEventListener("scroll", this.onScroll);
    window.addEventListener("resize", this.onResize);
    this.setState({
      browser: detectBrowser(),
      screenInitialHeight: window.innerHeight,
      mounted: true
    });
  }

  componentWillUnmount() {
    if (typeof document !== "undefined") {
      document.removeEventListener("scroll", this.onScroll);
      window.removeEventListener("resize", this.onResize);
    }
  }

  onResize = () => {
    this.updateOffsetTops();
    if (typeof document !== "undefined") {
      if (
        window.innerWidth <= 600 &&
        window.innerHeight !== this.state.screenInitialHeight
      ) {
        const addressBarHeight =
          window.innerHeight - this.state.screenInitialHeight;
        this.setState({
          mobileAddressBarHeight: addressBarHeight
        });
      }
    }
  };

  onScrollStop = (closetsIndex: number) => {
    if (typeof document !== "undefined") {
      if (window.innerWidth > 600) {
        // window.location.hash =
        // closetsIndex === -1 ? "" : `#${menuItems[closetsIndex].key}`;
      }
    }
  };

  onBannerMounted = (bannerHeight: number) => {
    this.updateOffsetTops(bannerHeight);
  };

  onScroll = () => {
    if (typeof document !== "undefined") {
      if (window.innerWidth <= 600) {
        return null;
      }

      const { sectionOffsets } = this.state;
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

      const bannerThumb = this.props.data.landing.banner.media[0];
      const bannerSize = calcBannerSize(bannerThumb, window.innerWidth);

      if (scrollY >= bannerSize.height) {
        this.setState({ stickyMenu: true });
      } else {
        this.setState({ stickyMenu: false });
      }
    }
  };

  updateOffsetTops = (bannerHeight: number = 0) => {
    if (typeof document !== "undefined") {
      const sections = [].slice
        .call(document.body.querySelectorAll(".section-wrapper"))
        .concat(document.body.querySelector("footer"));

      this.setState({
        sectionOffsets: sections.map((section: HTMLElement) => {
          return bannerHeight + section.offsetTop + section.offsetHeight;
        })
      });
    }
  };

  toggleMobileMenu = () => {
    const { isMobileMenuOpen } = this.state;

    this.setState({
      isMobileMenuOpen: !isMobileMenuOpen
    });

    //if it is not open scroll to first section
    //otherwise send -1 to reset scroll
    this.scrollToSection(isMobileMenuOpen ? -1 : 0);
  };

  scrollToSection = (index: number) => {
    return new Promise((resolve, reject) => {
      if (typeof document !== "undefined") {
        const top = this.calcSectionTop(index);
        animateScrollTo(top, {
          ...mobileScrollOptions,
          onComplete: resolve
        });
      }
    });
  };

  calcSectionTop = (index: number) => {
    let top = 0;
    if (index > -1) {
      const { mobileAddressBarHeight, sectionOffsets } = this.state;
      const baseTop = sectionOffsets[0];
      const itemHeight = (window.innerHeight - 70) / 5 + 2;
      top =
        baseTop +
        70 +
        (index - 1) * itemHeight -
        mobileAddressBarHeight -
        (mobileAddressBarHeight === 0 ? 25 : 0);
    }
    return top;
  };

  toggleSection = async (index: number) => {
    if (typeof document !== "undefined") {
      //mobile only
      if (window.innerWidth > 600) {
        return;
      }

      // if it is already open
      if (index === this.state.openMobileSectionIndex) {
        this.closeAll();
      } else if (index !== -1) {
        await this.closeAll();
        this.scrollToSection(index);
        await this.setMenuIndex(index);
      }
    }
  };

  setMenuIndex = (index: number) => {
    return new Promise((resolve, reject) => {
      this.setState({ openMobileSectionIndex: index }, resolve);
    });
  };

  closeAll = () => {
    return this.setMenuIndex(-1);
  };

  render() {
    const { data } = this.props;
    const {
      activeSectionIndex,
      stickyMenu,
      openMobileSectionIndex,
      isMobileMenuOpen,
      browser,
      mounted
    } = this.state;

    return (
      <div
        className={`home-page ${browser ? browser.name : ""} ${
          mounted ? "mounted" : ""
        }`}
      >
        {browser &&
          !browser.isSupported && (
            <div className={"browser-support-alert"}>
              <span>
                Your browser version seems to be quite old. The website is
                probably not shown correctly, but you will be able to see the
                content. Update your browser (>= {browser.supportedVersion}) to
                get the best experience.
              </span>
            </div>
          )}
        <MobileHeader
          isMenuOpen={this.state.isMobileMenuOpen}
          onClick={this.toggleMobileMenu}
        />

        <div className={"landing-section"}>
          <Banner data={data.landing.banner} onMount={this.onBannerMounted} />
          <SectionWrapper
            className={`${isMobileMenuOpen ? "close" : ""}`}
            id="landing"
            color={theme.colors.pink}
          >
            <Menu
              activeIndex={activeSectionIndex}
              className={stickyMenu ? "sticky" : ""}
            />
            <SectionLanding data={data.landing} />
          </SectionWrapper>
        </div>

        <div className={`sections ${isMobileMenuOpen ? "show" : ""}`}>
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
