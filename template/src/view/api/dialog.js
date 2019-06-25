define(function(require){
    /* generated by mengma @2019-06-18 10:43 */
    var dialogid = 'dialog-'+mwt.genId();
    var form,dialog,params,callback;
    
    function init_dialog() 
    {/*{{{*/
        //1. new form
        form = new MWT.Form();
        form.addField('front_path',new MWT.TextField({
            type        : 'text',
            render      : 'fm-front_path'+dialogid,
            value       : '', 
            empty       : false,
            errmsg      : "请输入网关接口,不超过100个字符",
            checkfun    : function(v){return v.length<=100;}
        }));
        form.addField('back_path',new MWT.TextField({
            type        : 'text',
            render      : 'fm-back_path'+dialogid,
            value       : '', 
            empty       : false,
            errmsg      : "请输入后端接口,不超过100个字符",
            checkfun    : function(v){return v.length<=100;}
        }));
        form.addField('timeout',new MWT.TextField({
            type        : 'number',
            render      : 'fm-timeout'+dialogid,
            value       : '10000', 
            empty       : false,
            errmsg      : "请输入超时时间>=0秒",
            checkfun    : function(v){return v>=0;}
        }));
        form.addField('max_flow',new MWT.TextField({
            type        : 'number',
            render      : 'fm-max_flow'+dialogid,
            value       : '500', 
            empty       : false,
            errmsg      : "请输入限流阈值>=0",
            checkfun    : function(v){return v>=0;}
        }));
        form.addField('authkeys',new MWT.CheckboxField({
            render      : 'fm-authkeys'+dialogid,
			options     : dict.get_options('apiAuth'),
            value       : '', 
            empty       : true
        }));
        form.addField('is_mock',new MWT.RadioField({
            render : 'fm-is_mock'+dialogid,
            options : [{text:'是',value:1},{text:"否",value:0}],
            value   : 0,
            errmsg  : '请选择',
            empty   : true
        }));
        form.addField('mock',new MWT.TextField({
            type     : 'textarea',
            render   : 'fm-mock'+dialogid,
			style    : 'height:200px;',
            value    : '', 
            empty    : true,
            errmsg   : "请输入mock内容,不超过4000个字符",
            checkfun : function(v){return v.length<=4000;}
        }));
        form.addField('remark',new MWT.TextField({
            type     : 'textarea',
            render   : 'fm-remark'+dialogid,
			style    : 'height:200px;',
            value    : '', 
            empty    : true,
            errmsg   : "请输入接口说明,不超过200个字符",
            checkfun : function(v){return v.length<=200;}
        }));

        //2. new dialog
        dialog = new MWT.Dialog({
            title     : '对话框',
            form      : form,
            fullscreen: true,
            animate   : 'slideRight',
            style     : 'left:50%;right:0',
            bodyStyle : 'padding:10px;',
            body : '<table class="mwt-formtab">'+
               '<tr>'+
                 '<td width="120">网关接口 <b style="color:red">*</b></td>'+
                 '<td><div id="fm-front_path'+dialogid+'"></div></td>'+
                 '<td width="100" class="tips"></td>'+
               '</tr>'+
               '<tr>'+
                 '<td>后端接口 <b style="color:red">*</b></td>'+
                 '<td><div id="fm-back_path'+dialogid+'"></div></td>'+
                 '<td class="tips"></td>'+
               '</tr>'+
               '<tr>'+
                 '<td>超时时间(毫秒) <b style="color:red">*</b></td>'+
                 '<td><div id="fm-timeout'+dialogid+'"></div></td>'+
                 '<td class="tips">0表示不限制</td>'+
               '</tr>'+
               '<tr>'+
                 '<td>限流阈值<b style="color:red">*</b></td>'+
                 '<td><div id="fm-max_flow'+dialogid+'"></div></td>'+
                 '<td class="tips">0表示不限流</td>'+
               '</tr>'+
               '<tr>'+
                 '<td>鉴权策略<b style="color:red">*</b></td>'+
                 '<td><div id="fm-authkeys'+dialogid+'"></div></td>'+
                 '<td class="tips"></td>'+
               '</tr>'+
               '<tr>'+
                 '<td>是否mock <b style="color:red">*</b></td>'+
                 '<td><div id="fm-is_mock'+dialogid+'"></div></td>'+
                 '<td class="tips"></td>'+
               '</tr>'+
               '<tr>'+
                 '<td valign="top">mock内容</td>'+
                 '<td><div id="fm-mock'+dialogid+'"></div></td>'+
                 '<td class="tips"></td>'+
               '</tr>'+
               '<tr>'+
                 '<td valign="top">接口说明</td>'+
                 '<td><div id="fm-remark'+dialogid+'"></div></td>'+
                 '<td class="tips"></td>'+
               '</tr>'+
            '</table>',
            buttons : [
                {label:"确定",cls:'mwt-btn-primary',handler:submitClick},
                {label:"取消",type:'close',cls:'mwt-btn-default'}
            ]
        });
        //3. dialog open event
        dialog.on('open',function(){
            form.reset();
            if (params.id) {
				params.authkeys = params.authkeys.split(",");
                dialog.setTitle("编辑API");
                form.set(params);
            } else {
                dialog.setTitle("添加API");
            }
        });
    }/*}}}*/

    var o={};
    o.open=function(_params,_callback){
        params   = _params;
        callback = _callback;
        if (!dialog) init_dialog();
        dialog.open();
    };  

    /////////////////////////////////////
    // 提交按钮点击事件
    function submitClick() {
        var data = form.getData();
        try {
            data.id = params.id;
			data.app_id = params.app_id;
			if (!data.authkeys) data.authkeys = '';
			else {
				data.authkeys = data.authkeys.join(',');
			}
			data.mock = dz_post_encode(data.mock);
            ajax.post('gwapi&action=save',data,function(res){
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
