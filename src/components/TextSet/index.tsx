import * as React from "react";

import {TextBlock as TextBlockType} from "../../types";
import {TextBlock} from "../TextBlock";


interface Props {
  blocks: TextBlockType[];
  className?: string;
}

import "./style.css";

export const TextSet: React.SFC<Props> = ({blocks, className = ""}) => {
  return (
      <div className={`text-set ${className}`}>
        {
          blocks.map((cb, i) => {
            return <TextBlock key={`text-block${i}`}
                              data={cb}/>;
          })
        }
      </div>
  );
};
