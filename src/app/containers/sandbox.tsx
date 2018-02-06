import React from "react";
import { prefetch } from "react-static";
import { Location } from "history";
import styled from "styled-components";
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
  componentWillMount() {}

  render() {
    return <Layout className="sweet-home">SANDBOX</Layout>;
  }
}
