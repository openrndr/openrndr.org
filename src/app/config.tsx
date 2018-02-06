import * as React from "react";
import { SiteConfig } from "../types";

import { LandingSection } from "./containers/sections/landing";
import { GettingStartedSection } from "./containers/sections/getting-started";
import { AboutSection } from "./containers/sections/about";
import { ShowCaseSection } from "./containers/sections/showcase";
import { CommunitySection } from "./containers/sections/community";
import { CalendarSection } from "./containers/sections/calendar";

export const siteConfig: SiteConfig = {
  sections: [
    {
      metadata: {
        title: "Landing",
        key: "landing",
        path: "",
        color: ""
      },
      Component: LandingSection
    },
    {
      metadata: {
        title: "Getting Started",
        key: "gettingStarted",
        path: "getting-started",
        color: "red"
      },
      Component: GettingStartedSection
    },
    {
      metadata: {
        title: "Showcase",
        key: "showcase",
        path: "showcase",
        color: "blue"
      },
      Component: ShowCaseSection
    },
    {
      metadata: {
        title: "Community",
        key: "community",
        path: "community",
        color: "green"
      },
      Component: CommunitySection
    },
    {
      metadata: {
        title: "About",
        key: "about",
        path: "about",
        color: "yellow"
      },
      Component: AboutSection
    },
    {
      metadata: {
        title: "Calendar",
        key: "calendar",
        path: "calendar",
        color: "pink"
      },
      Component: CalendarSection
    }
  ],

  style: {
    textBlockPadding: [50, 20, 20, 20],
    menuPadding: [50, 20, 20, 20]
  }
};
