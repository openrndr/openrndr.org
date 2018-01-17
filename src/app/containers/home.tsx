import React from "react";
import { prefetch } from "react-static";
import { Location } from "history";
import Section from "../components/section/index";
import SectionHeader from "../components/section/section-header";
import SectionBody from "../components/section/section-body";
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

interface State {
  isInitialDataFetched: boolean;
  data: any;
}

export interface DataProps {
  calendar: {
    events: Paged<Event>;
  };
  about: About;
  community: Community;
  gettingStarted: GettingStarted;
  landing: Landing;
  showcase: {
    gallery: Paged<Project>;
    experiments: Paged<Project>;
    caseStudies: Paged<Project>;
  };
}

export interface Props {
  location: Location;
  data: DataProps;
}

export default class Home extends React.Component<Props, State> {
  state: State = {
    isInitialDataFetched: false,
    data: []
  };

  componentWillMount() {
    prefetch("/data").then(({ initialProps }: any) => {
      this.setState({
        isInitialDataFetched: true,
        data: initialProps
      });
    });
  }

  render() {
    if (!this.state.data) return null;

    //use the pathname to set the scroll position
    console.log(this.props.location.pathname);

    return (
      <div className="sweet-home">
        <Section name={"intro"}>
          <SectionHeader>here will be the intro VIDEO/IMAGE</SectionHeader>
          <SectionBody name={"Landing"}>WHATEVER CONTENT IS</SectionBody>
        </Section>

        <Section name={"getting-started"}>
          <SectionHeader>Getting started</SectionHeader>
          <SectionBody name={"Showcase"}>WHATEVER CONTENT IS</SectionBody>
        </Section>
      </div>
    );
  }
}
