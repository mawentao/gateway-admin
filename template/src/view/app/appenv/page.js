define(function(require){
    /* APP后端服务环境管理 */
	var appenvDialog = require('./dialog');
    var dialogid = 'dialog-appenv';
	var gridid = 'grid-'+dialogid;
    var store,grid,dialog,params,callback;
    
	function init_grid() 
	{/*{{{*/
		store = new mwt.Store({
            proxy: new mwt.HttpProxy({
                //beforeLoad : store_before_load,
                //afterLoad  : store_after_load,
                url : ajax.getAjaxUrl("gwappEnv&action=query")
            })
        });
		grid = new MWT.Grid({
            render      : gridid,
            store       : store,
            pagebar     : true,     //!< 分页
            pageSize    : 20,       //!< 每页大小
            multiSelect : false,    //!< 多行选择
            bordered    : false,    //!< 单元格边框
            striped     : true,     //!< 斑马纹
            noheader    : false,    //!< 隐藏列头
            notoolbox   : false,    //!< 隐藏工具箱(刷新,斑马纹,导出Excel)
            bodyStyle   : '', 
            tbar: [
                {type:'search',id:'so-key-'+gridid,width:300,handler:o.query,placeholder:'搜索关键词'},
                '->',
                {label:iconlabel.plus('添加记录'),handler:function(){
                    appenvDialog.open({id:0,app_id:params.id},o.query);
                }}
            ],
            cm: new MWT.Grid.ColumnModel([
                /*{head:'自增主键',dataIndex:'id',width:120,align:'left',sort:false,render:function(v,item){
                    return v;
                }},
                {head:'网关应用ID',dataIndex:'app_id',width:120,align:'left',sort:false,render:function(v,item){
                    return v;
                }},*/
                {head:'环境Env',dataIndex:'name',width:120,align:'left',sort:true,render:function(v,item){
                    return '<b style="font-size:13px;color:#f90;">'+v+'</b>';
                }},
                {head:'服务URL',dataIndex:'url',align:'left',sort:true,render:function(v,item){
                    return '<a href="'+v+'" target="_blank" class="grida">'+v+'</a>';
                }},
                //{head:'创建日期',dataIndex:'ctime',width:120,align:'center',sort:true,render:mwt.GridRender.datetime},
                {head:'操作',dataIndex:'id',width:80,align:'right',sort:false,render:function(v,item){
					var cls = 'grida'
					var editbtn = '<a class="'+cls+'" name="editbtn-'+gridid+'" data-id="'+v+'" href="javascript:;">编辑</a>';
                    var delbtn = '<a class="'+cls+'" name="delbtn-'+gridid+'" data-id="'+v+'" href="javascript:;">删除</a>';
                    var btns = [editbtn,delbtn];
                    return btns.join("&nbsp;&nbsp;");
                }}
            ])
        });
		store.on('load',function(){
            mwt.popinit();
            // 编辑按钮
            jQuery('[name=editbtn-'+gridid+']').unbind('click').click(editbtnClick);
            // 删除按钮
            jQuery('[name=delbtn-'+gridid+']').unbind('click').click(delbtnClick);
        });
        grid.create();
	}/*}}}*/

    function init_dialog() 
    {/*{{{*/
        //1. create dialog
        dialog = new MWT.Dialog({
            title     : '后端服务环境',
            fullscreen: true,
            style     : 'left:25%;right:25%;top:10px;bottom:10px;',
            bodyStyle : 'padding:10px;',
            body : '<b>说明</b>'+
				'<ol>'+
				  '<li>这里统一配置后端多环境服务地址，具体接口地址请在接口详情查看。</li>'+
				  '<li>生产环境请使用“prod”关键词。</li>'+
				  '<li>环境env填写的名称与gateway服务模块配置的env需要保持一致。</li>'+
				'</ol>'+
				'<b>环境列表</b>'+
				'<div id="'+gridid+'"></div>',
            buttons : [
                {label:"关闭",type:'close',cls:'mwt-btn-default'}
            ]
        });
		
        //3. dialog open event
        dialog.on('open',function(){
            if (!params.id) {
				dialog.close();
            }
			init_grid();
			o.query();
        });
    }/*}}}*/

    var o={};
    o.open=function(_params,_callback){
        params   = _params;
        callback = _callback;
        if (!dialog) init_dialog();
        dialog.open();
    };  

	o.query=function() {
		store.baseParams = {
			appid: params.id,
            key: mwt.get_value("so-key-"+gridid)
        };
        grid.load();
	};

    /////////////////////////////////////
    // 编辑按钮点击事件
    function editbtnClick() 
    {/*{{{*/
        var id = jQuery(this).data('id');
        var item = grid.getRecord('id',id);
        appenvDialog.open(item,o.query);
    }/*}}}*/

    // 删除按钮点击事件
    function delbtnClick() 
    {/*{{{*/
        var id = jQuery(this).data('id');
        mwt.confirm('确定要删除吗?',function(res){
            if (!res) return;
            ajax.post('gwappEnv&action=remove',{id:id},function(res){
                if (res.retcode!=0) mwt.alert(res.retmsg);
                else {
                    o.query();
                }
            });
        });
    }/*}}}*/

    return o;
});
