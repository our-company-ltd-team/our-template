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
var Hi = (function (_super) {
    __extends(Hi, _super);
    function Hi(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { date: new Date() };
        return _this;
    }
    Hi.prototype.componentDidMount = function () {
        var _this = this;
        this.timerID = setInterval(function () { return _this.tick(); }, 1000);
    };
    Hi.prototype.componentWillUnmount = function () {
        clearInterval(this.timerID);
    };
    Hi.prototype.tick = function () {
        this.setState({
            date: new Date()
        });
    };
    Hi.prototype.render = function () {
        return (<div>
				hello {this.state.date.toLocaleTimeString()}
			</div>);
    };
    return Hi;
}(React.Component));
exports.Hi = Hi;
