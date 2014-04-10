var __extends=this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);r.prototype=t.prototype;n.prototype=new r},TGrid,TesserisPro;(function(n){(function(t){var i=function(t){function i(){t.apply(this,arguments)}return __extends(i,t),i.prototype.getElementsSize=function(n,t){var e=0,u=n.children,r,i,f;for(containsClass(n,"mobile")&&(u=n.children[0].children),r=0;r<u.length;r++)i=u.item(r),containsClass(i,"ng-hide")||(f=angular.element(i).scope()!=undefined?angular.element(i).scope().item.originalModel:null,isNotNoU(f)&&(t==null||t.indexOf(f)>=0)&&(e+=i.offsetHeight));return e},i.prototype.getFirstVisibleItem=function(n,t,i){var o=0,e=n.children,u,s,r,f;for(containsClass(n,"mobile")&&(e=n.children[0].children),u=0,s=0;u<e.length;u++)if(r=e.item(u),!containsClass(r,"ng-hide")&&(f=angular.element(r).scope()!=undefined?angular.element(r).scope().item.originalModel:null,isNotNoU(f)&&t.indexOf(f)>=0&&(o+=r.offsetHeight,o>i)))return f;return null},i.prototype.getVisibleItemsCount=function(n,t,i,r){var h=0,c=0,e=n.children,o,f,u,s;for(containsClass(n,"mobile")&&(e=n.children[0].children),o=0,f=0;f<e.length;f++)if(u=e.item(f),containsClass(u,"ng-hide")||(s=angular.element(u).scope()!=undefined?angular.element(u).scope().item.originalModel:null,isNotNoU(s)&&i.indexOf(s)>=0&&(h+=u.offsetHeight,h>r&&(c++,o+=u.offsetHeight))),o>=t.clientHeight)break;return c},i.prototype.getTableElement=function(){var n=document.createElement("table");return n.className="tgrid-table",n},i.prototype.getFooterViewModel=function(t){var r=new n.TGrid.AngularFooterViewModel(t);return r.angularModuleName="tgrid-footer-module"+i.moduleFooterCounter++,angular.module(r.angularModuleName,[]).controller("tgrid-footer-controller",["$scope",function(n){r.setScope(n)}]),r},i.prototype.getFilterPopupViewModel=function(t){var i=new n.TGrid.AngularFilterPopupViewModel(t,this.onCloseFilterPopup),r;return i.angularModuleName="tgrid-filter-popup-module",r=angular.module(i.angularModuleName,[]).controller("tgrid-filter-popup-controller",["$scope",function(n){i.setScope(n)}]),i},i.prototype.updateTableHeadElement=function(t,i,r,u,f){var p,s,v,e,o,l,h,c,w,a,y;if(t.columns.length<=0&&(p=n.TGrid.Grid.getGridObject(i),p.setColumnsFromItemsProvider()),this.updateGroupByPanel(t,r),s=document.createElement("tr"),this.appendIndent(s,t.columns.length,!0),this.showNeededIndents(s,t.groupBySortDescriptors.length,n.TGrid.Grid.getGridObject(i)),v=!1,t.columns.length>0)for(e=0;e<t.columns.length;e++)t.columns[e].device.indexOf("desktop")!=-1&&(o=document.createElement("th"),o.className="tgrid-header-cell",o.draggable=!1,l=document.createElement("div"),l.className="tgrid-header-cell-container",h=document.createElement("div"),c=document.createElement("div"),h.className="tgrid-header-cell-content",h.style.overflow="hidden",c.className="tgrid-header-cell-buttons",l.appendChild(h),l.appendChild(c),o.appendChild(l),t.columns[e].notSized?(t.columns[e].resizable=!1,v=!0):o.style.width=t.columns[e].width.toString()+"px",t.columns[e].header!=null?t.columns[e].header.applyTemplate(h):(w=t.columns[e].member!=null?t.columns[e].member:"",this.buildDefaultHeader(h,w)),t.enableSorting&&(function(i){o.onclick=function(r){return n.TGrid.Grid.getGridObject(r.target).sortBy(t.columns[i].sortMemberPath)}}(e),t.sortDescriptor.path==t.columns[e].sortMemberPath&&t.columns[e].sortMemberPath!=null&&this.addArrows(c,t,e)),this.addFilterButton(t,i,u,c,e),t.columns[e].resizable&&(a=document.createElement("div"),a.className="tgrid-header-column-resize",a.onclick=function(n){return n.stopImmediatePropagation()},function(n,i,r){var e=null,u=0;r.onmousedown=function(i){i.stopImmediatePropagation();u=i.screenX;e=document.onmousemove;document.onmousemove=function(i){u!=0&&(t.columns[n].width=(parseInt(t.columns[n].width)+i.screenX-u).toString(),u=i.screenX,f(t.columns[n]))}};document.onmouseup=function(){document.onmousemove=e;u=0}}(e,o,a),c.appendChild(a)),v&&(i.parentElement.style.tableLayout="fixed"),s.appendChild(o));y=document.createElement("th");addClass(y,"tgrid-placeholder");v&&(y.style.width="12px");s.appendChild(y);i.innerHTML="";i.appendChild(s)},i.prototype.updateTableBodyElement=function(t,i,r,u){var l=angular.module("TGridTbody",[]),h,o,f,e,s,c;return this.angularItemsViewModel=new n.TGrid.AngularItemsViewModel(r,t,u),h=this.angularItemsViewModel,l.controller("TableCtrl",["$scope",function(n){h.setScope(n)}]).directive("ngShowInFocus",function(){return{replace:!0,restrict:"A",link:function(n,t,i){n.$watch(i.ngShowInFocus,function(n){n?(t.css("display","block"),t.focus()):t.css("display","none")})}}}),o=i.parentElement,o.innerHTML="",i=o,f=document.createElement("tbody"),f.style.border="none",f.setAttribute("ng-controller","TableCtrl"),e=this.appendTableElement(t,i,r,0,u),e.setAttribute("ng-repeat-start","item in items"),e.setAttribute("ng-class","{'tgrid-table-body-row' : !item.isGroupHeader, 'tgrid-table-group-header':  item.isGroupHeader,'tgrid-table-body-row selected': !item.isGroupHeader && item.isSelected }"),s="",s=isNull(t.rowClick)?"item.select($event, item, $parent.items)":"item.model.".concat(t.rowClick).concat("(item.item ,$event);"),e.setAttribute("ng-click",s),c=this.buildDetailsRow(t),f.appendChild(e),f.appendChild(c),angular.bootstrap(f,["TGridTbody"]),i.appendChild(f),addClass(i,"desktop"),f},i.prototype.appendTableElement=function(n,t,i,r,u){var f=document.createElement("tr");return i.length>0&&(n.enableGrouping&&i[0].isGroupHeader&&this.buildGroupHeaderRow(n,i[0].item,f),this.buildRowElement(n,i[0],t,u,f)),f},i.prototype.buildRowElement=function(n,t,i,r,u){var o,f,s,e,h;for(this.appendIndentRow(u,n.groupBySortDescriptors.length),o=!1,f=0;f<n.columns.length;f++)n.columns[f].device.indexOf("desktop")!=-1&&(n.columns[f].notSized&&(o=!0),s=document.createElement("td"),s.setAttribute("ng-hide","item.isGroupHeader"),e=document.createElement("div"),e.className="tgrid-cell-content",e.style.overflow="hidden",s.appendChild(e),n.columns[f].cell!=null?n.columns[f].cell.applyTemplate(e):n.columns[f].member!=null&&this.createDefaultCell(e,n.columns[f].member),u.appendChild(s));o&&(i.style.tableLayout="fixed",i.parentElement.style.overflowY="scroll");u.dataContext=t.item;o||(h=document.createElement("td"),addClass(h,"tgrid-placeholder"),h.setAttribute("ng-hide","item.isGroupHeader"),u.appendChild(h))},i.prototype.buildGroupHeaderRow=function(n,t,i){this.appendIndentGroupHeader(i,n.columns.length);var r=document.createElement("td");r.setAttribute("colspan","{{item.colspan}}");addClass(r,"tgrid-table-group-header");r.setAttribute("ng-hide","!item.isGroupHeader");n.groupHeaderTemplate!=null?n.groupHeaderTemplate.applyTemplate(r):r=this.createDefaultGroupHeader(r);n.enableCollapsing&&(addClass(r,"collapsing"),r.setAttribute("ng-click","item.toggleGroupCollapsing($event, item)"));i.appendChild(r)},i.prototype.buildDetailsRow=function(n){var i=document.createElement("tr"),u,r,t;for(i.setAttribute("ng-repeat-end",""),i.setAttribute("ng-hide","!item.showDetail"),u=!1,isNotNull(n.detailsTemplateHtml)&&(t=document.createElement("td"),this.appendIndentRow(i,n.groupBySortDescriptors.length),u=!0,addClass(i,"tgrid-details"),t.setAttribute("colspan","{{item.detailsColspan}}"),t.setAttribute("ng-hide","$parent.options.showDetailFor.item != item.item || $parent.options.showDetailFor.column != -1"),n.detailsTemplateHtml.applyTemplate(t),i.appendChild(t)),r=0;r<n.columns.length;r++)isNotNull(n.columns[r].cellDetail)&&(t=document.createElement("td"),u||(this.appendIndentRow(i,n.groupBySortDescriptors.length),u=!0),addClass(i,"tgrid-details"),t.setAttribute("colspan","{{item.detailsColspan}}"),t.setAttribute("ng-hide","$parent.options.showDetailFor.item != item.item || $parent.options.showDetailFor.column !=".concat(r.toString())),n.columns[r].cellDetail.applyTemplate(t),i.appendChild(t));return i},i.prototype.updateTableDetailRow=function(n,t,i,r){this.angularItemsViewModel.setItemSelection(i,n.isSelected(i),r)},i.prototype.updateTableFooterElement=function(n,t,i,r){if(n.tableFooterTemplate==null&&n.enablePaging)this.buildDefaultTableFooterElement(n,t,i);else if(n.tableFooterTemplate!=null)if(t.hasChildNodes())r.apply();else{var u=document.createElement("div");u.className="tgrid-footer-container";u.setAttribute("ng-controller","tgrid-footer-controller");n.tableFooterTemplate.applyTemplate(u);angular.bootstrap(u,[r.angularModuleName]);t.appendChild(u)}else t.innerHTML=""},i.prototype.updateFilteringPopUp=function(n,t,i){var r;n.filterPopup==null?(r=document.createElement("div"),r.className="tgrid-filter-popup-container",r.setAttribute("ng-controller","tgrid-filter-popup-controller"),this.buildDefaultFilteringPopUp(n,r),angular.bootstrap(r,[i.angularModuleName]),t.appendChild(r)):(r=document.createElement("div"),r.className="tgrid-filter-popup-container",r.setAttribute("ng-controller","tgrid-filter-popup-controller"),n.filterPopup.applyTemplate(r),t.innerHTML="",angular.bootstrap(r,[i.angularModuleName]),t.appendChild(r))},i.prototype.addArrows=function(n,t){var i,r;return t.sortDescriptor.asc&&(i=document.createElement("div"),addClass(i,"tgrid-arrow-up"),n.appendChild(i)),t.sortDescriptor.asc||(r=document.createElement("div"),addClass(r,"tgrid-arrow-down"),n.appendChild(r)),n},i.prototype.removeArrows=function(n){for(var i=n.getElementsByClassName("tgrid-arrow-up"),t=0;t<i.length;t++)i[t].parentNode.removeChild(i[t]),t--;for(i=n.getElementsByClassName("tgrid-arrow-down"),t=0;t<i.length;t++)i[t].parentNode.removeChild(i[t]),t--},i.prototype.removeFilterButtons=function(n){for(var i=n.getElementsByClassName("tgrid-filter-button"),t=0;t<i.length;t++)i[t].parentNode.removeChild(i[t]),t--;for(i=n.getElementsByClassName("tgrid-filter-button-active"),t=0;t<i.length;t++)i[t].parentNode.removeChild(i[t]),t--},i.prototype.updateMobileItemsList=function(t,i,r,u){var c=angular.module("TGridTbody",[]),s,f,e,o,h;this.angularMobileItemsViewModel=new n.TGrid.AngularItemsViewModel(r,t,u);s=this.angularMobileItemsViewModel;c.controller("TableCtrl",["$scope",function(n){s.setScope(n)}]).directive("ngShowInFocus",function(){return{replace:!0,restrict:"A",link:function(n,t,i){n.$watch(i.ngShowInFocus,function(n){n?(t.css("display","block"),t.focus()):t.css("display","none")})}}});f=document.createElement("div");e=document.createElement("div");f.setAttribute("ng-controller","TableCtrl");e=this.appendMobileTableElement(t,i,r,0,u);e.setAttribute("ng-repeat-start","item in items");e.setAttribute("ng-class","{'tgrid-mobile-row' : !item.isGroupHeader, 'tgrid-mobile-group-header':  item.isGroupHeader,'tgrid-mobile-row selected': !item.isGroupHeader && item.isSelected }");o="item.select($event, item, $parent.items)";isNotNull(t.rowClick)&&(o="item.model.".concat(t.rowClick).concat("(item.item ,$event);"));e.setAttribute("ng-click",o);f.appendChild(e);h=this.buildMobileDetailsRow(t);f.appendChild(h);angular.bootstrap(f,["TGridTbody"]);i.appendChild(f);addClass(i,"mobile");t.showDetailFor.column=-1},i.prototype.appendMobileTableElement=function(n,t,i,r,u){var f=document.createElement("div");return i.length>0&&(n.enableGrouping&&i[0].isGroupHeader&&this.buildMobileGroupHeaderRow(n,i[0].item,f),this.buildMobileRowElement(n,i[0].item,t,u,f)),f},i.prototype.updateMobileDetailRow=function(n,t,i,r){this.angularMobileItemsViewModel.setItemSelection(i,n.isSelected(i),r)},i.prototype.buildMobileGroupHeaderRow=function(n,t,i){this.appendIndentMobileGroupHeader(i,n.columns.length);var r=document.createElement("div");r.setAttribute("ng-hide","!item.isGroupHeader");n.enableCollapsing&&(addClass(r,"collapsing"),r.setAttribute("ng-click","item.toggleGroupCollapsing($event, item)"));n.groupHeaderTemplate!=null?n.groupHeaderTemplate.applyTemplate(r):this.createDefaultGroupHeader(r);addClass(r,"tgrid-mobile-group-header-container");i.appendChild(r)},i.prototype.appendIndentMobileGroupHeader=function(n,t){for(var r,i=0;i<t;i++)r=document.createElement("div"),r.className="tgrid-mobile-group-indent-div",r.setAttribute("ng-hide","!item.isGroupHeader || ".concat(i.toString()).concat(" >= item.item.level")),n.appendChild(r)},i.prototype.buildMobileRowElement=function(n,t,i,r,u){this.appendIndentMobileRow(u,n.groupBySortDescriptors.length);var f=document.createElement("div");f.setAttribute("ng-hide","item.isGroupHeader");f.className="tgrid-mobile-div";n.mobileTemplateHtml!=null?n.mobileTemplateHtml.applyTemplate(f):f=this.createDefaultMobileTemplate(f,n);u.appendChild(f);u.dataContext=t.item},i.prototype.appendIndentMobileRow=function(n,t){for(var r,i=0;i<t;i++)r=document.createElement("div"),r.className="tgrid-mobile-row-indent-div",r.setAttribute("ng-hide","item.isGroupHeader || ".concat(i.toString()).concat(" >= item.item.level")),n.appendChild(r)},i.prototype.buildMobileDetailsRow=function(n){var t=document.createElement("div"),r,u,i,f;for(t.setAttribute("ng-repeat-end",""),t.setAttribute("ng-hide","!item.showDetail"),addClass(t,"tgrid-mobile-details"),r=!1,isNotNull(n.detailsTemplateHtml)&&(u=document.createElement("div"),this.appendIndentMobileRow(t,n.groupBySortDescriptors.length),r=!0,u.setAttribute("ng-hide","$parent.options.showDetailFor.item != item.item || $parent.options.showDetailFor.column != -1"),n.detailsTemplateHtml.applyTemplate(u),t.appendChild(u)),i=0;i<n.columns.length;i++)isNotNull(n.columns[i].cellDetail)&&(f=document.createElement("div"),r||(this.appendIndentMobileRow(t,n.groupBySortDescriptors.length),r=!0),addClass(t,"tgrid-details"),f.setAttribute("ng-hide","$parent.options.showDetailFor.item != item.item || $parent.options.showDetailFor.column !=".concat(i.toString())),n.columns[i].cellDetail.applyTemplate(f),t.appendChild(f));return t},i.prototype.createDefaultGroupHeader=function(n){var t=document.createElement("div"),i=document.createElement("span");return i.innerHTML="{{item.item.value}}",t.appendChild(i),n.appendChild(t),n},i.prototype.createDefaultCell=function(n,t){var i=document.createElement("span"),r="{{item.item.".concat(t).concat("}}");i.innerHTML=r;n.appendChild(i)},i.prototype.createDefaultMobileTemplate=function(n,t){for(var u,f,r,e,i=0;i<t.columns.length;i++)t.columns[i].device.indexOf("mobile")!=-1&&(u=document.createElement("div"),f=document.createElement("span"),f.innerHTML=t.columns[i].member!=null?t.columns[i].member:t.columns[i].sortMemberPath!=null?t.columns[i].sortMemberPath:t.columns[i].groupMemberPath!=null?t.columns[i].groupMemberPath:"",r=document.createElement("span"),t.columns[i].member!=null?(e=document.createElement("span"),r.innerHTML=": {{item.item."+t.columns[i].member+"}}",r.appendChild(e)):r.innerHTML=": ",u.appendChild(f),u.appendChild(r),n.appendChild(u));return n},i.prototype.buildDefaultFilteringPopUp=function(t,i){var s=document.createElement("div"),h=document.createElement("span"),f,r,u,e,o;h.innerHTML="{{path}}";s.appendChild(h);i.appendChild(s);f=document.createElement("select");r=document.createElement("option");r.value=0..toString();r.text="None";f.appendChild(r);r=document.createElement("option");r.value=1..toString();r.text="Equals";f.appendChild(r);r=document.createElement("option");r.value=2..toString();r.text="Not equals";f.appendChild(r);i.appendChild(f);f.selectedIndex=1;u=document.createElement("input");u.type="text";u.className="tgrid-filter-input-text";u.setAttribute("value","");u.style.width="150px";i.appendChild(u);i.innerHTML+="<br>";e=document.createElement("div");e.className="tgrid-filter-popup-button";e.style.width="70px";e.onclick=function(t){var i=n.TGrid.Grid.getGridObject(t.target);i.filterPopupViewModel.onApply()};e.innerHTML="OK";i.appendChild(e);o=document.createElement("div");o.className="tgrid-filter-popup-button";o.style.width="70px";o.onclick=function(t){var i=n.TGrid.Grid.getGridObject(t.target);i.filterPopupViewModel.onClose();u.setAttribute("value","")};o.innerHTML="Cancel";i.appendChild(o)},i.prototype.appendIndentRow=function(n,t){for(var i,u,r=0;r<t;r++)i=document.createElement("td"),i.className="tgrid-table-indent-cell",i.setAttribute("ng-hide","item.isGroupHeader"),u=document.createElement("div"),u.className="tgrid-table-indent-cell-content",i.appendChild(u),n.appendChild(i)},i.prototype.appendIndentGroupHeader=function(n,t){for(var i,u,r=0;r<t;r++)i=document.createElement("td"),i.className="tgrid-table-indent-cell",i.setAttribute("ng-hide","!item.isGroupHeader || ".concat(r.toString()).concat(" >= item.item.level")),u=document.createElement("div"),u.className="tgrid-table-indent-cell-content",i.appendChild(u),n.appendChild(i)},i.moduleFooterCounter=0,i}(n.TGrid.BaseHtmlProvider);t.AngularHtmlProvider=i})(n.TGrid||(n.TGrid={}));var t=n.TGrid})(TesserisPro||(TesserisPro={})),function(n){(function(n){function t(){var n={};return n.restrict="E",n.link=function(n,t,i){var r=new TesserisPro.TGrid.Options(t[0],1),u,e,s,h,f,c,o;if(r.parentViewModel=n,i.groupby!=undefined&&(u=i.groupby.split(" "),u.length>0&&u[0]!=""))for(e=0;e<u.length;e++)r.groupBySortDescriptors.push(new TesserisPro.TGrid.SortDescriptor(u[e],!0));r.enablePaging=i.enablepaging==undefined?!1:i.enablepaging=="true"?!0:!1;s=i.pagesize;s!=undefined&&(r.pageSize=parseInt(s),this.isEnablePaging&&(r.pageSize=isNaN(this.pageSize)||this.pageSize<1?10:this.pageSize));h=i.pageslide;h!=undefined&&(r.pageSlide=parseInt(h),this.isEnablePaging&&(r.pageSlide=isNaN(this.pageSlide)||this.pageSlide<1?1:this.pageSlide));f=i.selectionmode;f=="multi"&&(r.selectionMode=2);(f==undefined||f=="single")&&(r.selectionMode=1);f=="none"&&(r.selectionMode=0);r.enableVirtualScroll=i.enablevirtualscroll==undefined?!1:i.enablevirtualscroll=="true"?!0:!1;r.enableCollapsing=i.enablecollapsing==undefined?!1:i.enablecollapsing=="true"?!0:!1;r.enableSorting=i.enablesorting==undefined?!1:i.enablesorting=="true"?!0:!1;r.enableGrouping=i.enablegrouping==undefined?!1:i.enablegrouping=="true"?!0:!1;r.openDetailsOnSelection=i.showdetailsonselection==undefined?!1:i.showdetailsonselection=="true"?!0:!1;r.enableFiltering=i.enablefiltering==undefined?!1:i.enablefiltering=="true"?!0:!1;r.rowClick=i.rowclick==undefined||i.rowclick==null?null:i.rowclick;r.captureScroll=i.capturescroll==undefined?!0:i.capturescroll=="false"?!1:!0;c=new TesserisPro.TGrid.Grid(t[0],r,n[i.provider]);i.options!=undefined&&(r.apply=function(){c.afterOptionsChange()},n[i.options]=r);o=i.ready;o!=undefined&&typeof n[o]=="function"&&n[o](r)},n}function i(){}n.Directive=t;n.registerTGrid=i})(n.Angular||(n.Angular={}));var t=n.Angular}(TGrid||(TGrid={})),function(n){(function(n){var t=function(){function n(n){this.totalCount=0;this.selectedItem=null;this.currentPage=1;this.totalPages=1;this.grid=n}return n.prototype.setScope=function(n){var t=this;this.$scope=n;this.$scope.totalCount=this.totalCount;this.$scope.selectedItem=this.selectedItem;this.$scope.currentPage=this.currentPage;this.$scope.totalPages=this.totalPages;this.$scope.grid=this.grid;this.$scope.changePage=function(n){return t.changePage(n)};this.$scope.goToPreviousPagesBlock=function(){return t.goToPreviousPagesBlock()};this.$scope.goToNextPagesBlock=function(){return t.goToNextPagesBlock()};this.$scope.goToFirstPage=function(){return t.goToFirstPage()};this.$scope.goToLastPage=function(){return t.goToLastPage()}},n.prototype.setTotalCount=function(n){var t=this,i;this.totalCount=Math.floor(n);this.$scope!=null&&(this.$scope.totalCount=Math.floor(n),i=this,setTimeout(function(){return t.$scope.$apply()},1))},n.prototype.setSelectedItem=function(n){var t=this;this.selectedItem=n;this.$scope!=null&&(this.$scope.selectedItem=n,setTimeout(function(){return t.$scope.$apply()},1))},n.prototype.setCurrentPage=function(n){var t=this,i;this.currentPage=Math.floor(n);this.$scope!=null&&(this.$scope.currentPage=Math.floor(n),i=this,setTimeout(function(){return t.$scope.$apply()},1))},n.prototype.setTotalPages=function(n){var t=this,i;this.totalPages=Math.floor(n);this.$scope!=null&&(this.$scope.totalPages=Math.floor(n),i=this,setTimeout(function(){return t.$scope.$apply()},1))},n.prototype.changePage=function(n){var t=parseInt(n);if(!isNaN(t)){if(this.$scope.totalPages!=undefined&&this.$scope.totalPages!=null&&this.$scope.totalPages<n){this.grid.selectPage(this.$scope.totalPages-1);return}t<1?this.grid.selectPage(0):this.grid.selectPage(t-1)}},n.prototype.apply=function(){var n=this;setTimeout(function(){return n.$scope.$apply()},1)},n.prototype.goToPreviousPagesBlock=function(){var n=this.$scope.currentPage-this.grid.options.pageSlide-1;n>0&&n!=null&&n!=undefined?this.grid.selectPage(n):this.grid.selectPage(0)},n.prototype.goToNextPagesBlock=function(){var n=this.$scope.currentPage+this.grid.options.pageSlide-1;n<this.$scope.totalPages&&n!=null&&n!=undefined?this.grid.selectPage(n):this.grid.selectPage(this.$scope.totalPages-1)},n.prototype.goToFirstPage=function(){this.grid.selectPage(0)},n.prototype.goToLastPage=function(){this.grid.selectPage(this.$scope.totalPages-1)},n}();n.AngularFooterViewModel=t})(n.TGrid||(n.TGrid={}));var t=n.TGrid}(TesserisPro||(TesserisPro={})),function(n){(function(t){var i=function(){function t(n,t){this.container=n;this.onCloseFilterPopup=t}return t.prototype.setScope=function(n){var t=this;this.$scope=n;this.$scope.path=this.path;this.$scope.onApply=function(){return t.onApply()};this.$scope.onClear=function(){return t.onClear()};this.$scope.onClose=function(){return t.onClose()}},t.prototype.onCloseFilterPopup=function(){},t.prototype.onApply=function(){this.condition=this.container.getElementsByTagName("select")[0].selectedIndex;var t=n.TGrid.Grid.getGridObject(this.container);t.options.filterDescriptor.removeChildByPath(this.$scope.path);this.condition!=0&&(this.value=this.container.getElementsByTagName("input")[0].value,t.options.filterDescriptor.addChild(new n.TGrid.FilterDescriptor(this.$scope.path,this.value,this.condition)));t.applyFilters();hideElement(this.container);this.onCloseFilterPopup()},t.prototype.onClear=function(){var t=n.TGrid.Grid.getGridObject(this.container);t.options.filterDescriptor.removeChildByPath(this.$scope.path);t.applyFilters();hideElement(this.container);this.onCloseFilterPopup()},t.prototype.onClose=function(){hideElement(this.container);this.onCloseFilterPopup()},t.prototype.onOpen=function(n,t){this.columnInfo=t;this.$scope.path=t.filterMemberPath;for(var i=0;i<n.filterDescriptor.children.length;i++)if(n.filterDescriptor.children[i].path==t.filterMemberPath){this.container.getElementsByTagName("input")[0].value=n.filterDescriptor.children[i].value;this.container.getElementsByTagName("select")[0].selectedIndex=n.filterDescriptor.children[i].condition;this.$scope.$apply();return}this.container.getElementsByTagName("input")[0].value="";this.container.getElementsByTagName("select")[0].selectedIndex=0;this.$scope.$apply()},t.prototype.getColumnInfo=function(){return this.columnInfo},t}();t.AngularFilterPopupViewModel=i})(n.TGrid||(n.TGrid={}));var t=n.TGrid}(TesserisPro||(TesserisPro={}));__extends=this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);r.prototype=t.prototype;n.prototype=new r},function(n){(function(t){var i=function(n){function t(t,i,r,u){n.call(this,t,i,r,u)}return __extends(t,n),t}(n.TGrid.ItemViewModel);t.AngularItemViewModel=i})(n.TGrid||(n.TGrid={}));var t=n.TGrid}(TesserisPro||(TesserisPro={})),function(n){(function(t){var i=function(){function t(n,t,i){this.itemsModels=n;this.options=t;this.selected=i}return t.prototype.setScope=function(t){var r=this,i;for(this.$scope=t,this.$scope.options=this.options,this.$scope.items=[],i=0;i<this.itemsModels.length;i++)this.$scope.items[i]=new n.TGrid.AngularItemViewModel(this.itemsModels[i].model,this.itemsModels[i].item,this.itemsModels[i].grid,this.itemsModels[i].isGroupHeader),this.$scope.items[i].originalModel=this.itemsModels[i],this.$scope.items[i].colspan=this.options.columns.length+1+this.options.groupBySortDescriptors.length-this.itemsModels[i].item.level,this.$scope.items[i].detailsColspan=this.options.hasAnyNotSizedColumn?this.options.columns.length:this.options.columns.length+1,this.$scope.items[i].isSelected=this.options.isSelected(this.itemsModels[i].item),this.$scope.items[i].showDetail=!1,this.$scope.items[i].showDetailsFor=new n.TGrid.ShowDetail,this.$scope.options.showDetailFor.item==this.$scope.items[i].item&&(this.$scope.items[i].showDetail=!0),this.$scope.items[i].toggleGroupCollapsing=function(n,t){t.item.collapse?(t.grid.removeCollapsedFilters(t.item.filterDescriptor),t.item.collapse=!1):(t.grid.setCollapsedFilters(t.item.filterDescriptor),t.item.collapse=!0)},this.$scope.items[i].toggleDetailForCell=function(n,t){t.toggleDetailsForCell(n)},this.$scope.items[i].openDetailForCell=function(n,t){t.openDetailsForCell(n)},this.$scope.items[i].closeDetailForCell=function(n,t){t.closeDetailsForCell(n)},this.$scope.items[i].select=function(n,t){r.selected(t,n.ctrlKey)}},t.prototype.setItemSelection=function(n,t,i){for(var u=this,r=0;r<this.itemsModels.length;r++)this.$scope.items[r].showDetail=!1,this.itemsModels[r].item==n&&(this.$scope.items[r].isSelected=t,i&&(this.$scope.items[r].showDetail=!0),this.$scope.options.showDetailFor=this.options.showDetailFor,setTimeout(function(){u.$scope.$apply()},10))},t}();t.AngularItemsViewModel=i})(n.TGrid||(n.TGrid={}));var t=n.TGrid}(TesserisPro||(TesserisPro={})),function(){"use strict";angular.module("TGrid",[]).directive("tGrid",TGrid.Angular.Directive)}()