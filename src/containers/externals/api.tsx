import * as React from "react";
import { Head } from "react-static";

const Api: React.SFC<any> = () => {
  const text = ``;
  const title = `OPENRNDR API DOCUMENTATION`;

  return (
    <div className={"external-guide"}>
      <Head>
        <meta name={`description`} content={`${text}`} />
        <title>{title}</title>
      </Head>
      <h1>
        <a href={`https://api.openrndr.org`} target={"_blank"}>
          {title}
        </a>
        <article>
          <p>{text}</p>
        </article>
      </h1>
    </div>
  );
};

export default Api;
