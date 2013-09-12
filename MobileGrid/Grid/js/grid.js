﻿ko.bindingHandlers.DPHeader = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var columns = valueAccessor().columns;

        var headerMarkup = "";
        for (var index = 0; index < columns.length; index++) {
            var column = columns[index];
            var widthStyle = isNotNoU(column.width) ? "min-width: " + column.width + "; max-width: " + column.width + "; width: " + column.width : "";

            // TODO: rework sort order so it changes to opposite only if column changed, otherwise make it equal 1.
            headerMarkup += "<span data-bind=\"click: function () { $root.gridConfig.sortOrder({ propertyName : '" + column.property + "', order: -$root.gridConfig.sortOrder().order}); " + "}\" style=\"" + widthStyle + "\" class=\"dp-inner-header\">" + column.header;

            // TODO: add arrow icons, leave css arrows.
            headerMarkup += "<span class=\"arrow-down\" data-bind=\"visible: $root.gridConfig.sortOrder().order == '-1' && $root.gridConfig.sortOrder().propertyName == '" + column.property + "'\"></span>";
            headerMarkup += "<span class=\"arrow-up\" data-bind=\"visible: $root.gridConfig.sortOrder().order == '1' && $root.gridConfig.sortOrder().propertyName == '" + column.property + "'\"></span>";

            headerMarkup += "</span>";
        }

        $(element).html(headerMarkup);
    },
    update: function (element, valueAccessor) {
    }
};

ko.bindingHandlers.DPContent = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var columns = valueAccessor().columns;
        var data = valueAccessor().data;
        var mobileHeader = valueAccessor().mobileHeader;
        var rowMarkup = "";
        for (var index = 0; index < columns.length; index++) {
            var column = columns[index];
            var value = data[column.property];

            var widthStyle = isNotNoU(column.width) ? "min-width: " + column.width + "; max-width: " + column.width + "; width: " + column.width : "";
            var mobileWidth = isNotNoU(mobileHeader.width) ? "min-width: " + mobileHeader.width + "; max-width: " + mobileHeader.width + "; width: " + mobileHeader.width : "";
            rowMarkup += "<div style=\"" + widthStyle + "\" class=\"dp-grid-cell\">";
            rowMarkup += "<span style=\"" + mobileWidth + "\" class=\"dp-grid-mobile-heading\">" + column.header + "</span>";
            rowMarkup += "<span class=\"dp-grid-cell-content\">" + value + "</span>";
            rowMarkup += "</div>";
        }

        $(element).html(rowMarkup);
    },
    update: function (element, valueAccessor) {
    }
};

ko.bindingHandlers.DPFooter = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var rowMarkup = "";
        rowMarkup += "<input class=\"dp-grid-paging-first\" type=\"button\" value=\"<<\" title=\"<<\"data-bind=\"click: function(){" + "$root.gridConfig.pageNumber(1);}\"/>";
        rowMarkup += "<input class=\"dp-grid-paging-previous\" type=\"button\" value=\"<\" title=\"<\"data-bind=\"click: " + "function(){var newPage = $root.gridConfig.pageNumber() - 1;" + "if (newPage != 0) " + "{$root.gridConfig.pageNumber(newPage);}}\"/>";
        rowMarkup += "Page:<input class=\"dp-grid-paging-page\" data-bind=\"value:$root.gridConfig.pageNumber\"/>" + " from <span data-bind=\"text:$root.gridConfig.pageCount()\"></span>";
        rowMarkup += "<input class=\"dp-grid-paging-next\" type=\"button\" value=\">\" title=\">\"data-bind=\"click: " + "function(){var newPage = $root.gridConfig.pageNumber() + 1;" + "if (newPage != $root.gridConfig.pageCount()+1) " + "{$root.gridConfig.pageNumber(newPage);}}\"/>";
        rowMarkup += "<input class=\"dp-grid-paging-last\" type=\"button\" value=\">>\" title=\">>\"data-bind=\"click: function(){" + "$root.gridConfig.pageNumber(" + valueAccessor().pageCount() + ");}\"/>";
        $(element).html(rowMarkup);
    },
    update: function (element, valueAccessor) {
    }
};

