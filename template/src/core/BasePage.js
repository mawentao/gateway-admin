define(function(require){

// 页面基类
var BasePage=function(opt)
{
    this.id='index';
    this.name='首页';
    this.domid='';
    var passRoles = '';    //!< 准入角色列表(,分割)
    var noPosNav = false;  //!< 是否显示位置面包屑
    var posarr=null;
    if (opt) {
        if(opt.id) this.id=opt.id;
        if(opt.name) this.name=opt.name;
        if(opt.noPosNav) noPosNav=true;
        if(opt.posarr) posarr=opt.posarr;
        if(opt.passRoles) passRoles=opt.passRoles;
        this.domid = 'panel-'+this.id.replaceAll('/','-');
    }

    // 打开页面
    this.open=function(query,domid)
    {/*{{{*/
        //1. 选中菜单
        var navName = this.name;
        activeTopNav(navName); 

        //2. 初始化布局
        var panelId = this.domid;
        if (noPosNav) {
            //2-1. 无位置面包屑导航
            panelId = domid;
        } else {
            //2-2. 有位置面包屑导航
            var panelId = this.domid;
            if (!posarr) {
                posarr = [{name:navName,href:'#/'+this.id}];
            }
            ///////////////////////////////////////////
            // 处理变量
            var reg = new RegExp("{.*?}",'ig');
            for (var i=0;i<posarr.length;++i) {
                var im = posarr[i];
                if (reg.test(im.name)) {
                    var res = im.name.match(reg);
                    for (var k=0;k<res.length;++k) {
                        var key = res[k];
                        var n = key.length;
                        var id = key.substr(1,n-2);
                        im.name = im.name.replace(key,query[id]);
                    }
                }
            }
            ///////////////////////////////////////////
            var code = posnav.get(posarr)+'<div id="'+panelId+'" class="main-panel"></div>';
            jQuery('#'+domid).html(code);
        }
        
        //3. 执行页面
        textblock.loading('loading...',panelId);
        this.execute(panelId,query);
    };/*}}}*/

    // 页面入口(需要重写此函数)
    this.execute=function(domid,query) 
    {
    };

/*
    this.container;
    this.pageid = mwt.genId('page-');
    this.query = {};

    if (opt) {
        if(opt.container) this.container=opt.container;
        if(opt.pageid) this.pageid=opt.pageid;
        if(opt.query) this.query=opt.query;
    }
    this.init=function(style,clsname,renderfun){
        var domid = this.pageid;
        if (!mwt.$(domid)) {
            var s = style ? ' style="'+style+'"' : '';
            var c = clsname ? ' class="'+clsname+'"' : '';
            var code = '<div id="'+domid+'"'+c+s+'></div>';
            jQuery('#'+this.container).html(code);
            if (renderfun) renderfun(domid,this.query);
        }
        return domid;
    };

    // 格式化查询参数
    this.formatQuery=function(query) {
        for (var k in this.query) {
            if (isset(query[k])) this.query[k] = query[k];
        }
        return this.query;
    };

    // 跳转
    this.jump=function(urlbase) {
        var ps = [];
        for (var k in this.query) {
            ps.push(k+'='+this.query[k]);
        }
        if (!urlbase) urlbase = '#/order';
        window.location = urlbase+'~'+ps.join('&');
    };

    // 回退
    this.close=function() {
        jQuery('#'+this.pageid).hide();
        if (window.history.length>1) {
            window.history.go(-1);
        } else {
            window.location = '#/';
        }
    };
*/
};

return BasePage;

});
