import * as React from "react";
import { Link } from "react-static";

import "./style.css";
import { theme } from "../../configs";

interface IProps {}

export const Footer: React.SFC<IProps> = props => {
  const resetScroll = () => {
    if (typeof document !== "undefined") {
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer
      style={{
        background: theme.colors.pink
      }}
    >
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

      <div>
        <h3>CONTACT</h3>
        <a
          className={"button"}
          href={"mailto:info@openrndr.org"}
          target={"_top"}
        >
          info@openrndr.org
        </a>
      </div>
      <div>
        <h3>SUPPORT</h3>
        <a
          className={"button"}
          href={"https://publicslack.com/slacks/openrndr/invites/new"}
          target={"_blank"}
        >
          OPENRDNR Slack
        </a>
        <a className={"button"} href={"?"} target={"_blank"}>
          StackOverflow
        </a>
      </div>

      <div>
        <h3>SOCIAL</h3>
        <a
          className={"button"}
          href={"https://www.instagram.com/openrndr"}
          target={"_blank"}
        >
          Instagram
        </a>
        <a
          className={"button"}
          href={"https://www.facebook.com/openrndr"}
          target={"_blank"}
        >
          Facebook
        </a>
        <a
          className={"button"}
          href={"https://www.vimeo.com/openrndr"}
          target={"_blank"}
        >
          Vimeo
        </a>
        <a
          className={"button"}
          href={"https://www.twitter.com/openrndr"}
          target={"_blank"}
        >
          Twitter
        </a>
      </div>
    </footer>
  );
};
