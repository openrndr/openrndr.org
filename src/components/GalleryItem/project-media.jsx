"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var background_image_1 = require("../background-image");
var background_gif_1 = require("../background-gif");
var video_1 = require("../video");
var Wrapper = (_a = ["\n  width: 100%;\n"], _a.raw = ["\n  width: 100%;\n"], styled_components_1.default.div(_a));
exports.ProjectMedia = function (props) {
    var thumbnail = props.thumbnail;
    return (<Wrapper>
      {(function () {
        switch (thumbnail.itemType) {
            case "image":
                return <background_image_1.BgImage data={thumbnail}/>;
            case "gif":
                return <background_gif_1.BgGif data={thumbnail}/>;
            case "video":
                return (<video_1.Video data={thumbnail} controls={false} width={"100%"} height={"100%"}/>);
        }
    })()}
    </Wrapper>);
};
var _a;
