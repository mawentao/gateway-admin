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
        var code = '<p style="font-size:17px;margin:20px 0 30px 0;text-align:center;">'+
                '欢迎登录'+setting.page_title+'<br><br>'+
                '<span style="font-size:13px;">请选择左侧菜单进行使用！</span>'+
            '</p>'+
            '<table class="infotb">'+
              '<tr><th colspan="15" class="partition">我的信息</th></tr>'+
              '<tr>'+
                '<td><label>username</label>'+dz.username+'</td>'+
                '<td><label>邮箱</label>'+dz.email+'</td>'+
              '</tr>'+
            '</table>';
        jQuery('#'+domid).html(code);
    };

    return o;
});
