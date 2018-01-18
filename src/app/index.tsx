import * as React from "react";
import { getRouteProps, Router, Switch, Route, Link } from "react-static";

import Home from "./containers/home";
import Sand from "./containers/sandbox";
import Layout from "./layout";

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
    </Layout>
  </Router>
);
