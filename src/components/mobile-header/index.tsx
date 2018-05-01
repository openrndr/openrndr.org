import * as React from "react";

import "./style.css";

interface IProps {
  open: boolean;
  onClick: () => void;
}

export const MobileHeader: React.SFC<IProps> = ({ open, onClick }) => {
  return (
    <div className={"mobile-header"}>
      {
        <span className={"mobile-menu-icon"} onClick={onClick}>
          {open ? "X" : "|||"}
        </span>
      }
      <h1 className={"mobile-header-logo"}>OPENRNDR</h1>
    </div>
  );
};
