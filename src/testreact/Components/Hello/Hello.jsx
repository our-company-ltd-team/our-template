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
var Hi_1 = require("../Hi/Hi");
require("./Hello.less");
var isBrowser = typeof window !== 'undefined';
var Hammer = isBrowser ? require('hammerjs') : undefined;
var Hello = (function (_super) {
    __extends(Hello, _super);
    function Hello() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Hello.prototype.next = function () {
        console.log('swipe next');
    };
    Hello.prototype.prev = function () {
        console.log('swipe prev');
    };
    Hello.prototype.componentDidMount = function () {
        if (Hammer) {
            this.hammer = new Hammer(this.h1);
            this.hammer.on('swipeleft', this.next);
            this.hammer.on('swiperight', this.prev);
        }
    };
    Hello.prototype.render = function () {
        var _this = this;
        return (<h1 ref={function (el) { return _this.h1 = el; }} className="hello"><Hi_1.Hi /> why not ? {this.props.compiler} and {this.props.framework}!</h1>);
    };
    return Hello;
}(React.Component));
exports.Hello = Hello;
//# sourceMappingURL=Hello.jsx.map