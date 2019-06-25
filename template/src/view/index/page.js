define(function(require){
    /* 首页 */
    var BasePage = require('core/BasePage');
    var o=new BasePage({
        noPosNav: true,
        name: '首页',
        id: 'index'
    });

    // 页面入口
    o.execute=function(domid,query) {
        activeTopNav("none");
		var db = setting.db_gateway;
        var code = '<p style="font-size:17px;margin:20px 0 30px 0;text-align:center;">'+
                '欢迎登录'+setting.page_title+'<br><br>'+
                '<span style="font-size:13px;">请选择左侧菜单进行使用！</span>'+
            '</p>'+
            '<table class="infotb">'+
              '<tr><th colspan="15" class="partition">系统配置</th></tr>'+
              '<tr>'+
                '<td><label>网关DB地址</label></td>'+
				'<td><span style="font-family:monospace;">mysql -h'+db.host+' -P'+db.port+' -D'+db.db+'</span>'+
				'</td>'+
              '</tr>'+
              '<tr>'+
                '<td width="120"><label>网关服务地址</label></td>'+
				'<td><a style="font-family:monospace;" href="'+setting.gateway_url+'" target="_blank" class="grida">'+
						setting.gateway_url+'</a>'+
					'<a href="'+setting.gateway_url+'/system/config" target="_blank" '+
						'style="margin-left:20px;" class="mwt-btn mwt-btn-primary mwt-btn-sm radius">'+
						'查看服务配置</a>'+
				'</td>'+
              '</tr>'+
            '</table>';
        jQuery('#'+domid).html(code);
    };

    return o;
});
