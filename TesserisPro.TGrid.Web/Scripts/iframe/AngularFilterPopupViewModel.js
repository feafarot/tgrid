//=====================================================================================
//
// The Tesseris Free License
//
// Copyright(c) 2014 Tesseris Pro LLC
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this
// software and associated documentation files(the "Software"), to deal in the Software
// without restriction, including without limitation the rights to use, copy, modify,
// merge, publish, distribute, sublicense, and / or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to the following
// conditions:
var TesserisPro;
(function (TesserisPro) {
    // 1. The above copyright notice and this permission notice shall be included in all
    //    copies or substantial portions of the Software.
    //
    // 2. Any software that fully or partially contains or uses materials covered by
    //    this license shall notify users about this notice and above copyright.The
    //    notification can be made in "About box" and / or site main web - page footer.The
    //    notification shall contain name of Tesseris Pro company and name of the Software
    //    covered by current license.
    //
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
    // INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
    // PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
    // HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
    // OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
    // SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
    //
    //=====================================================================================
    (function (TGrid) {
        var AngularFilterPopupViewModel = (function () {
            function AngularFilterPopupViewModel(container, onCloseFilterPopup) {
                this.container = container;
                this.onCloseFilterPopup = onCloseFilterPopup;
            }
            AngularFilterPopupViewModel.prototype.setScope = function (scope) {
                var _this = this;
                this.$scope = scope;
                this.$scope.path = this.path;
                this.$scope.onApply = function () {
                    return _this.onApply();
                };
                this.$scope.onClear = function () {
                    return _this.onClear();
                };
                this.$scope.onClose = function () {
                    return _this.onClose();
                };
            };

            AngularFilterPopupViewModel.prototype.onCloseFilterPopup = function () {
            };

            AngularFilterPopupViewModel.prototype.onApply = function () {
                this.condition = this.container.getElementsByTagName("select")[0].selectedIndex;
                var grid = TGrid.Grid.getGridObject(this.container);

                grid.options.filterDescriptor.removeChildByPath(this.$scope.path);
                if (this.condition != 0 /* None */) {
                    this.value = this.container.getElementsByTagName("input")[0].value;
                    grid.options.filterDescriptor.addChild(new TGrid.FilterDescriptor(this.$scope.path, this.value, this.condition));
                }
                grid.applyFilters();

                hideElement(this.container);
                this.onCloseFilterPopup();
            };

            AngularFilterPopupViewModel.prototype.onClear = function () {
                var grid = TGrid.Grid.getGridObject(this.container);
                grid.options.filterDescriptor.removeChildByPath(this.$scope.path);
                grid.applyFilters();

                hideElement(this.container);
                this.onCloseFilterPopup();
            };

            AngularFilterPopupViewModel.prototype.onClose = function () {
                hideElement(this.container);
                this.onCloseFilterPopup();
            };

            AngularFilterPopupViewModel.prototype.onOpen = function (options, column) {
                this.columnInfo = column;
                this.$scope.path = column.filterMemberPath;
                for (var i = 0; i < options.filterDescriptor.children.length; i++) {
                    if (options.filterDescriptor.children[i].path == column.filterMemberPath) {
                        this.container.getElementsByTagName("input")[0].value = options.filterDescriptor.children[i].value;
                        this.container.getElementsByTagName("select")[0].selectedIndex = options.filterDescriptor.children[i].condition;
                        this.$scope.$apply();
                        return;
                    }
                }

                this.container.getElementsByTagName("input")[0].value = '';
                this.container.getElementsByTagName("select")[0].selectedIndex = 0 /* None */;
                this.$scope.$apply();
            };

            AngularFilterPopupViewModel.prototype.getColumnInfo = function () {
                return this.columnInfo;
            };
            return AngularFilterPopupViewModel;
        })();
        TGrid.AngularFilterPopupViewModel = AngularFilterPopupViewModel;
    })(TesserisPro.TGrid || (TesserisPro.TGrid = {}));
    var TGrid = TesserisPro.TGrid;
})(TesserisPro || (TesserisPro = {}));
//# sourceMappingURL=AngularFilterPopupViewModel.js.map
