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

/// <reference path="../scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../ItemViewModel.ts" />

module TesserisPro.TGrid {

    export class AngularItemsViewModel {
        private $scope: ng.IScope;
        private itemsModels: Array<ItemViewModel>;
        private options: Options;
        private selected: (item: ItemViewModel, multi: boolean) => boolean;

        public angularControllerName: string;

        constructor(items: Array<ItemViewModel>, options: Options, selected: (item: ItemViewModel, multi: boolean) => boolean) {
            this.itemsModels = items;
            this.options = options;
            this.selected = selected;
        }
        public setScope(scope: any) {
            this.$scope = scope;
            this.$scope.options = this.options;
            this.$scope.items = new Array<AngularItemViewModel>();
            for (var i = 0; i < this.itemsModels.length; i++) {
                this.$scope.items[i] = new AngularItemViewModel(this.itemsModels[i].model,
                    this.itemsModels[i].item,
                    this.itemsModels[i].grid,
                    this.itemsModels[i].isGroupHeader);
                this.$scope.items[i].originalModel = this.itemsModels[i];
                this.$scope.items[i].colspan = this.options.columns.length + 1 + this.options.groupBySortDescriptors.length - this.itemsModels[i].item.level;
                this.$scope.items[i].detailsColspan = this.options.hasAnyNotSizedColumn ? this.options.columns.length : this.options.columns.length + 1;
                this.$scope.items[i].isSelected = this.options.isSelected(this.itemsModels[i].item);
                this.$scope.items[i].showDetail = false;
                this.$scope.items[i].showDetailsFor = new ShowDetail();
                if (this.$scope.options.showDetailFor.item == this.$scope.items[i].item) {
                    this.$scope.items[i].showDetail = true;
                }
                this.$scope.items[i].toggleGroupCollapsing = (e, item) => {
                    if (item.item.collapse) {
                       item.grid.removeCollapsedFilters(item.item.filterDescriptor);
                        item.item.collapse = false;
                    }
                    else {
                        item.grid.setCollapsedFilters(item.item.filterDescriptor);
                        item.item.collapse = true;
                    }
                }
                this.$scope.items[i].toggleDetailForCell = (columnIndex: number, item: AngularItemViewModel) => {
                    item.toggleDetailsForCell(columnIndex);
                };
                   
                this.$scope.items[i].openDetailForCell = (columnIndex: number, item: AngularItemViewModel) => {
                   item.openDetailsForCell(columnIndex);
                };
                this.$scope.items[i].closeDetailForCell = (columnIndex: number, item: AngularItemViewModel)=> {
                    item.closeDetailsForCell(columnIndex);
                }
                this.$scope.items[i].select = (e: KeyboardEvent, item: AngularItemViewModel, items) => {
                    this.selected(item, e.ctrlKey);
                }
            }

        }
        public setItemSelection(item: ItemViewModel, isSelected: boolean, isAddedDetails: boolean) {
            for (var i = 0; i < this.itemsModels.length; i++) {
                this.$scope.items[i].showDetail = false;
                if (this.itemsModels[i].item == item) {
                    this.$scope.items[i].isSelected = isSelected;
                    if (isAddedDetails) {
                        this.$scope.items[i].showDetail = true;
                    }
                    this.$scope.options.showDetailFor = this.options.showDetailFor;
                    setTimeout(() => { this.$scope.$apply(); }, 10);
                }
            }
        }

    }
} 