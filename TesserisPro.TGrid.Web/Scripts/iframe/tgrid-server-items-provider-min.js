var TesserisPro;(function(n){(function(n){var t=function(){function n(n,t,i){this.urlGetItems=n;this.urlGetTotalNumber=t;this.path=i}return n.prototype.getItems=function(n,t,i,r,u,f){var e=new XMLHttpRequest;e.onreadystatechange=function(){e.readyState==4&&e.status==200&&(this.items=JSON.parse(e.responseText),f(this.items,n,t))};e.open("POST",this.urlGetItems.toString(),!0);e.setRequestHeader("Content-type","application/json");e.setRequestHeader("Accept","application/json");e.send(JSON.stringify({firstItem:n,itemsNumber:t,sortDescriptors:i,filterDescriptors:r,collapsedFilterDescriptors:u}))},n.prototype.getTotalItemsCount=function(n,t){var i=new XMLHttpRequest;i.onreadystatechange=function(){if(i.readyState==4&&i.status==200){var n=parseInt(i.response);t(n)}};i.open("POST",this.urlGetTotalNumber.toString(),!0);i.setRequestHeader("Content-type","application/json");i.setRequestHeader("Accept","application/json");i.send(JSON.stringify(n))},n}();n.ServerItemsProvider=t})(n.TGrid||(n.TGrid={}));var t=n.TGrid})(TesserisPro||(TesserisPro={}))