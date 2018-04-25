"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
require("./style.css");
var index_1 = require("../EventBlock/index");
exports.SectionCalendar = function (_a) {
    var data = _a.data;
    var events = data.events;
    return (<section className={"xx-x-x"}>
        {events.data.map(function (event, i) { return (<index_1.EventBlock event={event}>{i}</index_1.EventBlock>); })}
      </section>);
};
