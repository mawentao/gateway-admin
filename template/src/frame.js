define(function(require){
    /**
     * 页面框架, 负责页面整体布局和导航菜单管理
     * 框架接口:
     *     init()                : 框架初始化
     **/
    var container = 'frame-body';
    var sideWidth = 180;
    var inited = false;
    var o={};

    // 初始化页面框架
    o.init=function() 
    {/*{{{*/
        if (inited) return;
        if (dz.embedded==1) {
            new mwt.FillLayout({
                render : 'frame',
                id     : container,
                style  : '',
                html   : ''
            }).init();
        } else {
            new mwt.BorderLayout({
                render : 'frame',
                items : [
                    {id:'frame-side',region:'west',width:sideWidth},
                    {id:'frame-center',region:'center'}
                ]
            }).init();
            new mwt.BorderLayout({
                render : 'frame-center',
                items : [
                    {id:'frame-header',region:'north',height:49},
                    {id:container,region:'center'}
                ]
            }).init();
            initSide();
            initTop();
        }
        inited = true;
    };/*}}}*/

    // 重置页面内容
    o.clear=function() 
    {/*{{{*/
        //1. 终止所有ajax请求
        ajax.abortAll();
        //2. 重置页面
        var code = '<div class="global-loading">'+
            '<i class="icon icon-loading fa fa-spin fa-2x"></i>'+
        '</div>';
        jQuery('#'+container).html(code);
    };/*}}}*/

    // 获取页面容器(DomID)
    o.getContainer=function()
    {/*{{{*/
        o.clear();
        return container;
    }/*}}}*/

    // 折叠侧边栏
    o.collapseSide=function()
    {/*{{{*/
        var jside = jQuery('#frame-side');
        var jcenter = jQuery('#frame-center');
        var width = jside.width();
        var bl = width<=0 ? sideWidth : 0;
        var sidePosition = jside.hasClass('mwt-layout-border-east') ? 'right' : 'left';
        if (sidePosition=='left') {
            jside.css({width:bl+'px'});
            jcenter.css({left:bl+'px'});
        } else {
            jside.css({width:bl+'px'});
            jcenter.css({right:bl+'px'});
        }
    }/*}}}*/
        
    // 初始化侧边栏
    function initSide()
    {/*{{{*/
        new mwt.BorderLayout({
            render : 'frame-side',
            items : [ 
                // logo区
                {id:'frame-logo',region:'north',height:48,
                 html:'<a class="logoa" href="#/">'+
                        '<label><img src="'+dz.siteurl+'/source/plugin/gwadmin/template/static/logo.png">'+
                            setting.page_title+'</label></a>'},
                // 导航菜单区
                {id:'frame-nav',region:'center'}
            ]
        }).init();
        initNav();
    }/*}}}*/

    // 初始化导航菜单
    function initNav()
    {/*{{{*/
        var ls = []; 
        if (nav && nav.length) {
            var smcls = setting.fold_navmenu==1 ? 'menu-close' : 'menu-open';
            for (var i=0;i<nav.length;++i) {
                var item = nav[i];
                var hassubmenu = (item.subitems && item.subitems.length>0);
                var href = hassubmenu ? 'javascript:;' : item.href;
                var cls = hassubmenu ? ' class="'+smcls+'"' : ''; 
                var icon = item.icon ? item.icon : 'fa fa-th-large';
                var liid = 'navitem-'+item.text;
                var target = item.newtab==1 ? ' target="_blank"' : '';
                var code = '<li'+cls+'>'+
                    '<a name="navitem" class="lm-menu" href="'+href+'" id="'+liid+'"'+target+'>'+
                    '<i class="'+icon+'"></i> '+item.text+'</a>';
                // 子菜单
                if (hassubmenu) {
                    code += "<ul class='submenu'>";
                    for (var k=0; k<item.subitems.length; ++k) {
                        var im = item.subitems[k];
                        var href = im.href;
                        var liid = 'navitem-'+im.text;
                        var icon = im.icon ? im.icon : 'fa fa-caret-right';
                        code += "<li><a name='navitem' class='lm-item' href='"+href+"' id='"+liid+"'>"+
                            '<i class="'+icon+'"></i>&nbsp;'+im.text+"</a></li>";
                    }   
                    code += "</ul>";
                }   
                code += "</li>";
                ls.push(code);
            }   
        }   
    ls.push('<li class="clearfix"></li>');
    var code = '<ul class="leftmenu">'+ls.join('')+'</ul>';
    jQuery('#frame-nav').html(code);
    //2. bunddle event
    jQuery(".lm-menu").unbind('click').click(function(){
        var child = jQuery(this).parent().children(".submenu");
        if (child) {
            var dsp = child.css("display");
            if (!dsp) {
                //alert(dsp);
            } else if ("none" == dsp) {
                jQuery(this).parent().removeClass("menu-close");
                jQuery(this).parent().addClass("menu-open");
            } else {
                jQuery(this).parent().removeClass("menu-open");
                jQuery(this).parent().addClass("menu-close");
            }
        }
    });    
    }/*}}}*/

    // 初始化顶部工具栏
    function initTop()
    {/*{{{*/
        new mwt.ToolBar({
            render : 'frame-header',
            items  : [ 
                {label:'<i class="icon icon-bar"></i>',cls:'mwt-btn-icon',handler:o.collapseSide},
                {label:'<i class="sicon-home"></i>',cls:'mwt-btn-icon',handler:function(){
                    window.location = "#/";
                }},
                {label:'<a href="'+dz.siteurl+'" target="_blank" class="mwt-btn-icon"><i class="sicon-compass"></i></a>',cls:'mwt-btn-icon'},
                '->',
/*                {label:'<i class="sicon-size-fullscreen"></i>',cls:'mwt-btn-icon',handler:function(){
                    var e=window.location.href;
                    var t=e.indexOf("?")<0?"?":"&";
                    e=e.replace("#/",t+"embedded=1#/");
                    window.location=e;
                }},
*/
                '<button id="ucpopbtn" class="mwt-btn mwt-btn-icon" style="width:auto;padding:0 10px 0 5px;">'+
                    '<i class="sicon-user" style="font-size:13px !important;"></i> '+dz.username+
                '</button>'
            ]   
        }).create();
        jQuery('#ucpopbtn').hover(
            function(){mwt.showFloatDiv("ucpop",-10,33);},
            function(){jQuery('#ucpop').hide();}
        );  
        jQuery('#ucpop').hover(
            function(){jQuery(this).show();},
            function(){jQuery(this).hide();}
        );
    }/*}}}*/

    o.getCopyright=function(color) {
        if (!color) color = '#aaa';
        var url = dz.siteurl+'/plugin.php?id=datacube';
        var logo = o.getLogo();
        return '<a href="'+url+'" '+
          'style="display:block;padding:20px 0 10px;text-align:center;color:'+color+';font-size:13px;text-decoration:none;">'+
            '<img src="'+logo+'" style="width:16px;height:16px;vertical-align:text-bottom"> '+
        '</a>';
    };

    return o;
});
