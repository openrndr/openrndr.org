import * as React from "react";
import { Head, withSiteData } from "react-static";

import { IDatoSiteData } from "../../types/site";

interface IProps {
  data: IDatoSiteData;
}

const MetaTagsComponent: React.SFC<IProps> = ({ data }) => {
  const { image } = data.globalSeo.fallbackSeo;

  return (
    <Head>
      <meta name={`keywords`} content={`JAVA,kotlin,programming`} />
      <meta name={`description`} content={`${data.globalSeo.fallbackSeo.description}`} />
      <meta name={`copyright`} content={`OPENRNDR`} />
      <meta name={`language`} content={`EN`} />
      <meta name={`Classification`} content={`Programming`} />
      <meta name={`author`} content={`Edwin, edwin@rndr.studio`} />
      <meta name={`designer`} content={`RNDR studio`} />
      <meta name={`owner`} content={`OPENRDNR`} />
      <meta name={`url`} content={`${data.domain}`} />
      <meta name={`identifier-URL`} content={`${data.domain}`} />
      <meta property={`og:title`} content={`${data.name}`} />
      <meta property={`og:url`} content={`${data.domain}`} />
      <meta property={`og:image`} content={`${image.url}`} />
      <meta property={`og:image:type`} content={`image/${image.format}`} />
      <meta property={`og:image:width`} content={`${image.width}`} />
      <meta property={`og:image:height`} content={`${image.height}`} />
      <meta property={`og:site_name`} content={`${data.name}`} />
      <meta property={`og:description`} content={`${data.globalSeo.fallbackSeo.description}`} />
      <meta property={`og:type`} content={`website`} />
      <title>{data.name}</title>

      <link
        rel="icon"
        type={`image/${data.favicon.format}`}
        href={`${data.favicon.url}`}
      />

      <script type="application/ld+json">{`
              {
                "@context": "http://schema.org",
                "@type": "Organization",
                "url": "https://openrndr.org",
                "name": "${data.name}",
                "logo": "${image.url}",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+31 70 363 5776",
                  "contactType": "support",
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
  );
};

export const MetaTags = withSiteData(MetaTagsComponent);
