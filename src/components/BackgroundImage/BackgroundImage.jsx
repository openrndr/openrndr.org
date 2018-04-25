"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_imgix_1 = require("react-imgix");
exports.BackgroundImage = function (_a) {
    var data = _a.data;
    var url = data.url;
    return (<react_imgix_1.default type="bg" imgProps={{
        style: {
            backgroundSize: "fill",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "100%"
        }
    }} src={url}/>);
};
