"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
exports.EventBlock = function (_a) {
    var event = _a.event;
    return (<div>
      <div>
        <h3>{event.title}</h3>
      </div>
      <div>{event.note}</div>
      <div>
        <a href={event.link}>Event page</a>
      </div>
    </div>);
};
