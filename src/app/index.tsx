import * as React from "react";
import { getRouteProps, Router, Switch, Route, Link } from "react-static";

import Home from "./containers/home";
import Sand from "./containers/sandbox";
import Layout from "./layout";

import "@ibm/type/css/ibm-type.min.css";
import "./app.css";

export default () => (
  <Router>
    <Layout>
      <div>
        <div className="content">
          <Switch>
            <Route path="/sandbox" component={Sand} />
            <Route path="*" component={Home} />
          </Switch>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url("1x1.png")`,
          backgroundRepeat: "repeat-y",
          width: "1px",
          height: `100%`,
          position: "fixed",
          zIndex: 999999999
        }}
      />
    </Layout>
  </Router>
);
