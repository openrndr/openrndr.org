import * as React from "react";
import { Link } from "react-router-dom";

import { TextBlock as TextBlockType } from "../../types/index";
import "./style.css";

interface IProps {
  data: TextBlockType;
  className?: string;
}

export const TextBlock: React.SFC<IProps> = ({ data, className = "" }) => {
  return (
    <div className={`text-block ${className}`}>
      {data.title && data.title.trim().length > 0 ? (
        data.link && data.link.length > 0 ? (
          <a href={data.link} target={"_blank"}>
            <h3 className={"button"}>{data.title}</h3>
            <br />
          </a>
        ) : (
          <span>
            <h3>{data.title}</h3>
            <br />
          </span>
        )
      ) : null}
      <article
        className={"running-text"}
        dangerouslySetInnerHTML={{
          __html: data.bodyText
        }}
      />
    </div>
  );
};
