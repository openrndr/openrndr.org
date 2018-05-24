import * as React from "react";
import { Head, Router, withSiteData } from "react-static";
import { hot } from "react-hot-loader";

import Routes from "react-static-routes";

import "@ibm/type/css/ibm-type.min.css";
import "./app.css";
import { GridLines } from "./components/grid-lines/index";
import { IDatoSiteData } from "./types/site";

interface IProps {
  data: IDatoSiteData;
}

const App: React.SFC<IProps> = ({ data }) => {
  return (
    <Router>
      <div>
        <Head>
          <meta name={`keywords`} content={`JAVA,kotlin,programming`} />
          <meta
            name={`description`}
            content={`${data.globalSeo.fallbackSeo.description}`}
          />
          <meta name={`copyright`} content={`OPENRNDR`} />
          <meta name={`language`} content={`EN`} />
          <meta name={`Classification`} content={`Programming`} />
          <meta name={`author`} content={`Edwin, edwin@rndr.studio`} />
          <meta name={`designer`} content={`RNDR studio`} />
          <meta name={`owner`} content={`OPENRDNR`} />
          <meta name={`url`} content={`${data.domain}`} />
          <meta name={`identifier-URL`} content={`${data.domain}`} />
          <meta name={`og:title`} content={`${data.name}`} />
          <meta name={`og:url`} content={`${data.domain}`} />
          <meta
            name={`og:image`}
            content={`${data.globalSeo.fallbackSeo.image.url}`}
          />
          <meta name={`og:site_name`} content={`${data.name}`} />
          <meta
            name={`og:description`}
            content={`${data.globalSeo.fallbackSeo.description}`}
          />
          <title>{data.name}</title>

          <script type="application/ld+json">{`
              {
                "@context": "http://schema.org",
                "@type": "Organization",
                "url": "https://openrndr.org",
                "name": "${data.name}",
                "logo": "${data.globalSeo.fallbackSeo.image.url}",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+31 70 363 5776",
                  "contactType": "credit card support",
                  "availableLanguage": ["English", "Dutch"]
                },
                  "sameAs": [
                  "https://www.instagram.com/openrndr",
                  "https://www.facebook.com/openrndr",
                  "https://www.vimeo.com/rndrstudio",
                  "https://www.twitter.com/openrndr"
                ]
              }
        `}</script>
        </Head>
        <GridLines />
        <div className="content">
          <Routes />
        </div>
      </div>
    </Router>
  );
};

export default hot(module)(withSiteData(App));
