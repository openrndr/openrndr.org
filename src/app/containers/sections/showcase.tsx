import * as React from "react";

import {
  Paged,
  SectionMetadata,
  Project as ProjectType
} from "../../../types/index";

import { Section } from "../../components/section/index";
import { SectionHeader } from "../../components/section/section-header";
import { SectionBody } from "../../components/section/section-body";
import { ProjectSet } from "../../components/project-set/index";

interface Props {
  metadata: SectionMetadata;
  data: {
    [index: string]: Paged<ProjectType>;
    gallery: Paged<ProjectType>;
    experiments: Paged<ProjectType>;
    caseStudies: Paged<ProjectType>;
  };
}

export const ShowCaseSection: React.StatelessComponent<Props> = ({
  metadata,
  data
}) => (
  <Section metadata={metadata}>
    <SectionHeader>
      <h1>{metadata.title}</h1>
    </SectionHeader>
    <SectionBody>
      {Object.keys(data).map(name => (
        <ProjectSet key={name} page={data[name]} title={name} />
      ))}
    </SectionBody>
  </Section>
);
