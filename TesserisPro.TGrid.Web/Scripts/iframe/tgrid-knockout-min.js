var __extends=this.__extends||function(n,t){function r(){this.constructor=n}for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);r.prototype=t.prototype;n.prototype=new r},TGridBindingHandler,TesserisPro;(function(n){(function(t){var i=function(t){function i(){t.apply(this,arguments)}return __extends(i,t),i.prototype.getTableElement=function(){var n=document.createElement("table");return n.className="tgrid-table",n},i.prototype.getElementsSize=function(n,t){for(var r,u,f=0,e=n.children,i=0;i<e.length;i++)r=e.item(i),u=ko.contextFor(r).$root,u!=null&&(t==null||t.indexOf(u)>0)&&(f+=r.offsetHeight);return f},i.prototype.getFirstVisibleItem=function(n,t,i){for(var f,r,e=0,o=n.children,u=0;u<o.length;u++)if(f=o.item(u),r=ko.contextFor(f).$root,r!=null&&t.indexOf(r)>=0&&(e+=f.offsetHeight),e>i)return r;return null},i.prototype.getFooterViewModel=function(t){return new n.TGrid.KnockoutFooterViewModel(0,0,0,0,t)},i.prototype.getFilterPopupViewModel=function(t){return new n.TGrid.KnockoutFilterPopupViewModel(t,this.onCloseFilterPopup)},i.prototype.updateTableHeadElement=function(t,i,r,u,f){var p,s,v,e,o,l,h,c,w,a,y;if(t.columns.length<=0&&(p=n.TGrid.Grid.getGridObject(i),p.setColumnsFromItemsProvider()),this.updateGroupByPanel(t,r),s=document.createElement("tr"),this.appendIndent(s,t.columns.length,!0),this.showNeededIndents(s,t.groupBySortDescriptors.length,n.TGrid.Grid.getGridObject(i)),v=!1,t.columns.length>0)for(e=0;e<t.columns.length;e++)t.columns[e].device.indexOf("desktop")!=-1&&(o=document.createElement("th"),o.className="tgrid-header-cell",o.draggable=!1,l=document.createElement("div"),l.className="tgrid-header-cell-container",h=document.createElement("div"),h.style.overflow="hidden",c=document.createElement("div"),h.className="tgrid-header-cell-content",c.className="tgrid-header-cell-buttons",l.appendChild(h),l.appendChild(c),o.appendChild(l),t.columns[e].notSized?(t.columns[e].resizable=!1,v=!0):o.style.width=t.columns[e].width.toString()+"px",t.columns[e].header!=null?t.columns[e].header.applyTemplate(h):(w=t.columns[e].member!=null?t.columns[e].member:"",this.buildDefaultHeader(h,w)),t.enableSorting&&(function(i){o.onclick=function(r){return n.TGrid.Grid.getGridObject(r.target).sortBy(t.columns[i].sortMemberPath)}}(e),t.sortDescriptor.path==t.columns[e].sortMemberPath&&t.columns[e].sortMemberPath!=null&&this.addArrows(c,t,e)),this.addFilterButton(t,i,u,c,e),t.columns[e].resizable&&(a=document.createElement("div"),a.className="tgrid-header-column-resize",a.onclick=function(n){return n.stopImmediatePropagation()},function(n,i,r){var e=null,u=0;r.onmousedown=function(i){i.stopImmediatePropagation();u=i.screenX;e=document.onmousemove;document.onmousemove=function(i){u!=0&&(t.columns[n].width=(parseInt(t.columns[n].width)+i.screenX-u).toString(),u=i.screenX,f(t.columns[n]))}};document.onmouseup=function(){document.onmousemove=e;u=0}}(e,o,a),c.appendChild(a)),v&&(i.parentElement.style.tableLayout="fixed"),s.appendChild(o));y=document.createElement("th");addClass(y,"tgrid-placeholder");v&&(y.style.width="12px");s.appendChild(y);i.innerHTML="";i.appendChild(s);ko.applyBindings(t.parentViewModel,s)},i.prototype.updateTableBodyElement=function(n,t,i,r){for(var u=0;u<i.length;u++)this.appendTableElement(n,t,i[u],0,r);return addClass(t,"desktop"),t},i.prototype.updateTableDetailRow=function(n,t,i,r){var e=t.getElementsByClassName("tgrid-details"),u,f,o,s;for(e.length>0&&e[0].parentNode.removeChild(e[0]),f=0;f<t.children.length;f++)if(ko.contextFor(t.children.item(f)).$data.item==i){u=t.children.item(f);break}u!=null&&(n.isSelected(i)?addClass(u,"selected"):removeClass(u,"selected"),r&&(o=this.getActualDetailsTemplate(n),o!=null&&(s=this.buildDetailsRow(n,o),insertAfter(u,s),ko.applyBindings(n.showDetailFor,s))))},i.prototype.updateTableFooterElement=function(n,t,i,r){if(n.tableFooterTemplate==null&&n.enablePaging)this.buildDefaultTableFooterElement(n,t,i);else if(n.tableFooterTemplate!=null&&!t.hasChildNodes()){var u=document.createElement("div");n.tableFooterTemplate.applyTemplate(u);ko.applyBindings(r,u);t.appendChild(u)}},i.prototype.updateFilteringPopUp=function(n,t,i){if(n.filterPopup==null)this.buildDefaultFilteringPopUp(n,t);else{var r=document.createElement("div");r.className="tgrid-filter-popup-container";n.filterPopup.applyTemplate(r);t.innerHTML="";t.appendChild(r)}ko.applyBindings(i,t)},i.prototype.appendTableElement=function(n,t,i,r,u){var f,e;i.isGroupHeader?(f=this.buildGroupHeaderRow(n,i.item),t.appendChild(f),ko.applyBindings(i,f)):(e=this.buildRowElement(n,i,t,u),t.appendChild(e),ko.applyBindings(i,e))},i.prototype.buildRowElement=function(n,t,i,r){var f=document.createElement("tr"),o,u,s,e,h;for(addClass(f,"tgrid-table-body-row"),n.isSelected(t.item)&&addClass(f,"selected"),this.appendIndent(f,n.groupBySortDescriptors.length,!1),o=!1,u=0;u<n.columns.length;u++)n.columns[u].device.indexOf("desktop")!=-1&&(n.columns[u].notSized&&(o=!0),s=document.createElement("td"),e=document.createElement("div"),e.className="tgrid-cell-content",e.style.overflow="hidden",s.appendChild(e),n.columns[u].cell!=null?n.columns[u].cell.applyTemplate(e):n.columns[u].member!=null&&this.createDefaultCell(e,n.columns[u].member),f.appendChild(s));return o?(i.parentElement.style.tableLayout="fixed",i.parentElement.parentElement.style.overflowY="scroll"):(h=document.createElement("td"),addClass(h,"tgrid-placeholder"),f.appendChild(h)),function(t){f.onclick=function(i){if(n.selectionMode!=0){var u=!1;n.shouldAddDetailsOnSelection==t.item&&(u=!0);r(t,i.ctrlKey,u)}}}(t),f},i.prototype.buildDetailsRow=function(n,t){var i=document.createElement("tr"),r=document.createElement("td");return this.appendIndent(i,n.groupBySortDescriptors.length,!1),addClass(i,"tgrid-details"),r.setAttribute("colspan",(n.columns.length+1).toString()),t.applyTemplate(r),i.appendChild(r),i},i.prototype.buildGroupHeaderRow=function(t,i){var u=document.createElement("tr"),r=document.createElement("td"),f;return this.appendIndent(u,i.level,!1),f=t.columns.length+1+t.groupBySortDescriptors.length-i.level,r.setAttribute("colspan",f.toString()),addClass(r,"tgrid-table-group-header"),addClass(u,"tgrid-table-group-header"),t.enableCollapsing&&(addClass(u,"collapsing"),r.onclick=i.collapse?function(t){n.TGrid.Grid.getGridObject(t.target).removeCollapsedFilters(i.filterDescriptor)}:function(t){n.TGrid.Grid.getGridObject(t.target).setCollapsedFilters(i.filterDescriptor)}),t.groupHeaderTemplate!=null?t.groupHeaderTemplate.applyTemplate(r):this.createDefaultGroupHeader(r),u.appendChild(r),u},i.prototype.addArrows=function(n,t){var i,r;return t.sortDescriptor.asc&&(i=document.createElement("div"),addClass(i,"tgrid-arrow-up"),n.appendChild(i)),t.sortDescriptor.asc||(r=document.createElement("div"),addClass(r,"tgrid-arrow-down"),n.appendChild(r)),n},i.prototype.removeArrows=function(n){for(var i=n.getElementsByClassName("tgrid-arrow-up"),t=0;t<i.length;t++)i[t].parentNode.removeChild(i[t]),t--;for(i=n.getElementsByClassName("tgrid-arrow-down"),t=0;t<i.length;t++)i[t].parentNode.removeChild(i[t]),t--},i.prototype.removeFilterButtons=function(n){for(var i=n.getElementsByClassName("tgrid-filter-button"),t=0;t<i.length;t++)i[t].parentNode.removeChild(i[t]),t--;for(i=n.getElementsByClassName("tgrid-filter-button-active"),t=0;t<i.length;t++)i[t].parentNode.removeChild(i[t]),t--},i.prototype.updateMobileItemsList=function(n,t,i,r){for(var u,f=0;f<i.length;f++)this.appendMobileElement(n,t,i[f],0,r);u=t.getAttribute("class");u==null||u==undefined||u==""?u="mobile":u.indexOf("mobile")==-1&&(u+=" mobile");t.setAttribute("class",u)},i.prototype.updateMobileDetailRow=function(n,t,i,r){var e=t.getElementsByClassName("tgrid-mobile-details"),u,f,o,s;for(e.length>0&&e[0].parentNode.removeChild(e[0]),f=0;f<t.children.length;f++)if(ko.contextFor(t.children.item(f)).$data.item==i){u=t.children.item(f);break}u!=null&&(n.isSelected(i)?addClass(u,"selected"):removeClass(u,"selected"),r&&(o=this.getActualDetailsTemplate(n),o!=null&&(s=this.buildMobileDetailsRow(n,o),insertAfter(u,s),ko.applyBindings(n.showDetailFor,s))))},i.prototype.appendMobileElement=function(n,t,i,r,u){var f,e;i.isGroupHeader?(f=this.buildGroupMobileHeaderRow(n,i.item),t.appendChild(f),ko.applyBindings(i,f)):(e=this.buildMobileRowElement(n,i,t,u),t.appendChild(e),ko.applyBindings(i,e))},i.prototype.buildMobileRowElement=function(n,t,i,r){var u=document.createElement("div"),e,f;for(addClass(u,"tgrid-mobile-row"),n.isSelected(t.item)&&addClass(u,"selected"),e=0;e<n.groupBySortDescriptors.length;e++)u.innerHTML+="<div class='tgrid-mobile-group-indent-div'><\/div>";return f=document.createElement("div"),addClass(f,"tgrid-mobile-div"),n.mobileTemplateHtml!=null?n.mobileTemplateHtml.applyTemplate(f):f=this.createDefaultMobileTemplate(f,n),u.appendChild(f),function(t){u.onclick=function(u){if(n.selectionMode!=0){var f=i;r(t,u.ctrlKey)}}}(t),u},i.prototype.buildMobileDetailsRow=function(n,t){var i=document.createElement("div");return addClass(i,"tgrid-mobile-details"),t.applyTemplate(i),i},i.prototype.createDefaultCell=function(n,t){var i=document.createElement("span"),r="text: item.".concat(t);i.setAttribute("data-bind",r);n.appendChild(i)},i.prototype.createDefaultGroupHeader=function(n){var t=document.createElement("div"),i=document.createElement("span");i.setAttribute("data-bind","text: item.value");t.appendChild(i);n.appendChild(t)},i.prototype.createDefaultMobileTemplate=function(n,t){for(var u,f,r,e,i=0;i<t.columns.length;i++)t.columns[i].device.indexOf("mobile")!=-1&&(u=document.createElement("div"),f=document.createElement("span"),f.innerHTML=t.columns[i].member!=null?t.columns[i].member:t.columns[i].sortMemberPath!=null?t.columns[i].sortMemberPath:t.columns[i].groupMemberPath!=null?t.columns[i].groupMemberPath:"",r=document.createElement("span"),t.columns[i].member!=null?(e=document.createElement("span"),e.setAttribute("data-bind","text:item.".concat(t.columns[i].member)),r.innerHTML=": ",r.appendChild(e)):r.innerHTML=": ",u.appendChild(f),u.appendChild(r),n.appendChild(u));return n},i.prototype.bindData=function(n,t){var i=ko.contextFor(n.target);ko.applyBindings(i,t)},i.prototype.buildDefaultFilteringPopUp=function(t,i){var s=document.createElement("div"),h=document.createElement("span"),f,r,u,e,o;h.setAttribute("data-bind","text:path");s.appendChild(h);i.appendChild(s);f=document.createElement("select");r=document.createElement("option");r.value=0..toString();r.text="None";f.appendChild(r);r=document.createElement("option");r.value=1..toString();r.text="Equals";f.appendChild(r);r=document.createElement("option");r.value=2..toString();r.text="Not equals";f.appendChild(r);i.appendChild(f);f.selectedIndex=1;u=document.createElement("input");u.type="text";u.className="tgrid-filter-input-text";u.setAttribute("value","");u.style.width="150px";i.appendChild(u);i.innerHTML+="<br>";e=document.createElement("div");e.className="tgrid-filter-popup-button";e.style.width="70px";e.onclick=function(t){var i=n.TGrid.Grid.getGridObject(t.target);i.filterPopupViewModel.onApply()};e.innerHTML="OK";i.appendChild(e);o=document.createElement("div");o.className="tgrid-filter-popup-button";o.style.width="70px";o.onclick=function(t){var i=n.TGrid.Grid.getGridObject(t.target);i.filterPopupViewModel.onClose();u.setAttribute("value","")};o.innerHTML="Cancel";i.appendChild(o)},i}(n.TGrid.BaseHtmlProvider);t.KnockoutHtmlProvider=i})(n.TGrid||(n.TGrid={}));var t=n.TGrid})(TesserisPro||(TesserisPro={}));TGridBindingHandler=function(){function n(){}return n.prototype.init=function(t,i,r,u,f){var e=n.getOptions(t,i,r,u,f);setTimeout(function(){var n=new TesserisPro.TGrid.Grid(t,e,i().provider);i().options!=undefined&&(e.apply=function(){n.afterOptionsChange()},i().options(e))},1)},n.prototype.update=function(t,i,r,u,f){var e=TesserisPro.TGrid.Grid.getGridObject(t),o;e!=null&&(o=n.getOptions(t,i,r,u,f),e.options=o,e.updateBody())},n.getOptions=function(n,t,i,r){var u=new TesserisPro.TGrid.Options(n,0),f,e,o;if(u.parentViewModel=r,f="",f=isObservable(t().groupBy)?t().groupBy():t().groupBy,f!=undefined)for(e=0;e<f.length;e++)u.groupBySortDescriptors.push(new TesserisPro.TGrid.SortDescriptor(f[e],!0));return u.enablePaging=isObservable(t().enablePaging)?typeof t().enablePaging()=="boolean"?t().enablePaging():t().enablePaging=="true"?!0:!1:typeof t().enablePaging=="boolean"?t().enablePaging:t().enablePaging=="true"?!0:!1,u.pageSize=isObservable(t().pageSize)?t().pageSize():t().pageSize,u.pageSize=isNaN(u.pageSize)||u.pageSize<1?10:u.pageSize,u.selectionMode=isObservable(t().selectMode)?t().selectMode():t().selectMode,isNaN(u.selectionMode)&&(u.selectionMode=1),u.enableVirtualScroll=isObservable(t().enableVirtualScroll)?typeof t().enableVirtualScroll()=="boolean"?t().enableVirtualScroll():t().enableVirtualScroll=="true"?!0:!1:typeof t().enableVirtualScroll=="boolean"?t().enableVirtualScroll:t().enableVirtualScroll=="true"?!0:!1,u.enableCollapsing=isObservable(t().enableCollapsing)?typeof t().enableCollapsing()=="boolean"?t().enableCollapsing():t().enableCollapsing=="true"?!0:!1:typeof t().enableCollapsing=="boolean"?t().enableCollapsing:t().enableCollapsing=="true"?!0:!1,u.openDetailsOnSelection=isObservable(t().showDetailsOnSelection)?typeof t().showDetailsOnSelection()=="boolean"?t().showDetailsOnSelection():t().showDetailsOnSelection=="true"?!0:!1:typeof t().showDetailsOnSelection=="boolean"?t().showDetailsOnSelection:t().showDetailsOnSelection=="true"?!0:!1,o=isObservable(t().selectionMode)?t().selectionMode():t().selectionMode,o=="multi"&&(u.selectionMode=2),o=="single"&&(u.selectionMode=1),o=="none"&&(u.selectionMode=0),u.enableSorting=isObservable(t().enableSorting)?typeof t().enableSorting()=="boolean"?t().enableSorting():t().enableSorting=="true"?!0:!1:typeof t().enableSorting=="boolean"?t().enableSorting:t().enableSorting=="true"?!0:!1,u.enableGrouping=isObservable(t().enableGrouping)?typeof t().enableGrouping()=="boolean"?t().enableGrouping():t().enableGrouping=="true"?!0:!1:typeof t().enableGrouping=="boolean"?t().enableGrouping:t().enableGrouping=="true"?!0:!1,u.enableFiltering=isObservable(t().enableFiltering)?typeof t().enableFiltering()=="boolean"?t().enableFiltering():t().enableFiltering=="true"?!0:!1:typeof t().enableFiltering=="boolean"?t().enableFiltering:t().enableFiltering=="true"?!0:!1,u.pageSlide=isObservable(t().pageSlide)?t().pageSlide():t().pageSlide,u.pageSlide=isNaN(u.pageSlide)||u.pageSlide<1?1:u.pageSlide,u},n}();ko.bindingHandlers.tgrid=new TGridBindingHandler,function(n){(function(n){var t=function(){function n(n,t,i,r,u){this.totalCount=ko.observable(n);this.selectedItem=ko.observable(t);this.currentPage=ko.observable(i);this.totalPages=ko.observable(r);this.grid=u}return n.prototype.setTotalCount=function(n){this.totalCount(Math.floor(n))},n.prototype.setSelectedItem=function(n){this.selectedItem(n)},n.prototype.setCurrentPage=function(n){this.currentPage(Math.floor(n))},n.prototype.setTotalPages=function(n){this.totalPages(Math.floor(n))},n.prototype.changePage=function(n){var t=this;(function(){var i=parseInt(n);if(!isNaN(i)){if(t.totalPages()!=undefined&&t.totalPages()!=null&&i>t.totalPages()){t.grid.selectPage(t.totalPages()-1);return}i<1?t.grid.selectPage(0):t.grid.selectPage(i-1)}})()},n.prototype.goToPreviousPagesBlock=function(){var n=this.currentPage()-this.grid.options.pageSlide-1;n>0&&n!=null&&n!=undefined?this.grid.selectPage(n):this.grid.selectPage(0)},n.prototype.goToNextPagesBlock=function(){var n=this.currentPage()+this.grid.options.pageSlide-1;n<this.totalPages()&&n!=null&&n!=undefined?this.grid.selectPage(n):this.grid.selectPage(this.totalPages()-1)},n.prototype.goToFirstPage=function(){this.grid.selectPage(0)},n.prototype.goToLastPage=function(){this.grid.selectPage(this.totalPages()-1)},n}();n.KnockoutFooterViewModel=t})(n.TGrid||(n.TGrid={}));var t=n.TGrid}(TesserisPro||(TesserisPro={})),function(n){(function(t){var i=function(){function t(n,t){this.container=n;this.onCloseFilterPopup=t;this.path=ko.observable("")}return t.prototype.onCloseFilterPopup=function(){},t.prototype.onApply=function(){this.condition=this.container.getElementsByTagName("select")[0].selectedIndex;var t=n.TGrid.Grid.getGridObject(this.container);t.options.filterDescriptor.removeChildByPath(this.path());this.condition!=0&&(this.value=this.container.getElementsByTagName("input")[0].value,t.options.filterDescriptor.addChild(new n.TGrid.FilterDescriptor(this.path(),this.value,this.condition)));t.applyFilters();hideElement(this.container);this.onCloseFilterPopup()},t.prototype.onClear=function(){var t=n.TGrid.Grid.getGridObject(this.container);t.options.filterDescriptor.removeChildByPath(this.path());t.applyFilters();hideElement(this.container);this.onCloseFilterPopup()},t.prototype.onClose=function(){hideElement(this.container);this.onCloseFilterPopup()},t.prototype.onOpen=function(n,t){this.columnInfo=t;this.path(t.filterMemberPath);for(var i=0;i<n.filterDescriptor.children.length;i++)if(n.filterDescriptor.children[i].path==t.filterMemberPath){this.container.getElementsByTagName("input")[0].value=n.filterDescriptor.children[i].value;this.container.getElementsByTagName("select")[0].selectedIndex=n.filterDescriptor.children[i].condition;return}this.container.getElementsByTagName("input")[0].value="";this.container.getElementsByTagName("select")[0].selectedIndex=0},t.prototype.getColumnInfo=function(){return this.columnInfo},t}();t.KnockoutFilterPopupViewModel=i})(n.TGrid||(n.TGrid={}));var t=n.TGrid}(TesserisPro||(TesserisPro={}))