import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-static";

const PayPal: React.SFC<any & RouteComponentProps<any>> = props => {
  return (
    <div className={"slack-invitation-success"}>
      <div>
        <Link to={"/"}>
          <img className={"button"} src={"./close.png"} />
        </Link>
        <h1>Your donation is done! Thank you very very much</h1>
        <span dangerouslySetInnerHTML={{ __html: "&#128139;" }} />
      </div>
    </div>
  );
};

export default withRouter(PayPal);
