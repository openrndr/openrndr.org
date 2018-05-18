import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-static";

const Slack: React.SFC<any & RouteComponentProps<any>> = props => {
  return (
    <div className={"slack-invitation-success"}>
      <div>
        <Link to={"/"}>
          <img className={"button"} src={"../close.png"} />
        </Link>
        <h1>
          Success! You have been invited to{" "}
          <a href={"https://openrndr.slack.com"}>OPENRNDR community on Slack</a>
        </h1>
        <small>Check your email</small>
      </div>
    </div>
  );
};

export default withRouter(Slack);
