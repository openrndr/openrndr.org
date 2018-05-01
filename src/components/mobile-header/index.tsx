import * as React from "react";

import "./style.css";

interface IProps {
  isMenuOpen: boolean;
  onClick: (e: any) => void;
}

export const MobileHeader: React.SFC<IProps> = ({ isMenuOpen, onClick }) => {
  return (
    <div className={"mobile-header"}>
      {
        <span className={"mobile-menu-icon"} onClick={onClick}>
          {isMenuOpen ? "X" : "|||"}
        </span>
      }
      <h1 className={"mobile-header-logo"}>OPENRNDR</h1>
    </div>
  );
};
