var TesserisPro;
(function (TesserisPro) {
    /// <reference path="Scripts/typings/extenders.d.ts" />
    /// <reference path="Options.ts" />
    /// <reference path="IHtmlProvider.ts" />
    /// <reference path="IItemProvider.ts" />
    /// <reference path="knockout/KnockoutHtmlProvider.ts" />
    /// <reference path="angular/AngularHtmlProvider.ts" />
    /// <reference path="GroupHeaderDescriptor.ts" />
    /// <reference path="utils.ts" />
    (function (TGrid) {
        var Grid = (function () {
            function Grid(element, options, provider) {
                var _this = this;
                this.isPreloadingNext = false;
                this.isPreloadingPrevious = false;
                this.collapsedFilterGroup = [];
                this.enablePreload = true;
                element.grid = this;
                this.targetElement = element;
                this.options = options;
                this.itemProvider = provider;
                this.htmlProvider = this.getHtmlProvider(this.options);

                this.rootElement = document.createElement("div");
                this.rootElement.className = "tgrid-root";

                this.headerContainer = document.createElement("div");
                this.headerContainer.className = "tgrid-tableheadercontainer desktop";
                var headerTable = document.createElement("table");
                headerTable.className = "tgrid-table";
                this.headerContainer.appendChild(headerTable);

                // Header
                this.mobileHeader = document.createElement("div");
                this.mobileHeader.setAttribute("class", "tgrid-mobile-header mobile");
                this.rootElement.appendChild(this.mobileHeader);

                this.tableHeader = document.createElement("thead");
                this.tableHeader.setAttribute("class", "tgrid-table-header desktop");
                headerTable.appendChild(this.tableHeader);
                this.rootElement.appendChild(this.headerContainer);

                // Body
                this.tableBodyContainer = document.createElement("div");
                this.tableBodyContainer.className = "tgrid-tablebodycontainer desktop";

                if (options.isEnableVirtualScroll) {
                    this.tableBodyContainer.onscroll = function () {
                        return _this.scrollTable();
                    };
                } else {
                    this.itemProvider.getTotalItemsCount(options.filterDescriptors, function (total) {
                        _this.options.firstLoadSize = total;
                    });
                }

                var bodyTable = document.createElement("table");
                bodyTable.className = "tgrid-table";

                this.tableBodyContainer.appendChild(bodyTable);

                this.tableBody = document.createElement("tbody");
                bodyTable.appendChild(this.tableBody);
                this.rootElement.appendChild(this.tableBodyContainer);

                this.mobileContainer = document.createElement("div");
                this.mobileContainer.setAttribute("class", "tgrid-mobile-container mobile");
                this.rootElement.appendChild(this.mobileContainer);

                // Footer
                this.tableFooter = document.createElement("div");
                this.tableFooter.setAttribute("class", "tgrid-footer");
                this.rootElement.appendChild(this.tableFooter);

                if (options.isEnableVirtualScroll) {
                    this.buisyIndicator = document.createElement("div");
                    this.buisyIndicator.className = "tgrid-buisy-indicator";
                    this.rootElement.appendChild(this.buisyIndicator);

                    this.scrollBar = document.createElement("div");
                    this.scrollBar.className = "tgrid-scroll";
                    var scrollContent = document.createElement("div");
                    scrollContent.style.height = "1000px";
                    this.scrollBar.appendChild(scrollContent);
                    this.rootElement.appendChild(this.scrollBar);

                    this.scrollBar.onmouseup = function () {
                        return _this.onManualScroll();
                    };
                }

                this.targetElement.appendChild(this.rootElement);

                this.tableBodyContainer.scrollTop = 0;

                if (this.options.groupBySortDescriptor.length > 0) {
                    this.refreshHeader();
                    this.refreshBody(options.isEnableVirtualScroll);
                    if (this.options.isEnablePaging) {
                        this.refreshFooter();
                    }
                } else {
                    this.sortBy(this.options.sortDescriptor.path);
                    if (this.options.isEnablePaging) {
                        this.refreshFooter();
                    }
                }
            }
            Grid.getGridObject = function (element) {
                if (element.grid == undefined || element.grid == null) {
                    if (element.parentElement == document.body) {
                        return null;
                    }

                    return Grid.getGridObject(element.parentElement);
                }

                return element.grid;
            };

            Grid.prototype.getPreviousPageFirsItemIndex = function () {
                var result = this.firstVisibleItemIndex - this.options.batchSize;
                if (result < 0) {
                    result = 0;
                }

                return result;
            };

            Grid.prototype.getPreviousPageSize = function () {
                var realBatchSize = this.options.batchSize + (this.options.firstLoadSize - this.visibleItems.length);

                var perviousPageFirstItemsNumber = this.firstVisibleItemIndex - realBatchSize;
                if (perviousPageFirstItemsNumber < 0) {
                    return realBatchSize + perviousPageFirstItemsNumber;
                }

                return realBatchSize;
            };

            Grid.prototype.getNextPageFirstItemIndex = function () {
                return this.firstVisibleItemIndex + this.visibleItems.length;
            };

            Grid.prototype.getNextPageSize = function () {
                return this.options.batchSize;
            };

            Grid.prototype.getEffectiveSorting = function () {
                var result = new Array();
                var foundSortDescriptor = false;
                var otherSorting = new Array();

                for (var j = 0; j < this.options.groupBySortDescriptor.length; j++) {
                    var found = false;
                    for (var i = 0; i < result.length; i++) {
                        if (this.options.sortDescriptor.path == this.options.groupBySortDescriptor[j].path) {
                            foundSortDescriptor = true;
                        }
                        if (result[i].path == this.options.groupBySortDescriptor[j].path) {
                            found = true;
                            break;
                        }
                    }

                    if (!found) {
                        if (this.options.groupBySortDescriptor[j].path == this.options.sortDescriptor.path) {
                            this.options.groupBySortDescriptor[j].asc = this.options.sortDescriptor.asc;
                        }
                        result.push(this.options.groupBySortDescriptor[j]);
                    }
                }
                if (!foundSortDescriptor) {
                    result.push(this.options.sortDescriptor);
                }

                return result;
            };

            Grid.prototype.getEffectiveFiltering = function () {
                var allFilter = [];
                if (this.options.filterDescriptors != null || this.options.filterDescriptors.length > 0) {
                    allFilter = allFilter.concat(this.options.filterDescriptors);
                }

                if (this.collapsedFilterGroup != null || this.collapsedFilterGroup.length > 0) {
                    allFilter = allFilter.concat(this.collapsedFilterGroup);
                }

                return allFilter;
            };

            Grid.prototype.scrollTable = function () {
                if (!this.isPreloadingNext && this.enablePreload) {
                    if (this.tableBodyContainer.scrollTop > ((this.tableBodyContainer.scrollHeight - this.tableBodyContainer.clientHeight) / 4 * 3) && this.nextPage == null) {
                        this.preloadNextPage();
                    }
                }
                if (!this.isPreloadingPrevious && this.enablePreload) {
                    if (this.tableBodyContainer.scrollTop < ((this.tableBodyContainer.scrollHeight - this.tableBodyContainer.clientHeight) / 4) && this.previousPage == null) {
                        this.preloadPreviousPage();
                    }
                }

                if (this.totalItemsCount > this.firstVisibleItemIndex + this.visibleItems.length) {
                    if (this.tableBodyContainer.scrollTop + this.tableBodyContainer.clientHeight >= this.tableBodyContainer.scrollHeight) {
                        this.showNextPage();
                    }
                }

                if (this.firstVisibleItemIndex > 0) {
                    if (this.tableBodyContainer.scrollTop == 0) {
                        this.showPreviousPage();
                    }
                }
                this.updateGlobalScroll();
            };

            Grid.prototype.updateGlobalScroll = function () {
                var firstItem = this.htmlProvider.getFirstVisibleItem(this.tableBody, this.visibleViewModels, this.tableBodyContainer.scrollTop);
                var visibleItemNumber = this.firstVisibleItemIndex;
                for (var i = 0; i < this.visibleItems.length; i++) {
                    if (firstItem.item == this.visibleItems[i]) {
                        visibleItemNumber = this.firstVisibleItemIndex + i;
                        break;
                    }
                }

                var scrollPosition = (1000 / this.totalItemsCount) * visibleItemNumber;

                this.scrollBar.scrollTop = scrollPosition;
            };

            Grid.prototype.onManualScroll = function () {
                var _this = this;
                var itemSize = (1000 / this.totalItemsCount);
                var itemNumber = this.scrollBar.scrollTop / itemSize;
                this.showBuisyIndicator();
                this.previousPage = null;
                this.nextPage = null;
                this.itemProvider.getItems(itemNumber, this.options.firstLoadSize, this.getEffectiveSorting(), this.getEffectiveFiltering(), function (items, first, count) {
                    _this.tableBodyContainer.scrollTop = 1;
                    _this.firstVisibleItemIndex = first;
                    _this.visibleItems = items;
                    _this.visibleViewModels = _this.buildViewModels(_this.visibleItems);
                    _this.updateVisibleItems();
                    _this.hideBuisyIndicator();
                });
            };

            Grid.prototype.preloadPreviousPage = function () {
                var _this = this;
                var size = this.getPreviousPageSize();
                if (size > 0) {
                    this.isPreloadingPrevious = true;
                    this.itemProvider.getItems(this.getPreviousPageFirsItemIndex(), size, this.getEffectiveSorting(), this.getEffectiveFiltering(), function (items, first, count) {
                        _this.previousPage = items;
                        _this.isPreloadingPrevious = false;
                    });
                }
            };

            Grid.prototype.preloadNextPage = function () {
                var _this = this;
                this.isPreloadingNext = true;
                this.itemProvider.getItems(this.getNextPageFirstItemIndex(), this.getNextPageSize(), this.getEffectiveSorting(), this.getEffectiveFiltering(), function (items, first, count) {
                    _this.nextPage = items;
                    _this.isPreloadingNext = false;
                });
            };

            Grid.prototype.showPreviousPage = function () {
                var _this = this;
                if (this.previousPage == null) {
                    this.showBuisyIndicator();
                    if (!this.isPreloadingPrevious) {
                        this.preloadNextPage();
                    }
                    setTimeout(function () {
                        _this.showPreviousPage();
                    }, 100);
                } else if (this.previousPage != null && this.previousPage.length > 0) {
                    this.hideBuisyIndicator();
                    this.enablePreload = false;

                    this.visibleItems.splice(this.visibleItems.length - this.options.batchSize, this.options.batchSize);
                    this.firstVisibleItemIndex -= this.options.batchSize;

                    if (this.firstVisibleItemIndex < 0) {
                        this.firstVisibleItemIndex = 0;
                    }

                    var firstNewItem = this.previousPage[this.previousPage.length - 1];
                    this.visibleItems = this.previousPage.concat(this.visibleItems);
                    this.visibleViewModels = this.buildViewModels(this.visibleItems);

                    this.updateVisibleItems();

                    setTimeout(function () {
                        var skipItems = new Array();
                        for (var i = 0; i < _this.visibleViewModels.length; i++) {
                            skipItems.push(_this.visibleViewModels[i]);
                            if (_this.visibleViewModels[i].item == firstNewItem) {
                                break;
                            }
                        }

                        var skipSize = _this.htmlProvider.getElemntsSize(_this.tableBody, skipItems);

                        _this.tableBodyContainer.scrollTop = skipSize;
                        _this.previousPage = null;
                        _this.nextPage = null;
                        _this.enablePreload = true;
                    }, 1);
                }
            };

            Grid.prototype.showNextPage = function () {
                var _this = this;
                if (this.nextPage == null) {
                    this.showBuisyIndicator();
                    if (!this.isPreloadingNext) {
                        this.preloadNextPage();
                    }
                    setTimeout(function () {
                        _this.showNextPage();
                    }, 100);
                } else if (this.nextPage != null && this.nextPage.length > 0) {
                    this.hideBuisyIndicator();
                    this.enablePreload = false;
                    this.visibleItems.splice(0, this.options.batchSize);
                    this.firstVisibleItemIndex += this.options.batchSize;

                    var firstNewItem = this.nextPage[0];
                    this.visibleItems = this.visibleItems.concat(this.nextPage);
                    this.visibleViewModels = this.buildViewModels(this.visibleItems);

                    this.updateVisibleItems();

                    setTimeout(function () {
                        var skipItems = new Array();
                        for (var i = 0; i < _this.visibleViewModels.length; i++) {
                            skipItems.push(_this.visibleViewModels[i]);
                            if (_this.visibleViewModels[i].item == firstNewItem) {
                                break;
                            }
                        }

                        var skipSize = _this.htmlProvider.getElemntsSize(_this.tableBody, skipItems);

                        _this.tableBodyContainer.scrollTop = skipSize - _this.tableBodyContainer.clientHeight;
                        _this.nextPage = null;
                        _this.previousPage = null;
                        _this.enablePreload = true;
                    }, 1);
                }
            };

            Grid.prototype.sortBy = function (name) {
                if (name == this.options.sortDescriptor.path) {
                    this.options.sortDescriptor.asc = !this.options.sortDescriptor.asc;
                } else {
                    this.options.sortDescriptor.path = name;
                    this.options.sortDescriptor.asc = false;
                }

                this.refreshHeader();
                this.refreshBody();
            };

            Grid.prototype.selectPage = function (page) {
                this.options.currentPage = page;
                this.refreshHeader();
                this.refreshBody();
                this.refreshFooter();
            };

            Grid.prototype.selectItem = function (item, multi) {
                if (this.options.selectionMode == TGrid.SelectionMode.Multi) {
                    if (multi) {
                        for (var i = 0; i < this.options.selection.length; i++) {
                            if (item.item == this.options.selection[i]) {
                                this.options.selection.splice(i, 1);
                                this.refreshBody();
                                return false;
                            }
                        }

                        this.options.selection.push(item.item);
                    } else {
                        this.options.selection = [item.item];
                    }
                } else if (this.options.selectionMode == TGrid.SelectionMode.Single) {
                    this.options.selection = [item.item];
                } else {
                    this.options.selection = null;
                }

                if (this.options.selection.length == 1) {
                    this.options.showDetailFor.item = this.options.selection[0];
                }

                this.htmlProvider.updateTableDetailRow(this.options, this.tableBodyContainer.getElementsByTagName("tbody")[0], this.options.showDetailFor.item);
                this.htmlProvider.updateMobileDetailRow(this.options, this.mobileContainer, this.options.showDetailFor.item);
                return true;
            };

            Grid.prototype.buildViewModels = function (items) {
                var itemModels = [];
                var groupNames = [];

                for (var j = 0; j < this.options.groupBySortDescriptor.length; j++) {
                    groupNames.push("");
                }

                for (var i = 0; i < items.length; i++) {
                    for (var j = 0; j < this.options.groupBySortDescriptor.length; j++) {
                        var columnValue = getMemberValue(items[i], this.options.groupBySortDescriptor[j].path);
                        if (groupNames[j] != columnValue) {
                            groupNames[j] = columnValue;
                            itemModels.push(new TGrid.ItemViewModel(null, new TGrid.GroupHeaderDescriptor(columnValue, j), this, true));

                            for (var k = j + 1; k < this.options.groupBySortDescriptor.length; k++) {
                                groupNames[k] = "";
                            }
                        }
                    }

                    itemModels.push(new TGrid.ItemViewModel(null, items[i], this, false));
                }

                //var previousGroupName: string = "";
                //for (var i = 0; itemModels.length; i++) {
                //    //insert collapsed  group header
                //    if (itemModels[i].isGroupHeader) {
                //    }
                //}
                //for (var i = 0; i < this.collapsedFilterGroup.length; i++) {
                //    itemModels.push(new ItemViewModel(null,
                //        new GroupHeaderDescriptor(this.collapsedFilterGroup[i].value, 0, true),
                //        this,
                //        true));
                //}
                return itemModels;
            };

            Grid.prototype.updateVisibleItems = function () {
                var _this = this;
                setTimeout(function () {
                    _this.tableBody.innerHTML = "";
                    _this.htmlProvider.updateTableBodyElement(_this.options, _this.tableBody, _this.visibleViewModels, function (x, m) {
                        return _this.selectItem(x, m);
                    });
                }, 1);

                setTimeout(function () {
                    _this.mobileContainer.innerHTML = "";
                    _this.htmlProvider.updateMobileItemsList(_this.options, _this.mobileContainer, _this.visibleViewModels, function (x, m) {
                        return _this.selectItem(x, m);
                    });
                }, 1);
            };

            Grid.prototype.getHtmlProvider = function (options) {
                if (options.framework == TGrid.Framework.Knockout) {
                    return new TGrid.KnockoutHtmlProvider();
                }

                if (options.framework == TGrid.Framework.Angular) {
                    return new TGrid.AngularHtmlProvider();
                }
            };

            Grid.prototype.getFirstItemNumber = function () {
                return this.options.pageSize * this.options.currentPage;
            };

            Grid.prototype.getPageSize = function () {
                return this.options.pageSize;
            };

            Grid.prototype.refreshHeader = function () {
                this.htmlProvider.updateTableHeadElement(this.options, this.tableHeader, this.itemProvider.isSortable());
                this.htmlProvider.updateMobileHeadElement(this.options, this.mobileHeader, this.itemProvider.isSortable());
            };

            Grid.prototype.refreshBody = function (withBuisy) {
                if (typeof withBuisy === "undefined") { withBuisy = false; }
                var _this = this;
                if (withBuisy) {
                    this.showBuisyIndicator();
                }

                if (!this.options.isEnablePaging) {
                    this.itemProvider.getTotalItemsCount(this.getEffectiveFiltering(), function (totalitemsCount) {
                        _this.totalItemsCount = totalitemsCount;
                        _this.itemProvider.getItems(_this.getFirstItemNumber(), _this.options.firstLoadSize, _this.getEffectiveSorting(), _this.getEffectiveFiltering(), function (items, first, count) {
                            _this.firstVisibleItemIndex = first;
                            _this.visibleItems = items;
                            _this.visibleViewModels = _this.buildViewModels(_this.visibleItems);
                            _this.updateVisibleItems();
                            if (withBuisy) {
                                _this.hideBuisyIndicator();
                            }
                        });
                    });
                } else {
                    this.itemProvider.getTotalItemsCount(this.getEffectiveFiltering(), function (totalitemsCount) {
                        _this.itemProvider.getItems(_this.getFirstItemNumber(), _this.getPageSize(), _this.getEffectiveSorting(), _this.getEffectiveFiltering(), function (items, first, count) {
                            _this.firstVisibleItemIndex = first;
                            _this.visibleItems = items;
                            _this.visibleViewModels = _this.buildViewModels(_this.visibleItems);
                            _this.updateVisibleItems();
                            if (withBuisy) {
                                _this.hideBuisyIndicator();
                            }
                        });
                    });
                }
            };

            Grid.prototype.refreshFooter = function () {
                var _this = this;
                this.itemProvider.getTotalItemsCount(this.getEffectiveFiltering(), function (totalitemsCount) {
                    _this.tableFooter.innerHTML = "";
                    _this.totalItemsCount = totalitemsCount;
                    _this.htmlProvider.updateTableFooterElement(_this.options, _this.tableFooter, _this.totalItemsCount);
                });
            };

            Grid.prototype.showBuisyIndicator = function () {
                this.buisyIndicator.removeAttribute("style");
            };

            Grid.prototype.hideBuisyIndicator = function () {
                this.buisyIndicator.setAttribute("style", "display: none;");
            };

            Grid.prototype.setFilters = function (value, level) {
                this.collapsedFilterGroup.push(new TGrid.FilterDescriptor(this.options.groupBySortDescriptor[level].path, value, TGrid.FilterCondition.Equals));
                this.refreshBody();
            };

            Grid.prototype.removeFilters = function (value, level) {
                for (var j = 0; j < this.collapsedFilterGroup.length; j++) {
                    if (this.options.groupBySortDescriptor[level].path == this.collapsedFilterGroup[j].path && this.collapsedFilterGroup[j].value == value) {
                        this.collapsedFilterGroup.splice(j, 1);
                    }
                }
                this.refreshBody();
            };
            return Grid;
        })();
        TGrid.Grid = Grid;
    })(TesserisPro.TGrid || (TesserisPro.TGrid = {}));
    var TGrid = TesserisPro.TGrid;
})(TesserisPro || (TesserisPro = {}));
//# sourceMappingURL=TGrid.js.map
