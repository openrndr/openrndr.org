"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var BackgroundImage_1 = require("../BackgroundImage/BackgroundImage");
var index_1 = require("../Video/index");
exports.GalleryMediaItem = function (_a) {
    var thumbnail = _a.thumbnail;
    return (<div>
      {(function () {
        switch (thumbnail.itemType) {
            case "image":
                return <BackgroundImage_1.BackgroundImage data={thumbnail}/>;
            case "gif":
                return <BackgroundImage_1.BackgroundImage data={thumbnail}/>;
            case "video":
                return (<index_1.Video data={thumbnail} controls={false} width={"100%"} height={"100%"}/>);
        }
    })()}
    </div>);
};
