/* jappengine.js, (c) 2016 mawentao */
/* 全局变量 */
var ajax,dict,posnav;
/* JappEngine */
define(function(require){
	ajax=require('core/ajax');			//!< ajax
    dict=require('common/dict');
    posnav=require('common/posnav');
    var urlmap=require('core/urlmap');

    var pages = [
        require('view/api/page'),   //!< 接口列表
        require('view/app/page'),   //!< 网关应用
        require('view/index/page')  //!< 默认首页
    ];

	var o={};
	o.start=function(){
		urlmap.start();
        for (var i=0;i<pages.length;++i) {
            var page = pages[i];
            urlmap.addmap("/"+page.id);
        }
	};
	return o;
});
