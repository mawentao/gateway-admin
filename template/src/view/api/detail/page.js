define(function(require){
    /* PR单详情 */
    var prModel = require('model/pr');
    var BasePage = require('core/BasePage');
    var o = new BasePage({
        // 准入角色
        passRoles: 'ROLE_HQ_ADMIN,ROLE_HQ_PMRD,ROLE_HQ_PM',
        posarr: [{name:'PR单管理',href:"#/pr"},{name:'PR单号:{id}'}],
        name  : 'PR单管理',
        id    : 'pr/detail',
    });

    function show(domid,data,rw) 
    {
        var btn = '<div class="mwt-border-top" style="padding-top:10px;">'+
            '<button class="mwt-btn mwt-btn-primary mwt-btn-sm" name="audit-btn" data-v="30">审核通过</button>'+
            '<button class="mwt-btn mwt-btn-default mwt-btn-sm" name="audit-btn" data-v="40" style="margin:0 20px;">审核驳回</button>'+
            '<input type="text" class="mwt-field" id="audit-txt-'+domid+'" style="width:400px;" placeholder="审批备注">'+
        '</div>';
        if (data.state!=20) btn = '';
        if (rw!=2) btn = '';

        var code = '<div class="wall">'+
            '<h1 class="mwt-border-bottom">'+data.name+'</h1>'+
            '<div class="mwt-row">'+
              '<div class="mwt-col-3"><label>大区</label><span>'+data.regionName+'</span></div>'+
              '<div class="mwt-col-3"><label>城市</label><span>'+data.regionName+'</span></div>'+
              '<div class="mwt-col-3"><label>申请人</label><span>'+data.creatorName+'</span></div>'+
              '<div class="mwt-col-3"><label>创建时间</label><span>'+data.createTime+'</span></div>'+
            '</div>'+
            '<div class="mwt-row">'+
              '<div class="mwt-col-3"><label>预算ID</label><span>'+data.budgetId+'</span></div>'+
              '<div class="mwt-col-3"><label>预算</label><span>'+data.budgetName+'</span></div>'+
            '</div>'+
            '<div class="mwt-row">'+
              '<div class="mwt-col-3"><label>保证金</label><span>'+number_format(data.margin)+'元</span></div>'+
              '<div class="mwt-col-3"><label>请购总车数</label><span>'+number_format(data.quantity)+'辆</span></div>'+
              '<div class="mwt-col-3"><label>请购总金额</label><span><em>'+number_format(data.amount)+'</em>元</span></div>'+
            '</div>'+
            '<div class="mwt-row">'+
              '<div class="mwt-col-3"><label>备注</label><span>'+data.remark+'</span></div>'+
            '</div>'+
            '<h2 class="mwt-border-bottom">请购清单</h2>'+
            '<div id="grid-'+domid+'" style="margin-bottom:10px;"></div>'+
        '</div>'+
        btn;
        jQuery('#'+domid).html(code);
        // 请购清单
        require('./grid').init('grid-'+domid,data.productList);
        // 按钮事件
        if (data.state==20) {
            jQuery('[name=audit-btn]').unbind('click').click(function(){
                var v = jQuery(this).data('v');
                var params = {
                    id: data.id,
                    state: v,
                    auditRemark: mwt.get_value('audit-txt-'+domid),
                };
                mwt.confirm('确定提交吗?',function(res){
                    if (res) {
                        ajax.post('pr&action=audit',params,function(res){
                            if (res.retcode!=0) mwt.alert(res.retmsg);
                            else window.location.reload();
                        });
                    }
                });
            });
        }
    }

	o.execute = function(domid,query) {
        var prid = query.id ? query.id : 0;
        if (prid==0) {
            window.location = '#/pr';
            return;
        }
        var rw = o.getRW('ROLE_HQ_ADMIN,ROLE_HQ_PM');  //!< 读写权限(1:读,2:读写)
        prModel.asyncLoad(prid,function(data){
            show(domid,data,rw);
        });
	};

    return o;
});
