define(function(require){
    /* generated by mengma @2019-06-18 10:43 */
    var dialogid = 'dialog-'+mwt.genId();
    var form,dialog,params,appInfo,callback;
    
    function init_dialog() 
    {/*{{{*/
        form = new MWT.Form();
        form.addField('back_path',new MWT.TextField({
            type        : 'text',
            render      : 'fm-back_path'+dialogid,
            value       : '', 
            empty       : false,
            errmsg      : "请输入后端接口,不超过100个字符",
            checkfun    : function(v){return v.length<=100;}
        }));
        dialog = new MWT.Dialog({
            title     : '后端服务地址',
            form      : form,
			width     : 600,
			style     : 'height:500px;',
            bodyStyle : 'padding:10px;',
            body : '<table class="mwt-formtab">'+
			   '<tr>'+
				 '<td width="90">网关路径 <b style="color:red">*</b></td>'+
                 '<td><input id="gwapi-'+dialogid+'" type="text" class="mwt-field" '+
				            'disabled="disabled" style="background:#f1f1f1" value="">'+
				 '</td>'+
			   '</tr>'+
               '<tr>'+
                 '<td>后端接口 <b style="color:red">*</b></td>'+
                 '<td><div id="fm-back_path'+dialogid+'"></div></td>'+
               '</tr>'+
			'</table>'+
			'<div class="wall">'+
				'<table>'+
					'<tr><th width="120">环境env</th><th>后端服务地址</th></tr>'+
					'<tbody id="backlist-'+dialogid+'"></tbody>'+
				'</table>'+
			'</div>',
            buttons : [
                {label:"提交",cls:'mwt-btn-primary',handler:submitClick},
                {label:"取消",type:'close',cls:'mwt-btn-default'}
            ]
        });
        //3. dialog open event
        dialog.on('open',function(){
			var frontPath = appInfo.prepath+params.front_path;
			mwt.set_value('gwapi-'+dialogid,frontPath);
			var data = {
				back_path: params.back_path
			};
			form.set(data);
			showServerList();
			jQuery('#fm-back_path'+dialogid+'txt').unbind('keyup').keyup(showServerList);
        });
    }/*}}}*/

    var o={};
    o.open=function(_params,_appInfo,_callback){
        params  = _params;
		appInfo = _appInfo;
        callback = _callback;
        if (!dialog) init_dialog();
        dialog.open();
    };  

	
	// 显示后端服务列表
	function showServerList() {
		var trs = [];
		var backurl = mwt.get_value('fm-back_path'+dialogid+'txt');
		for (var i=0;i<appInfo.env.length;++i) {
			var envim = appInfo.env[i];
			var url = envim.url+backurl;
			var code = '<tr>'+
				'<td><span>'+envim.name+'</span></td>'+
				'<td><span><a href="'+url+'" target="_blank" class="grida">'+url+'</a></span></td>'+
			'</tr>';
			trs.push(code);
		}
		jQuery('#backlist-'+dialogid).html(trs.join(''));
	}

    /////////////////////////////////////
    // 提交按钮点击事件
    function submitClick() {
        var data = form.getData();
        try {
            data.id = params.id;
            ajax.post('gwapi&action=saveBackpath',data,function(res){
                if (res.retcode!=0) mwt.notify(res.retmsg,1500,'danger');
                else {
                    dialog.close();
                    if (callback) callback();
                }   
            }); 
        } catch (e) {
            mwt.notify(e,1500,'danger');
        }
    }

    return o;
});
