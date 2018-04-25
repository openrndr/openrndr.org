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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function withPagination(Comp) {
    return (function (_super) {
        __extends(Paginated, _super);
        function Paginated(props) {
            var _this = _super.call(this, props) || this;
            _this.loadNext = function () {
                if (_this.state.nextUrl) {
                    _this.setState({
                        loading: true
                    });
                    fetch(_this.state.nextUrl)
                        .then(function (res) {
                        return res.json();
                    })
                        .then(function (res) {
                        var data = res.data, next = res.next;
                        _this.setState({
                            data: _this.state.data.concat(data),
                            nextUrl: next,
                            loading: false
                        });
                    });
                }
            };
            _this.state = {
                data: [],
                nextUrl: null,
                loading: false
            };
            return _this;
        }
        Paginated.prototype.componentWillMount = function () {
            var _a = this.props.page, data = _a.data, next = _a.next;
            this.setState({
                data: data,
                nextUrl: next
            });
        };
        Paginated.prototype.render = function () {
            var _a = this.props, page = _a.page, rest = __rest(_a, ["page"]);
            return (<Comp {...rest} loading={this.state.loading} data={this.state.data} loadNext={this.loadNext} hasNext={this.state.nextUrl !== null}/>);
        };
        return Paginated;
    }(react_1.default.Component));
}
exports.withPagination = withPagination;
