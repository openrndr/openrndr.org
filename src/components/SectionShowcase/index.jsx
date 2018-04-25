"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
require("./style.css");
var Gallery_1 = require("../Gallery");
exports.SectionShowcase = function (_a) {
    var data = _a.data;
    return (<section className={"showcase"}>
      <Gallery_1.Gallery title={"gallery"} data={data.gallery}/>
    </section>);
};
