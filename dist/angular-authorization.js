angular.module("authorization",["ui.router"]).constant("_",window._).run(function(t,e,a,i){e.$on("$stateChangeSuccess",function(e,o,r,d,n){i.authorized||(!i.memorizedState||t.has(d,"data.redirectTo")&&o.name===d.data.redirectTo||i.clear(),t.has(o,"data.authorization")&&t.has(o,"data.redirectTo")&&(t.has(o,"data.memory")&&o.data.memory&&(i.memorizedState=o.name),a.go(o.data.redirectTo)))})}).service("Authorization",function(t){this.authorized=!1,this.memorizedState=null;var e=function(){this.authorized=!1,this.memorizedState=null},a=function(e){this.authorized=!0;var a=this.memorizedState?this.memorizedState:e;t.go(a)};return{authorized:this.authorized,memorizedState:this.memorizedState,clear:e,go:a}});