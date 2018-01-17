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

    // use the pathname to set the scroll position
    console.log(this.props.location.pathname);

    return (
        <div className="sweet-home">
          <Section name={"intro"}>
            <SectionHeader>
              <iframe src="https://player.vimeo.com/video/97314422?loop=1&title=0&byline=0&portrait=0" width="100%" height="300px"></iframe>
            </SectionHeader>
            <SectionBody name={"Landing"}>
              WHATEVER CONTENT IS
            </SectionBody>
          </Section>

          <Section name={"getting-started"}>
            <SectionHeader>
                <h1>Getting started</h1> <a href="https://github.com/">Github</a>
            </SectionHeader>
            <SectionBody name={"Getting Started"}>
              WHATEVER CONTENT IS
            </SectionBody>
          </Section>
          <Section name={"Showcase"}>
            <SectionHeader>
               <h1>Showcase</h1>
            </SectionHeader>
            <SectionBody name={"Showcase"}>
                WHATEVER CONTENT IS
            </SectionBody>
          </Section>
          <Section name={"Community"}>
            <SectionHeader>
                <h2>Community</h2>
            </SectionHeader>
            <SectionBody name={"Community"}>
                WHATEVER CONTENT IS
            </SectionBody>
          </Section>
            <Section name={"About"}>
                <SectionHeader>
                    <h2>About</h2>
                </SectionHeader>
                <SectionBody name={"About"}>
                    WHATEVER CONTENT IS
                </SectionBody>
            </Section>
            <Section name={"Calender"}>
                <SectionHeader>
                    <h2>Calender</h2>
                </SectionHeader>
                <SectionBody name={"Calender"}>
                    WHATEVER CONTENT IS
                </SectionBody>
            </Section>
        </div>
    )
  }
}