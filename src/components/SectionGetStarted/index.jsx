"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
require("./style.css");
var index_1 = require("../TextBlock/index");
exports.SectionGettingStarted = function (_a) {
    var data = _a.data;
    return (<section className={"x-x-x-x"}>
      {data.contentBlocks.map(function (cb, i) {
        return <index_1.TextBlock key={"text-block" + i} data={cb}/>;
    })}
    </section>);
};
