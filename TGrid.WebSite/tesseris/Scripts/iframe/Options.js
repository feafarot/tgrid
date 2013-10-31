﻿var TesserisPro;
(function (TesserisPro) {
    /// <reference path="Scripts/typings/jquery/jquery.d.ts" />
    /// <reference path="SortDescriptor.ts" />
    /// <reference path="FilterDescriptor.ts" />
    (function (TGrid) {
        (function (Framework) {
            Framework[Framework["Knockout"] = 0] = "Knockout";
            Framework[Framework["Angular"] = 1] = "Angular";
        })(TGrid.Framework || (TGrid.Framework = {}));
        var Framework = TGrid.Framework;
        (function (SelectionMode) {
            SelectionMode[SelectionMode["None"] = 0] = "None";
            SelectionMode[SelectionMode["Single"] = 1] = "Single";
            SelectionMode[SelectionMode["Multi"] = 2] = "Multi";
        })(TGrid.SelectionMode || (TGrid.SelectionMode = {}));
        var SelectionMode = TGrid.SelectionMode;
        (function (FilterCondition) {
            FilterCondition[FilterCondition["None"] = 0] = "None";
            FilterCondition[FilterCondition["Equals"] = 1] = "Equals";
            FilterCondition[FilterCondition["NotEquals"] = 2] = "NotEquals";
        })(TGrid.FilterCondition || (TGrid.FilterCondition = {}));
        var FilterCondition = TGrid.FilterCondition;

        var ColumnInfo = (function () {
            function ColumnInfo() {
            }
            return ColumnInfo;
        })();
        TGrid.ColumnInfo = ColumnInfo;

        var ShowDetail = (function () {
            function ShowDetail() {
                this.column = -1;
                this.item = null;
                this.isDetailColumn = false;
            }
            return ShowDetail;
        })();
        TGrid.ShowDetail = ShowDetail;

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
            function Options(element, valueAccessor, framework) {
                this.columns = [];
                this.isEnableVirtualScroll = false;
                this.isEnablePaging = false;
                this.pageSlide = 1;
                this.batchSize = 10;
                this.firstLoadSize = 20;
                this.currentPage = 0;
                this.groupBySortDescriptor = [];
                //public groupBy: string;
                this.filterDescriptors = [];
                this.selection = [];
                if (valueAccessor.groupBy != undefined) {
                    for (var i = 0; i < valueAccessor.groupBy.length; i++) {
                        this.groupBySortDescriptor.push(new TesserisPro.TGrid.SortDescriptor(valueAccessor.groupBy[i], true));
                    }
                }

                if (valueAccessor.enablePaging == undefined) {
                    this.isEnablePaging = false;
                } else {
                    this.isEnablePaging = valueAccessor.enablePaging == "true" ? true : false;
                }

                var pageSizeAtt = valueAccessor.pageSize;
                this.pageSize = parseInt(pageSizeAtt);
                if (this.isEnablePaging) {
                    this.pageSize = (isNaN(this.pageSize) || this.pageSize < 1) ? 10 : this.pageSize;
                }

                var editModeAtt = valueAccessor.selectMode;
                this.selectionMode = parseInt(editModeAtt);
                if (isNaN(this.selectionMode)) {
                    this.selectionMode = 1;
                }

                if (valueAccessor.enableVirtualScroll == undefined) {
                    this.isEnableVirtualScroll = false;
                } else {
                    this.isEnableVirtualScroll = valueAccessor.enableVirtualScroll == "true" ? true : false;
                }

                this.target = element;
                this.framework = framework;

                //this.filterDescriptors.push(new TesserisPro.TGrid.FilterDescriptor("name", "a1", 1));
                //this.filterDescriptors.push(new TesserisPro.TGrid.FilterDescriptor("key", "b1", 1));
                //this.filterDescriptors.push(new TesserisPro.TGrid.FilterDescriptor("key", "c1", 1));
                this.initialize();
            }
            Options.prototype.isSelected = function (item) {
                for (var i = 0; i < this.selection.length; i++) {
                    if (this.selection[i] == item) {
                        return true;
                    }
                }
                return false;
            };

            Options.prototype.initialize = function () {
                var text = $(this.target).find("script")[0].innerHTML;
                var optionsElement = $("<div>" + text + "</div");

                var headers = optionsElement.find("header");
                var cells = optionsElement.find("cell");
                var cellDetails = optionsElement.find("celldetail");
                var columns = optionsElement.find("column");

                for (var i = 0; i < columns.length; i++) {
                    var column = new ColumnInfo();

                    var header = new Template(headers[i]);
                    column.header = header;

                    var cell = new Template(cells[i]);
                    column.cell = cell;

                    var cellDetail = cellDetails[i];
                    column.cellDetail = cellDetail.innerHTML;

                    column.sortMemberPath = columns[i].attributes['data-g-sort-member'].nodeValue;
                    column.width = columns[i].attributes['data-g-width'] != null ? columns[i].attributes['data-g-width'].nodeValue : 100;
                    column.device = columns[i].attributes['data-g-views'] != null ? columns[i].attributes['data-g-views'].nodeValue : "mobile,desktop";

                    this.columns.push(column);
                }
                this.sortDescriptor = new TesserisPro.TGrid.SortDescriptor(this.columns[0].sortMemberPath, true);

                var mobileTemplate = optionsElement.find("mobile");
                this.mobileTemplateHtml = mobileTemplate[0].innerHTML;

                var groupHeaderTemplate = optionsElement.find("groupheader");
                this.groupHeaderTemplate = groupHeaderTemplate[0].innerHTML;

                var detailsTemplate = optionsElement.find("details");
                this.detailsTemplateHtml = detailsTemplate[0].innerHTML;

                this.showDetailFor = new ShowDetail();
            };
            return Options;
        })();
        TGrid.Options = Options;
    })(TesserisPro.TGrid || (TesserisPro.TGrid = {}));
    var TGrid = TesserisPro.TGrid;
})(TesserisPro || (TesserisPro = {}));
//# sourceMappingURL=Options.js.map
