/// <reference path="../scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../Options.ts"/>

module TGrid.Angular {
    export class Directive {
        private directive: ng.IDirective = {};
        constructor() {
            this.directive.restrict = 'E';
            this.directive.link = function (scope, element, attrs) {
                var options = new TesserisPro.TGrid.Options(element[0], TesserisPro.TGrid.Framework.Angular);

                if (attrs["groupby"] != undefined) {
                    var groupBy = attrs["groupby"].split(' ');
                    for (var i = 0; i < groupBy.length; i++) {
                        options.groupBySortDescriptor.push(new TesserisPro.TGrid.SortDescriptor(groupBy[i], true));
                    }
                }

                if (attrs["enablepaging"] == undefined) {
                    options.isEnablePaging = false;
                } else {
                    options.isEnablePaging = attrs["enablepaging"] == "true" ? true : false;
                }

                var pageSizeAtt = attrs["pagesize"];
                options.pageSize = parseInt(pageSizeAtt);
                if (this.isEnablePaging) {
                    options.pageSize = (isNaN(this.pageSize) || this.pageSize < 1) ? 10 : this.pageSize;
                }

                var editModeAtt = attrs["selectmode"];
                options.selectionMode = editModeAtt;
                if (isNaN(this.selectionMode)) {
                    options.selectionMode = 1;
                }

                if (attrs["enablevirtualscroll"] == undefined) {
                    options.isEnableVirtualScroll = false;
                } else {
                    options.isEnableVirtualScroll = attrs["enablevirtualscroll"] == "true" ? true : false;
                }

                var grid = new TesserisPro.TGrid.Grid(element[0], options, scope[attrs["provider"]]);
            }

        return this.directive;
        }
    }
}

