/// <reference path="../../../Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../typings/tgrid.d.ts" />
var TGridBindingHandler = (function () {
    function TGridBindingHandler() {
        this.options;
    }
    TGridBindingHandler.prototype.init = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    };

    TGridBindingHandler.prototype.update = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    };
    return TGridBindingHandler;
})();

ko.bindingHandlers.tgrid = new TGridBindingHandler();