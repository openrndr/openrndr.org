import * as React from "react";
import { Router, Switch, Route } from "react-static";

import Home from "./containers/home";
// import Sand from "./containers/sandbox";

import "@ibm/type/css/ibm-type.min.css";
import "./app.css";
import { Layout } from "./layout";

export default () => (
  <Router>
    <Layout>
      <div>
        <div className="content">
          <Switch>
            {/*<Route path="/sandbox" component={Sand} />*/}
            <Route path="*" component={Home} />
          </Switch>
        </div>
      </div>
    </Layout>
  </Router>
);
