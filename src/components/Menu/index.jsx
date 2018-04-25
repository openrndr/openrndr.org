"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
require("./style.css");
var react_static_1 = require("react-static");
var items = [
    {
        key: "gettingStarted",
        title: "Getting Started",
    },
    {
        key: "showcase",
        title: "showcase"
    },
    {
        key: "community",
        title: "community"
    },
    {
        key: "about",
        title: "about"
    },
    {
        key: "calendar",
        title: "calendar"
    },
];
exports.Menu = function (_a) {
    var activeKey = _a.activeKey;
    var activeItem = items.find(function (item) { return item.key === activeKey; });
    console.log(activeKey, activeItem);
    return (<nav className={"menu"}>
        {activeItem &&
        <h1>{activeItem.title}</h1>}
        {items
        .filter(function (item) { return item.key !== activeKey; })
        .map(function (item, i) {
        return <react_static_1.Link key={"menu-link-" + i} to={"/#" + item.key}>
                  {item.title}
                </react_static_1.Link>;
    })}
      </nav>);
};
