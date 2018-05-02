import * as React from "react";

import "./style.css";
import { Link } from "react-router-dom";

interface IProps {
  isMenuOpen: boolean;
  onClick: (e: any) => void;
}

export const MobileHeader: React.SFC<IProps> = ({ isMenuOpen, onClick }) => {
  return (
    <div className={"mobile-header"}>
      {
        <span className={"mobile-menu-icon"} onClick={onClick}>
          {isMenuOpen ? (
            <span dangerouslySetInnerHTML={{ __html: "&uarr;" }} />
          ) : (
            <span dangerouslySetInnerHTML={{ __html: "&#9776" }} />
          )}
        </span>
      }
      <h1 className={"mobile-header-logo"}>OPENRNDR</h1>
    </div>
  );
};
