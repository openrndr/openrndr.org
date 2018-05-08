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
      <h3>{data.title}</h3>
      <br />
      <article
        className={"running-text"}
        dangerouslySetInnerHTML={{
          __html: data.bodyText
        }}
      />
      {data.link &&
        data.link.length > 0 && (
          <Link to={data.link} target="_blank">
            <small>>></small>
          </Link>
        )}
    </div>
  );
};
