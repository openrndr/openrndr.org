import * as React from "react";
import { Head } from "react-static";

const Rndr: React.SFC<any> = () => {
  const text = `RNDR designs and codes the future, by transforming data into information, information into knowledge, and knowledge into narratives.`;
  const title = `RNDR studio`;

  return (
    <div className={"external-rndr"}>
      <Head>
        <meta name={`description`} content={`${text}`} />
        <title>{title}</title>
      </Head>
      <h1>
        <a href={`https://rndr.studio`} target={"_blank"}>
          {title}
        </a>
        <div className={"article"}>
          <p>{text}</p>
        </div>
      </h1>
    </div>
  );
};

export default Rndr;
