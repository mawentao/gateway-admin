<?php
if (!defined('IN_GWADMIN_API')) {
    exit('Access Denied');
}
/**
 * 网关API
 **/
////////////////////////////////////
// API鉴权
authLogin();
////////////////////////////////////

// 获取网关应用详情
function getDetailAction() 
{ 
	$id = gwadmin_validate::getNCParameter('id','id','integer');
	return C::m('#gwadmin#gwadmin_gwapp')->getDetail($id);
}

// 网关应用列表查询接口
function queryAction() { return C::t('#gwadmin#gw_api')->query(); }

// 保存网关应用接口
function saveAction() { return C::t('#gwadmin#gw_api')->save(); }

// 发布接口
function setStatusAction() { return C::t('#gwadmin#gw_api')->setStatus(); }

// 保存服务地址接口
function saveBackpathAction() { return C::t('#gwadmin#gw_api')->saveBackpath(); }

// 网关应用删除接口
function removeAction() { return C::t('#gwadmin#gw_api')->remove(); }

// vim600: sw=4 ts=4 fdm=marker syn=php
?>
