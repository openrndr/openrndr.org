import React from "react";
import { prefetch } from "react-static";
import { Location } from "history";

import Section from "../components/section/index";
import SectionHeader from "../components/section/section-header";
import SectionBody from "../components/section/section-body";
import ProjectSet from "../components/project-set/index";
import TextBlock from "../components/text-block";
import EventSet from "../components/event-set";
import Footer from "../components/footer";
import TextSet from "../components/text-set";

import {
  Event,
  Calendar,
  About,
  Community,
  GettingStarted,
  Landing,
  Paged,
  Project
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
    [index: string]: Paged<Project>;
    gallery: Paged<Project>;
    experiments: Paged<Project>;
    caseStudies: Paged<Project>;
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

export default class Home extends React.Component<Props, State> {
  state: State = {
    isInitialDataFetched: false,
    data: null
  };

  componentWillMount() {
    console.log("this.props.data", this.props.data);
    prefetch("/data").then((data: { initialProps: DataProps }) => {
      console.log("initialProps from prefetch /data", data);
      this.setState({
        isInitialDataFetched: true,
        data: data.initialProps
      });
    });
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
    console.log(landing);

    const contentBlocks = gettingStarted.contentBlocks.map(cb => {
      return <TextBlock data={cb} />;
    });

    return (
      <div className="sweet-home">
        <Section name={"intro"}>
          <SectionHeader />
          <SectionBody name={"Landing"}>
            <TextSet data={landing.contentBlocks} className={"columns-3"} />
          </SectionBody>
        </Section>

        <Section name={"getting-started"}>
          <SectionHeader>
            <h1>Getting started</h1>
            <a href="https://github.com/">Github</a>
          </SectionHeader>
          <SectionBody name={"Getting Started"}>
            <TextSet
              data={gettingStarted.contentBlocks}
              className={"columns-4"}
            />
          </SectionBody>
        </Section>
        <Section name={"Showcase"}>
          <SectionHeader>
            <h1>Showcase</h1>
          </SectionHeader>
          <SectionBody name={"Showcase"}>
            {Object.keys(showcase).map(name => (
              <ProjectSet page={showcase[name]} title={name} />
            ))}
          </SectionBody>
        </Section>
        <Section name={"Community"}>
          <SectionHeader>
            <h2>Community</h2>
          </SectionHeader>
          <SectionBody name={"Community"}>
            <TextSet data={community.contentBlocks} className={"columns-3"} />
          </SectionBody>
        </Section>
        <Section name={"About"}>
          <SectionHeader>
            <h2>About</h2>
          </SectionHeader>
          <SectionBody name={"About"}>
            <TextSet data={about.contentBlocks} className={"columns-3"} />
          </SectionBody>
        </Section>
        <Section name={"Calender"}>
          <SectionHeader>
            <h2>Calendar</h2>
          </SectionHeader>
          <SectionBody name={"Calendar"}>
            <EventSet
              title={"Events"}
              events={this.state.data.calendar.events.data}
            />
          </SectionBody>
        </Section>
        <Footer />
      </div>
    );
  }
}
