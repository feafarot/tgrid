﻿var TesserisPro;
(function (TesserisPro) {
    /// <reference path="Scripts/typings/jquery/jquery.d.ts" />
    (function (TGrid) {
        (function (Framework) {
            Framework[Framework["Knockout"] = 0] = "Knockout";
            Framework[Framework["Angular"] = 1] = "Angular";
        })(TGrid.Framework || (TGrid.Framework = {}));
        var Framework = TGrid.Framework;

        var ColumnInfo = (function () {
            function ColumnInfo() {
            }
            return ColumnInfo;
        })();
        TGrid.ColumnInfo = ColumnInfo;

        var Template = (function () {
            function Template(prototype) {
                this.content = "";
                this.content = prototype.innerHTML == null ? prototype.innerText : prototype.innerHTML;
            }
            Template.prototype.applyTemplate = function (element) {
                element.innerHTML = this.content != null ? this.content : "";
            };
            return Template;
        })();
        TGrid.Template = Template;

        var Options = (function () {
            function Options(element, framework) {
                this.columns = [];
                this.pageSlide = 1;
                this.currentPage = 1;
                this.target = $(element);
                this.framework = framework;

                this.initialize();
            }
            Options.prototype.initialize = function () {
                var pageSizeAtt = this.target.attr("data-g-page-size");
                this.pageSize = parseInt(pageSizeAtt);
                if (isNaN(this.pageSize)) {
                    this.pageSize = 10;
                }

                var text = this.target.find("script")[0].innerHTML;
                var optionsElement = $("<div>" + text + "</div");

                var headers = optionsElement.find("header");
                var cells = optionsElement.find("cell");
                var columns = optionsElement.find("column");

                for (var i = 0; i < headers.length; i++) {
                    var column = new ColumnInfo();

                    var header = new Template(headers[i]);
                    column.header = header;

                    var cell = new Template(cells[i]);
                    column.cell = cell;

                    column.width = columns[i].attributes['data-g-width'] != null ? columns[i].attributes['data-g-width'].nodeValue : 100;
                    column.device = columns[i].attributes['data-g-views'] != null ? columns[i].attributes['data-g-views'].nodeValue : "mobile,desktop";

                    this.columns.push(column);
                }
            };
            return Options;
        })();
        TGrid.Options = Options;
    })(TesserisPro.TGrid || (TesserisPro.TGrid = {}));
    var TGrid = TesserisPro.TGrid;
})(TesserisPro || (TesserisPro = {}));
//# sourceMappingURL=Options.js.map