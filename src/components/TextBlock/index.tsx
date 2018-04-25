import * as React from "react";
import { Link } from "react-router-dom";


import { TextBlock as TextBlockData } from "../types";

interface Props {
  data: TextBlockData;
}

import "./style.css";

export const TextBlock: React.SFC<Props> = ({data}) => {
  console.log(data);
  return (
    <div className={"text-block"}>
      <h3>{data.title}</h3>
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
