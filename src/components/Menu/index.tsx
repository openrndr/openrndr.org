import * as React from "react";
import { HashLink as Link } from "react-router-hash-link";

import "./style.css";

export interface IMenuItem {
  key: string;
  title: string;
}

const items: IMenuItem[] = [
  {
    key: "gettingStarted",
    title: "Getting Started"
  },
  {
    key: "showcase",
    title: "showcase"
  },
  {
    key: "community",
    title: "community"
  },
  {
    key: "about",
    title: "about"
  },
  {
    key: "calendar",
    title: "calendar"
  }
];

interface IProps {
  activeKey: string | null;
}

export const Menu: React.SFC<IProps> = ({ activeKey }) => {
  const activeItem = items.find(item => item.key === activeKey);
  return (
    <nav className={`menu ${!activeItem ? "with-all-items" : ""}`}>
      {activeItem && <h1>{activeItem.title}</h1>}
      {items.filter(item => item.key !== activeKey).map((item, i) => (
        <Link
          key={`menu-link-${i}`}
          to={`#${item.key}`}
          scroll={(el: Element) => el.scrollIntoView()}
        >
          <h3>{item.title}</h3>
        </Link>
      ))}
    </nav>
  );
};
