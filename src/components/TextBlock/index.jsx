"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
require("./style.css");
exports.TextBlock = function (_a) {
    var data = _a.data;
    console.log(data);
    return (<div className={"text-block"}>
      <h3>{data.title}</h3>
      <p dangerouslySetInnerHTML={{
        __html: data.bodyText
    }}/>
      {data.link &&
        data.link.length > 0 && (<react_router_dom_1.Link to={data.link} target="_blank">
            <small>>></small>
          </react_router_dom_1.Link>)}
    </div>);
};
