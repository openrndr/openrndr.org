import React from "react";
import { getRouteProps, prefetch } from "react-static";
import { Location } from "history";
import styled from "styled-components";
import { Events, scrollSpy, scroller } from "react-scroll";
import {
  Event,
  About,
  Community,
  GettingStarted,
  Landing,
  Paged,
  Project as ProjectType
} from "../../types";
import { Banner } from "../components/banner";
import { SectionHeader } from "../components/section/section-header";
import { SectionBody } from "../components/section/section-body";
import { TextSet } from "../components/text-set/index";
import { LinkBanner } from "../components/linkBanner";
import { ProjectSet } from "../components/project-set/index";
import { EventSet } from "../components/event-set/index";
import { Footer } from "../components/footer";
import { Section } from "../components/section/index";

export interface DataProps {
  calendar: {
    events: Paged<Event>;
  };
  about: About;
  community: Community;
  gettingStarted: GettingStarted;
  landing: Landing;
  showcase: {
    [index: string]: Paged<ProjectType>;
    gallery: Paged<ProjectType>;
    experiments: Paged<ProjectType>;
    caseStudies: Paged<ProjectType>;
  };
}

interface State {
  isInitialDataFetched: boolean;
  data: DataProps | null;
}

export interface Props {
  location: Location;
  data: DataProps;
}

const Layout = styled.div`
  display: grid;
  > div[name="landing"] {
  }
`;
class Home extends React.Component<Props, State> {
  state: State = {
    isInitialDataFetched: false,
    data: null
  };

  componentWillMount() {
    console.log("home mounting");
    // console.log("home.tsx: this.props.data", this.props.data);
    // console.log("home.tsx props", this.props);
    if ((process as any).browser) {
      // prefetch("/data").then((data: { initialProps: DataProps }) => {
      //   console.log("initialProps from prefetch /data", data);
      //   this.setState({
      //     isInitialDataFetched: true,
      //     data: data.initialProps
      //   });
      // });
    }
  }

  // componentDidMount() {
  //   const name = this.getSectionNameFromPath(this.props.location.pathname);
  //   console.log("name on load", name);
  // }

  // componentWillReceiveProps(nextProps: any) {
  //   const { location: { pathname } } = nextProps;
  //   const name = this.getSectionNameFromPath(pathname);
  //   this.scrollTo(name, 1000, 100);
  // }

  // getSectionNameFromPath = (pathname: string) => {
  //   return pathname.slice(-1 * pathname.length + 1);
  // };

  // scrollTo = (name: string, duration?: number, delay?: number) => {
  //   scroller.scrollTo(name, {
  //     duration: duration || 0,
  //     delay: delay || 0,
  //     smooth: true
  //   });
  // };

  render() {
    const {
      showcase,
      landing,
      gettingStarted,
      about,
      calendar,
      community
    } = this.props.data;

    return (
      <Layout className="sweet-home" id={"containerElement"}>
        <Section id="landing" name="landing">
          <SectionHeader className="banner">
            <Banner data={landing.banner} />
          </SectionHeader>
          <SectionBody>
            <TextSet data={landing.contentBlocks} className={"columns-3"} />
          </SectionBody>
        </Section>

        <Section id="getting-started" name="getting-started">
          <SectionHeader>
            <LinkBanner
              link={"http://github.com"}
              linkTitle={"Source code Github"}
            >
              <h1>Getting started</h1>
            </LinkBanner>
          </SectionHeader>
          <SectionBody>
            <TextSet
              data={gettingStarted.contentBlocks}
              className={"columns-4"}
            />
          </SectionBody>
        </Section>

        <Section id="showcase" name="showcase">
          <SectionHeader>
            <h1>Showcase</h1>
          </SectionHeader>
          <SectionBody>
            {Object.keys(showcase).map(name => (
              <ProjectSet key={name} page={showcase[name]} title={name} />
            ))}
          </SectionBody>
        </Section>
        <Section id="community" name="community">
          <SectionHeader>
            <h2>Community</h2>
          </SectionHeader>
          <SectionBody>
            <TextSet data={community.contentBlocks} className={"columns-3"} />
          </SectionBody>
        </Section>

        <Section id="about" name={"about"}>
          <SectionHeader>
            <h2>About</h2>
          </SectionHeader>
          <SectionBody>
            <TextSet data={about.contentBlocks} className={"columns-3"} />
          </SectionBody>
        </Section>

        <Section id="calendar" name={"calendar"}>
          <SectionHeader>
            <h2>Calendar</h2>
          </SectionHeader>
          <SectionBody>
            <EventSet title={"Events"} events={calendar.events.data} />
          </SectionBody>
        </Section>

        <Footer />
      </Layout>
    );
  }
}

export default getRouteProps(Home);
