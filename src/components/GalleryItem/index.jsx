"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var index_1 = require("../GalleryMediaItem/index");
var noop = function (e) { };
exports.GalleryItem = function (_a) {
    var className = _a.className, _b = _a.onClick, onClick = _b === void 0 ? noop : _b;
    var _c = props.data, title = _c.title, blurb = _c.blurb, media = _c.media;
    var thumbnail = media[0];
    return (<div className={className} onClick={onClick}>
      <index_1.GalleryMediaItem thumbnail={thumbnail}/>
      <div className={"project-info"}>
        {title && title.length > 0 && <span className={"title"}>{title}</span>}
        {blurb &&
        blurb.length > 0 && (<p className={"blurb"} dangerouslySetInnerHTML={{
        __html: blurb
    }}/>)}
      </div>
    </div>);
};
