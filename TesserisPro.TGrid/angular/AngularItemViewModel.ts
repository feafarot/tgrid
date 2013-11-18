module TesserisPro.TGrid {

    export class AngularItemViewModel extends ItemViewModel {
        private $scope: any;

        public angularControllerName: string;

        public setScope(scope: any) {
            this.$scope = scope;
            this.$scope.model = this.model;
            this.$scope.item = this.item;
            this.$scope.grid = this.grid;
            this.$scope.isGroupHeader = this.isGroupHeader;
            this.$scope.getCellDetailsFor = function (columnIndex) {
                this.grid.options.showDetailFor.column = columnIndex;
                this.grid.options.showDetailFor.isDetailColumn = true;
            };
        }
    }
}