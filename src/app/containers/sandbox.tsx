import React from "react";
import { prefetch } from "react-static";
import { Location } from "history";
import styled from "styled-components";

import Section from "../components/section/index";
import SectionHeader from "../components/section/section-header";
import SectionBody from "../components/section/section-body";
import ProjectSet from "../components/project-set/index";
import TextBlock from "../components/text-block";
import EventSet from "../components/event-set";
import TextSet from "../components/text-set";
import Footer from "../components/footer";
import Banner from "../components/banner";
import LinkBanner from "../components/linkBanner";

import {
  Event,
  Calendar,
  About,
  Community,
  GettingStarted,
  Landing,
  Paged,
  Project as ProjectType
} from "../../types";
import "../app.css";

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
  data: DataProps;
}

export interface Props {
  location: Location;
  data: DataProps;
}

const Layout = styled.div`
  display: grid;
  section.landing {
    height: 100vh;
    .banner {
    }
  }
  h1 {
    font-size: 32px;
  }
`;

export default class Home extends React.Component<Props, State> {
  state: State = {
    isInitialDataFetched: false,
    data: null
  };

  componentWillMount() {
    console.log("home.tsx: this.props.data", this.props.data);
    if ((process as any).browser) {
      prefetch("/data").then((data: { initialProps: DataProps }) => {
        console.log("initialProps from prefetch /data", data);
        this.setState({
          isInitialDataFetched: true,
          data: data.initialProps
        });
      });
    }
  }

  render() {
    if (!this.state.data) return null;

    const {
      showcase,
      landing,
      gettingStarted,
      about,
      calendar,
      community
    } = this.state.data;

    // use the pathname to set the scroll position
    console.log(this.props.location.pathname);

    return (
      <Layout className="sweet-home">
        <Section id="landing" name="landing">
          <SectionHeader className="banner">
            <Banner data={landing.banner} />
          </SectionHeader>
          <SectionBody>
            <TextSet data={landing.contentBlocks} className={"columns-3"} />
          </SectionBody>
        </Section>

        <Section id="getting-started" name={"Getting Started"}>
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
        <Section id="showcase" name={"Showcase"}>
          <SectionHeader>
            <h1>Showcase</h1>
          </SectionHeader>
          <SectionBody>
            {Object.keys(showcase).map(name => (
              <ProjectSet page={showcase[name]} title={name} />
            ))}
          </SectionBody>
        </Section>
        <Section id="community" name={"Community"}>
          <SectionHeader>
            <h2>Community</h2>
          </SectionHeader>
          <SectionBody>
            <TextSet data={community.contentBlocks} className={"columns-3"} />
          </SectionBody>
        </Section>
        <Section id="about" name={"About"}>
          <SectionHeader>
            <h2>About</h2>
          </SectionHeader>
          <SectionBody>
            <TextSet data={about.contentBlocks} className={"columns-3"} />
          </SectionBody>
        </Section>
        <Section id="calendar" name={"Calendar"}>
          <SectionHeader>
            <h2>Calendar</h2>
          </SectionHeader>
          <SectionBody>
            <EventSet
              title={"Events"}
              events={this.state.data.calendar.events.data}
            />
          </SectionBody>
        </Section>
        <Footer />
      </Layout>
    );
  }
}
