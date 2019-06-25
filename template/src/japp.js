/* japp.js, (c) 2016 mawentao */
var JApp=function(baseUrl)
{
    this.init = function() {
		require.config({
			baseUrl: baseUrl,
    		packages: [
				{name:'er', location:'er', main:'main'}
    		]
		});
        require(['jappengine'], function(jappengine,mwt){
			jappengine.start();
        });
    };
};

/* ---------------- store加载消息 ---------------- */
var loadingdivid;
function store_before_load(){loadingdivid=mwt.notify("数据加载中...",10000,'loading');
    jQuery('body').css('cursor','wait');
}
function store_after_load(){mwt.notify_destroy(loadingdivid);
    jQuery('body').css('cursor','');
}

/* 文本块 */
function _textblock(cls,msg,domid)
{/*{{{*/
    var iconmap = {
        loading : 'icon icon-loading fa fa-spin',
        info    : 'sicon-info',
        success : 'sicon-check',
        warning : 'fa fa-frown-o',
        danger  : 'icon icon-report'
    };
    var icon = iconmap[cls];
    var code = ''; 
    if (cls=='loading') {
        var m = msg ? msg : '数据加载中...';
        code = '<span style="font-size:12px;color:#aaa"><i class="'+icon+'"></i> '+m+'</span>';
    } else {
        code = '<div class="mwt-wall mwt-wall-'+cls+'" style="text-align:center;">'+
            '<i class="'+icon+'" style="font-size:24px;"></i><br>'+
            '<div style="display:inline-block;margin-left:10px;font-size:13px;">'+msg+'</div>'+
        '</div>';
    }
    if (domid) jQuery('#'+domid).html(code);
    return code;
}/*}}}*/

textblock = {
    loading : function(msg,domid) {return _textblock('loading',msg,domid);},
    info    : function(msg,domid) {return _textblock('info',msg,domid);},
    success : function(msg,domid) {return _textblock('success',msg,domid);},
    warning : function(msg,domid) {return _textblock('warning',msg,domid);},
    danger  : function(msg,domid) {return _textblock('danger',msg,domid);},
    help    : function(msg,domid) {
        var code = '<i class="sicon-question" pop-title="'+msg+'" pop-cls="mwt-popover-danger"></i>';
        if (domid) jQuery('#'+domid).html(code);
        return code;
    }
};

iconlabel = {
    plus: function(label) { return '<i class="sicon-plus"></i> '+label;}
};

var gridRender = {
    money: function(v) {
        return formatAmount(v);
    },
    date: function(v,emptyMsg) {
        var dt = v.substr(0,10);
        if (dt=='0000-00-00'||dt=='1970-01-01'||dt=='1971-01-01') {
            if (!emptyMsg) emptyMsg='';
            return '<span style="color:gray">'+emptyMsg+'</span>';
        }
        return dt;
    },
    state: function(v,dictKey) {
        var map = dict.getMap2(dictKey);
        if (!map || !map[v]) return v;
        var item = map[v];
        var color = item.color;
        return '<span style="color:'+color+'"><i class="fa fa-dot-circle-o"></i> '+item.text+'</span>';
    }
};

/* dz提交数据特殊字符转义 */
function dz_post_encode(str)
{/*{{{*/
    var res = str.replace(/"/g,'&quot;');
    res = res.replace(/'/g,'&apos;');
    res = res.replace(/</g,'&lt;');
    res = res.replace(/>/g,'&gt;');
    res = res.replace(/\(/g,'&lk;');
    res = res.replace(/\)/g,'&gk;');
    return res;
}/*}}}*/


