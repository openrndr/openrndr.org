"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
exports.BackgroundGif = function (_a) {
    var data = _a.data;
    var url = data.url;
    return (<div style={{
        backgroundImage: "url(" + url + ")",
        backgroundSize: "fill",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100%"
    }}/>);
};
