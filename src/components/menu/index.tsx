import * as React from "react";
import { menuItems } from "../../configs";

import "./style.css";
import { Link } from "react-static";

interface IProps {
  activeIndex: number;
  className?: string;
}

export const MenuHeader: React.SFC<IProps> = ({ activeIndex }) => {
  const activeItem = menuItems[activeIndex];
};

export const Menu: React.SFC<IProps> = ({ className }) => {
  return (
    <nav className={`menu ${className}`}>
      {activeItem && <h1>{activeItem.title}</h1>}
      {menuItems
        // .filter((item, index) => index !== activeIndex)
        .map((item, i) => (
          <Link key={`menu-link-${i}`} to={`#${item.key}`}>
            <h3>{item.title}</h3>
          </Link>
        ))}
    </nav>
  );
};
