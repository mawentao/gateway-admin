define(function(require){
    /* 接口管理 */
    var BasePage = require('core/BasePage');
    var o = new BasePage({
		posarr: [
			{name:'网关应用',href:"#/app"},
			{name:'接口列表'}
		],
        name : '网关应用',
        id   : 'api'
    });

    // 页面入口
	o.execute = function(domid,query) {
		var appid = query.appid ? query.appid : 0;
		if (appid==0) {
			window.location="#/app";
			return;
		}
		var appInfo = require('model/gwapp').get(appid);

        require('./grid').init(domid,appInfo);
	};

    return o;
});
