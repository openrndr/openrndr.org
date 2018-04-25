import * as React from 'react'
import { Router, withSiteData } from 'react-static'
import { hot } from 'react-hot-loader'

import Routes from 'react-static-routes'

import "@ibm/type/css/ibm-type.min.css";
import './app.css';

const App: React.SFC<any> = () =>
    <Router>
      <div>
        <div className="content">
          <Routes />
        </div>
      </div>
    </Router>;

export default hot(module)(withSiteData(App))