import * as React from "react";

import "./style.css";
import { Link } from "react-static";

interface IProps {}

export const Footer: React.SFC<IProps> = props => {
  const resetScroll = () => {
    if (typeof document !== "undefined") {
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer>
      <Link
        to={"/"}
        onClick={() => {
          resetScroll();
        }}
      >
        <h3>
          <span dangerouslySetInnerHTML={{ __html: "&uarr;" }} />
        </h3>
      </Link>
      <a href={"/"}>
        <h3>CONTACT</h3>
      </a>
      <a href={""}>
        <h3>SUPPORT</h3>
      </a>
      <a href={""}>
        <h3>SOCIAL</h3>
      </a>
      <a href={""}>
        <h3>RNDR STUDIO</h3>
      </a>
    </footer>
  );
};
