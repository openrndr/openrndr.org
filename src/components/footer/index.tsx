import * as React from "react";
import * as _ from "lodash";

import "./style.css";
import { Link } from "react-static";

interface IProps {}

const repeatSize = 100;

const FooterItem: React.SFC<{ text: string; i: number }> = ({ text, i }) => (
  <h3 style={{ zIndex: repeatSize - i, marginTop: `${-19}px` }}>{text}</h3>
);

const footerItems = [
  {
    title: "OPENRNDR",
    link: "/"
  },
  {
    title: "CONTACT",
    link: "/"
  },
  {
    title: "SUPPORT",
    link: "/"
  },
  {
    title: "SOCIAL",
    link: "/"
  },
  {
    title: "RNDR STUDIO",
    link: "/"
  }
];

export const Footer: React.SFC<IProps> = props => {
  return (
    <footer>
      <div>
        {_.range(repeatSize).map((i: number) => (
          <Link key={`link-openRNDR-${i}`} to={"/"}>
            <FooterItem i={i} text={"openrndr"} />
          </Link>
        ))}
      </div>
      <div>
        {_.range(repeatSize).map((i: number) => (
          <a key={`link-contact-${i}`} href={"/"}>
            <FooterItem i={i} text={"contact"} />
          </a>
        ))}
      </div>
      <div>
        {_.range(repeatSize).map((i: number) => (
          <a key={`link-SUPPORT-${i}`} href={""}>
            <FooterItem i={i} text={"SUPPORT"} />
          </a>
        ))}
      </div>
      <div>
        {_.range(repeatSize).map((i: number) => (
          <a key={`link-SOCIAL-${i}`} href={""}>
            <FooterItem i={i} text={"SOCIAL"} />
          </a>
        ))}
      </div>
      <div>
        {_.range(repeatSize).map((i: number) => (
          <a key={`link-STUDIO-${i}`} href={""}>
            <FooterItem i={i} text={"RNDR STUDIO"} />
          </a>
        ))}
      </div>
    </footer>
  );
};
