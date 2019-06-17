define(function(require){
    /* 接口管理 */
    var BasePage = require('core/BasePage');
    var o = new BasePage({
        name : '接口管理',
        id   : 'api',
    });

    // 页面入口
	o.execute = function(domid,query) {
        require('./grid').init(domid);
	};

    return o;
});