ko.bindingHandlers.MobileGridSorting = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var rowMarkup = "";
        rowMarkup += "Sorted: " + "<select data-bind=\"options: $root.gridConfig.columns, optionsText: 'property', value: $root.gridConfig.sortedColumn \"></select>";
        rowMarkup += "<span class=\"arrow-down\" data-bind=\"visible: $root.gridConfig.sortOrder().order == '-1'," + "click:function(){ var prop = $root.gridConfig.sortOrder().propertyName;  $root.gridConfig.sortOrder({ propertyName : prop, order: '1'}) }" + "\"></span>";
        rowMarkup += "<span class=\"arrow-up\" data-bind=\"visible: $root.gridConfig.sortOrder().order == '1'," + "click:function(){ var prop = $root.gridConfig.sortOrder().propertyName;  $root.gridConfig.sortOrder({ propertyName : prop, order: '-1'}) }" + "\"></span>";
        $(element).html(rowMarkup);
    },
    update: function (element, valueAccessor) {
    }
};

var GridConfigViewModel = function (gridConfig) {
    var $ref = {};

    $ref.data = ko.observableArray(gridConfig.data);
    $ref.columns = gridConfig.columns;
    $ref.mobileHeader = gridConfig.mobileHeader;

    $ref.sortOrder = ko.observable({ propertyName: $ref.columns[0].property, order: 1 });

    $ref.lastPropertyName = $ref.sortOrder().propertyName;

    $ref.pageNumber = ko.observable(gridConfig.pager.pageNumber);
    $ref.pageSize = ko.observable(gridConfig.pager.pagerSize);
    $ref.pageCount = ko.computed(function () {
        var count = Math.ceil(gridConfig.data.length / $ref.pageSize());
        return count;
    });

    $ref.sortedData = ko.computed(function () {
        var order = $ref.sortOrder().order;
        var propertyName = $ref.sortOrder().propertyName;

        if (propertyName != $ref.lastPropertyName) {
            order = 1;
            $ref.sortOrder().order = 1;
            $ref.lastPropertyName = propertyName;
        }

        var result = $ref.data.sort(function (a, b) {
            return CompareByProperty(a, b, propertyName) * order;
        });

        //show page number pager.pageNumber==$ref.pageNumber
        var semiresult = [];
        for (i = ($ref.pageNumber() - 1) * $ref.pageSize(); semiresult.length < $ref.pageSize(); i++) {
            if (i == result.length)
                break;
            semiresult.push(result[i]);
        }

        return semiresult;
    });

    $ref.sortedColumn = ko.observable();
    $ref.sortedColumn.subscribe(function (newValue) {
        $ref.sortOrder({ propertyName: newValue.property, order: $ref.sortOrder().order });
    });

    return $ref;
};

var GridViewModel = function () {
    this.gridConfig = new GridConfigViewModel({
        data: [
            { name: "0", type: "B", severity: "Maximum" },
            { name: "Y", type: "E", severity: "10" },
            { name: "V", type: "H", severity: "7" },
            { name: "S", type: "K", severity: "5" },
            { name: "P", type: "N", severity: "R" },
            { name: "M", type: "Q", severity: "O" },
            { name: "J", type: "T", severity: "L" },
            { name: "G", type: "W", severity: "I" },
            { name: "D", type: "Z", severity: "F" },
            { name: "A", type: "1", severity: "C" }
        ],
        columns: [
            { header: "Item Name", property: "name", width: "200px" },
            { header: "Item Type", property: "type", width: "200px" },
            { header: "Item Severity", property: "severity" }
        ],
        mobileHeader: {
            width: "200px"
        },
        pager: {
            pageNumber: 1,
            pagerSize: 3
        }
    });
};

ko.applyBindings(new GridViewModel());
