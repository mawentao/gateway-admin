<?php
if (!defined('IN_GWADMIN_API')) {
    exit('Access Denied');
}
/**
 * 网关APP
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
function queryAction() { return C::t('#gwadmin#gw_app')->query(); }

// 保存网关应用接口
function saveAction() { return C::t('#gwadmin#gw_app')->save(); }

// 网关应用删除接口
function removeAction() { return C::t('#gwadmin#gw_app')->remove(); }

// vim600: sw=4 ts=4 fdm=marker syn=php
?>
