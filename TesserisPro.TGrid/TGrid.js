var TesserisPro;
(function (TesserisPro) {
    /// <reference path="Scripts/typings/extenders.d.ts" />
    /// <reference path="Options.ts" />
    /// <reference path="IHtmlProvider.ts" />
    /// <reference path="IItemProvider.ts" />
    /// <reference path="ISortableItemProvider.ts" />
    /// <reference path="knockout/KnockoutHtmlProvider.ts" />
    /// <reference path="angular/AngularHtmlProvider.ts" />
    (function (TGrid) {
        var SimpleItemsProvider = (function () {
            function SimpleItemsProvider() {
            }
            SimpleItemsProvider.prototype.getItems = function (firstItem, itemsNumber, callback) {
                var items = [
                    { name: "a1", key: "a4" },
                    { name: "b1", key: "c3" },
                    { name: "c1", key: "b3" },
                    { name: "a2", key: "a3" },
                    { name: "b2", key: "c2" },
                    { name: "c2", key: "b2" },
                    { name: "a3", key: "a2" },
                    { name: "b3", key: "c1" },
                    { name: "c3", key: "b1" },
                    { name: "a4", key: "a1" }
                ];

                callback(items, firstItem, itemsNumber);
            };
            return SimpleItemsProvider;
        })();

        var Grid = (function () {
            function Grid(element, option) {
                var _this = this;
                this.options = option;
                this.htmlProvider = this.getHtmlProvider(option);
                this.table = this.htmlProvider.getTableElement(option);
                this.table.appendChild(this.htmlProvider.getTableHeadElement(option));
                this.tableBody = document.createElement("tbody");
                this.table.appendChild(this.tableBody);

                this.itemProvider = new SimpleItemsProvider();

                this.itemProvider.getItems(this.getFirstItemNumber(), this.getPageSize(), function (items, first, count) {
                    return _this.updateItems(items, first, count);
                });

                this.table.appendChild(this.htmlProvider.getTableFooterElement(option));

                element.append(this.table);
            }
            Grid.prototype.sortBy = function (columnName) {
                if ((this.itemProvider).sort != undefined) {
                    (this.itemProvider).sort(columnName);
                }
            };

            Grid.getGridObject = function (element) {
                if (element.grid == undefined || element.grid == null) {
                    if (element.parentElement == document.body) {
                        return null;
                    }

                    return Grid.getGridObject(element.parentElement);
                }

                return element.grid;
            };

            Grid.prototype.getFirstItemNumber = function () {
                return this.options.pageSize * this.options.currentPage;
            };

            Grid.prototype.getPageSize = function () {
                return this.options.pageSize;
            };

            Grid.prototype.updateItems = function (items, firstItem, itemsNumber) {
                this.htmlProvider.updateTableBodyElement(this.options, this.tableBody, items);
            };

            Grid.prototype.getHtmlProvider = function (options) {
                if (options.framework == TGrid.Framework.Knockout) {
                    return new TGrid.KnockoutHtmlProvider();
                }

                if (options.framework == TGrid.Framework.Angular) {
                    return new TGrid.AngularHtmlProvider();
                }
            };
            return Grid;
        })();
        TGrid.Grid = Grid;
    })(TesserisPro.TGrid || (TesserisPro.TGrid = {}));
    var TGrid = TesserisPro.TGrid;
})(TesserisPro || (TesserisPro = {}));
//# sourceMappingURL=TGrid.js.map
