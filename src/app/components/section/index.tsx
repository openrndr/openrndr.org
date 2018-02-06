import React, { ReactNode } from "react";
import * as PropTypes from "prop-types";
import styled from "styled-components";

import { SectionMetadata } from "../../../types/index";

interface Props {
  children: ReactNode[];
  metadata: SectionMetadata;
}

interface Context {
  metadata: SectionMetadata;
}

const Container = styled.section`
  display: grid;
  grid-template-areas:
    "header"
    "body";
`;

export class Section extends React.Component<Props, any> {
  static childContextTypes = {
    metadata: PropTypes.object
  };

  getChildContext(): Context {
    return {
      metadata: this.props.metadata
    };
  }

  render() {
    return <Container>{this.props.children}</Container>;
  }
}
