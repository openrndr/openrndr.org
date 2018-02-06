import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Menu } from "../menu";
import { HomeContext, SectionMetadata } from "../../../types/index";

interface Props {
  children: any;
}

interface Context extends HomeContext {
  metadata: SectionMetadata;
}

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 4fr;
`;

const Left = styled.div``;
const Right = styled.div``;

export class SectionBody extends React.Component<Props, any> {
  static contextTypes = {
    activeSectionName: PropTypes.string,
    metadata: PropTypes.object
  };

  context: Context;

  render() {
    console.log("SectionBody activeSectionName", this.context);
    return (
      <Container>
        <Left>
          <Menu selection={this.context.metadata.path || ""} />
        </Left>
        <Right>{this.props.children}</Right>
      </Container>
    );
  }
}
