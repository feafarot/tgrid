var TesserisPro;(function(n){(function(n){var t=function(){function n(n){this.items=n}return n.prototype.getItems=function(n,t,i,r,u,f){var e=[],o;e=e.concat(this.items);this.sort(i);o=this;f(o.onFiltering(r,u).slice(n,n+t),n,t);this.items=[];this.items=this.items.concat(e)},n.prototype.getTotalItemsCount=function(n,t){t(this.onFiltering(n,null).length)},n.prototype.sort=function(n){if(n!=null&&n.length>0&&isNotNull(n[0].path)){var t=this;this.items.sort(function(i,r){return t.compareRecursive(i,r,n,0)})}},n.prototype.compareRecursive=function(n,t,i,r){return r!=i.length-1?getMemberValue(n,i[r].path)>getMemberValue(t,i[r].path)?this.sortingOrder(i[r]):getMemberValue(t,i[r].path)>getMemberValue(n,i[r].path)?this.sortingOrderDesc(i[r]):this.compareRecursive(n,t,i,r+1):getMemberValue(n,i[r].path)>getMemberValue(t,i[r].path)?this.sortingOrder(i[r]):this.sortingOrderDesc(i[r])},n.prototype.sortingOrder=function(n){return n.asc?1:-1},n.prototype.sortingOrderDesc=function(n){return n.asc?-1:1},n.prototype.onFiltering=function(n,t){var f,c,e,u,o,s,r,h,i;if((n==null||n.length==0)&&(t==null||t.length==0))return this.items;for(t==undefined&&(t=[]),f=[],c=0;c<t.length;c++)f.push(!1);for(e=[],u=0;u<this.items.length;u++){for(o=0,i=0;i<n.length;i++)this.filter(this.items[u],n[i])&&o++;for(s=!1,r=-1,i=0;i<t.length;i++)this.filter(this.items[u],t[i])&&(s=!0,r=i,i=t.length);if(o!=0||s){if(o==0&&s&&!f[r]){for(h={},h[t[r].path]=t[r].value,i=0;i<t[r].children.length;i++)h[t[r].children[i].path]=t[r].children[i].value;e.push(h);f[r]=!0}}else e.push(this.items[u])}return e},n.prototype.filter=function(n,t){var r,i;if(!this.isFiltering(n[t.path],t.value,t.condition)){if(t.children.length==0)return!0;for(r=0,i=0;i<t.children.length;i++)this.isFiltering(n[t.children[i].path],t.children[i].value,t.children[i].condition)||r++;if(r==t.children.length)return!0}return!1},n.prototype.isFiltering=function(n,t,i){switch(i){case 1:return n==t;case 2:return n!=t}return!1},n}();n.ArrayItemsProvider=t})(n.TGrid||(n.TGrid={}));var t=n.TGrid})(TesserisPro||(TesserisPro={}))