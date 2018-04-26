import * as React from "react";
import { Link } from "react-router-dom";

import { TextBlock as TextBlockType } from "../../types/index";
import "./style.css";

interface IProps {
  data: TextBlockType;
}

export const TextBlock: React.SFC<IProps> = ({ data }) => {
  return (
    <div className={"text-block"}>
      <h3>{data.title}</h3>
      <br />
      <p
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
