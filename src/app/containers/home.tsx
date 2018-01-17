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

    //use the pathname to set the scroll position
    // console.log(this.props.location.pathname);
    console.log("HERE IS SOME DATA ", this.state.data.calendar.events);
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
