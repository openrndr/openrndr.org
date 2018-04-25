"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
require("./style.css");
var paginated_1 = require("../paginated");
var index_1 = require("../GalleryItem/index");
var GalleryComponent = function (_a) {
    var data = _a.data, title = _a.title, _b = _a.className, className = _b === void 0 ? "" : _b, hasNext = _a.hasNext, loadNext = _a.loadNext;
    return (<section className={"gallery " + className}>

            <h3>{title}</h3>

            <div className={"grid"}>
              {data.data.map(function (item) {
        return <index_1.GalleryItem data={item}/>;
    })}
            </div>

            <div className={"load-more"}>
              <span className={"gap"}/>
              <span onClick={hasNext ? loadNext : function () { }}>
                {hasNext ? "MORE" : "No more pages to load"}
              </span>
            </div>

          </section>);
};
exports.Gallery = paginated_1.withPagination(GalleryComponent);
