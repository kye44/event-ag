"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubBase = void 0;
var PubSubBase = /** @class */ (function () {
    function PubSubBase() {
        this.subscriptions = [];
    }
    PubSubBase.prototype.Subscribe = function (handler) {
        this.subscriptions.push(handler);
    };
    PubSubBase.prototype.Unsubscribe = function (handler) {
        var _this = this;
        this.subscriptions.forEach(function (element, index) {
            if (element == handler) {
                _this.subscriptions.splice(index, 1);
            }
        });
    };
    PubSubBase.prototype.Publish = function (eventArgs) {
        this.subscriptions.map(function (x) { return x(eventArgs); });
    };
    return PubSubBase;
}());
exports.PubSubBase = PubSubBase;
var EventAggregator = /** @class */ (function () {
    function EventAggregator() {
        this.events = {};
    }
    EventAggregator.prototype.GetEvent = function (event) {
        var instance = new event();
        var result = this.events[instance.constructor.name];
        if (result == null) {
            result = instance;
            this.events[instance.constructor.name] = result;
        }
        return result;
    };
    return EventAggregator;
}());
exports.default = EventAggregator;
