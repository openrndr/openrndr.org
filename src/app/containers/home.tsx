import React from "react";
import PropTypes from "prop-types";
import { withRouteData } from "react-static";
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
  Project as ProjectType,
  HomeContext
} from "../../types";

import { Footer } from "../components/footer";
import { siteConfig } from "../config";

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

  [index: string]: object;
}

interface State {
  isInitialDataFetched: boolean;
  data: DataProps | null;
  activeSectionName: string;
}

export interface Props {
  location: Location;
  data: DataProps;
}

const Wrapper = styled.div`
  display: grid;
  > div[name="landing"] {
  }
`;

class Home extends React.Component<Props, State> {
  state: State = {
    isInitialDataFetched: false,
    data: null,
    activeSectionName: ""
  };

  static childContextTypes = {
    activeSectionName: PropTypes.string
  };

  getChildContext(): HomeContext {
    return {
      activeSectionName: this.state.activeSectionName
    };
  }

  componentDidMount() {
    if ((process as any).browser) {
      window.addEventListener("hashchange", this.updateActiveSession, false);
    }
  }

  componentWillUnmount() {
    if ((process as any).browser) {
      window.removeEventListener("hashchange", this.updateActiveSession, false);
    }
  }

  componentWillMount() {
    if ((process as any).browser) {
    }
  }

  updateActiveSession = (e: any) => {
    this.setState({
      activeSectionName: window.location.hash
    });
  };

  render() {
    const { data } = this.props;
    console.log(data);

    if (!data) return null;

    return (
      <Wrapper className="sweet-home">
        {siteConfig.sections.map(({ metadata, Component }) =>
          Component({
            metadata: metadata,
            data: data[metadata.key]
          })
        )}
        <Footer />
      </Wrapper>
    );
  }
}

export default withRouteData(Home);
