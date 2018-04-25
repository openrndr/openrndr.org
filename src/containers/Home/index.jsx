"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_static_1 = require("react-static");
require("./style.css");
var index_1 = require("../../components/SectionGetStarted/index");
var index_2 = require("../../components/SectionCommunity/index");
var index_3 = require("../../components/SectionAbout/index");
var index_4 = require("../../components/Banner/index");
var index_5 = require("../../components/Menu/index");
var react_router_1 = require("react-router");
var index_6 = require("../../components/SectionLanding/index");
var index_7 = require("../../components/SectionCalendar/index");
var HomePage = (function (_super) {
    __extends(HomePage, _super);
    function HomePage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HomePage.prototype.render = function () {
        var data = this.props.data;
        return (<div className={"home-page"}>
          <index_4.Banner />
          <div className={"content"}>

            <div className={"section-wrapper"}>
              <index_5.Menu activeKey={"landing"}/>
              <index_6.SectionLanding data={data.landing}/>
            </div>

            <div className={"section-wrapper"}>
              <index_5.Menu activeKey={"gettingStarted"}/>
              <index_1.SectionGettingStarted data={data.gettingStarted}/>
            </div>

            <div className={"section-wrapper"}>
              <index_5.Menu activeKey={"community"}/>
              <index_2.SectionCommunity data={data.community}/>
            </div>

            <div className={"section-wrapper"}>
              <index_5.Menu activeKey={"about"}/>
              <index_3.SectionAbout data={data.about}/>
            </div>

            <div className={"section-wrapper"}>
              <index_5.Menu activeKey={"calendar"}/>
              <index_7.SectionCalendar data={data.calendar}/>
            </div>

          </div>
        </div>);
    };
    return HomePage;
}(React.Component));
exports.default = react_router_1.withRouter(react_static_1.withRouteData(HomePage));
