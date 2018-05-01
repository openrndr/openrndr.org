import * as React from "react";

import "./style.css";
import { Link } from "react-static";

interface IProps {}

export const Footer: React.SFC<IProps> = props => {
  return (
    <footer>
      <Link to={"/"}>
        <h3>OPENRNDR</h3>
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
