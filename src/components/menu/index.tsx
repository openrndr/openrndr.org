import * as React from "react";
import { menuItems } from "../../configs";

import "./style.css";
import { Link } from "react-static";

interface IProps {
  activeIndex: number;
  className?: string;
}

export const Menu: React.SFC<IProps> = ({ activeIndex, className }) => {
  // const activeItem = menuItems.find(item => item.key === activeKey);
  const activeItem = menuItems[activeIndex];

  return (
    <nav className={`menu ${!activeItem ? "with-all-items" : ""} ${className}`}>
      {activeItem ? (
        <h1>{activeItem.title}</h1>
      ) : (
        <h1
          style={{
            height: 0
          }}
        />
      )}
      {menuItems
        // .filter((item, index) => index !== activeIndex)
        .map((item, i) => (
          <Link
            key={`menu-link-${i}`}
            to={`#${item.key}`}
            className={i === activeIndex ? "disable" : ""}
          >
            <h3>{item.title}</h3>
          </Link>
        ))}
    </nav>
  );
};
