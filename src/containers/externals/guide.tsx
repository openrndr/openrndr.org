import * as React from "react";
import { Head } from "react-static";
import { Redirect } from "react-router";

const Guide: React.SFC<any> = () => {
  const text = `Guide and documentation for OPENRNDR; provides an open-source application framework that allows its users to write applications that run on Microsoft Windows and MacOS platforms. For future versions we want to include Desktop Linux, Android and Raspberry PI platforms as well.`;
  const title = `Guide and documentation for OPENRNDR`;

  return (
    <div className={"external-guide"}>
      <Head>
        <meta name={`description`} content={`${text}`} />
        <title>{title}</title>
      </Head>
      <h1>
        <a href={`https://guide.openrndr.org`} target={"_blank"}>
          {title}
        </a>
        <div className={"article"}>
          <p>{text}</p>
        </div>
      </h1>
      <Redirect to={"https://guide.openrndr.org"} />
    </div>
  );
};

export default Guide;
