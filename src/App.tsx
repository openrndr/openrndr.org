import * as React from "react";
import { Router } from "react-static";
import { hot } from "react-hot-loader";

import Routes from "react-static-routes";

import "@ibm/type/css/ibm-type.min.css";
import "./app.css";
import { GridLines } from "./components/grid-lines/index";
import { MetaTags } from "./components/seo-tags/index";

const App: React.SFC<any> = () => (
  <Router>
    <div>
      <MetaTags />
      <GridLines />
      <div className="content">
        <Routes />
      </div>
    </div>
  </Router>
);

export default hot(module)(App);
