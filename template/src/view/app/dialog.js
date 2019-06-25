define(function(require){
    /* generated by mengma @2019-06-17 19:28 */
    var dialogid = 'dialog-'+mwt.genId();
    var form,dialog,params,callback;
    
    function init_dialog() 
    {/*{{{*/
        //1. new form
        form = new MWT.Form();
        form.addField('name',new MWT.TextField({
            type        : 'text',
            render      : 'fm-name'+dialogid,
            value       : '', 
            empty       : false,
            errmsg      : "请输入网关应用名称,不超过50个字符",
            checkfun    : function(v){return v.length<=50;}
        }));
        form.addField('prepath',new MWT.TextField({
            type        : 'text',
            render      : 'fm-prepath'+dialogid,
            value       : '', 
            empty       : false,
            errmsg      : "请输入公共前缀,不超过100个字符",
            checkfun    : function(v){return v.length<=100;}
        }));
        form.addField('remark',new MWT.TextField({
            type        : 'textarea',
            render      : 'fm-remark'+dialogid,
            value       : '', 
            placeholder : '',
            empty       : true,
			style       : 'height:100px;',
            errmsg      : "请输入备注,不超过1024个字符",
            checkfun    : function(v){return v.length<=1024;}
        }));
        form.addField('owners',new MWT.TextField({
            type        : 'text',
            render      : 'fm-owners'+dialogid,
            value       : '', 
            empty       : false,
            errmsg      : "请输入负责人,不超过1024个字符",
            checkfun    : function(v){return v.length<=1024;}
        }));
        form.addField('status',new MWT.RadioField({
            type        : 'number',
            render      : 'fm-status'+dialogid,
			options     : dict.get_options('status'),
            value       : '0', 
            placeholder : '请输入状态(0:离线,1:在线)',
            empty       : false,
            errmsg      : "请输入状态(0:离线,1:在线),不超过1024个字符",
            checkfun    : function(v){return v.length<=1024;}
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
                 '<td width="120">网关应用名称 <b style="color:red">*</b></td>'+
                 '<td><div id="fm-name'+dialogid+'"></div></td>'+
                 '<td width="100" class="tips"></td>'+
               '</tr>'+
               '<tr>'+
                 '<td>公共前缀 <b style="color:red">*</b></td>'+
                 '<td><div id="fm-prepath'+dialogid+'"></div></td>'+
                 '<td class="tips"></td>'+
               '</tr>'+
               '<tr>'+
                 '<td>备注（可选）</td>'+
                 '<td><div id="fm-remark'+dialogid+'"></div></td>'+
                 '<td class="tips"></td>'+
               '</tr>'+
               '<tr>'+
                 '<td>负责人 <b style="color:red">*</b></td>'+
                 '<td><div id="fm-owners'+dialogid+'"></div></td>'+
                 '<td class="tips"></td>'+
               '</tr>'+
               '<tr>'+
                 '<td>状态 <b style="color:red">*</b></td>'+
                 '<td><div id="fm-status'+dialogid+'"></div></td>'+
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
                dialog.setTitle("修改应用");
                form.set(params);
            } else {
                dialog.setTitle("新增应用");
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
            ajax.post('gwapp&action=save',data,function(res){
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