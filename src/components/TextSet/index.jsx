"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var TextBlock_1 = require("../TextBlock");
require("./style.css");
exports.TextSet = function (_a) {
    var blocks = _a.blocks, _b = _a.className, className = _b === void 0 ? "" : _b;
    return (<div className={"text-set " + className}>
        {blocks.map(function (cb, i) {
        return <TextBlock_1.TextBlock key={"text-block" + i} data={cb}/>;
    })}
      </div>);
};
