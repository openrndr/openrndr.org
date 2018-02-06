import * as React from "react";

import {
  Landing as LandingDataType,
  SectionMetadata
} from "../../../types/index";

import { Section } from "../../components/section/index";
import { SectionHeader } from "../../components/section/section-header";
import { SectionBody } from "../../components/section/section-body";
import { Banner } from "../../components/banner";
import { TextSet } from "../../components/text-set/index";

interface Props {
  metadata: SectionMetadata;
  data: LandingDataType;
}

export const LandingSection: React.StatelessComponent<Props> = ({
  metadata,
  data
}) => (
  <Section metadata={metadata}>
    <SectionHeader className="banner">
      <Banner data={data.banner} />
    </SectionHeader>
    <SectionBody>
      <TextSet data={data.contentBlocks} className={"columns-3"} />
    </SectionBody>
  </Section>
);
